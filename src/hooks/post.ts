import { Comment, FullPost } from '@/model/post';
import { useCallback } from 'react';
import useSWR, { useSWRConfig } from 'swr';

async function addComment(postId: string, comment: string, createdAt: string) {
  return fetch('/api/comments', {
    method: 'POST',
    body: JSON.stringify({ postId, comment, createdAt }),
  }).then((res) => res.json());
}

export default function useFullPost(postId: string) {
  const {
    data: post,
    isLoading,
    error,
    mutate,
  } = useSWR<FullPost>(`/api/posts/${postId}`);

  const { mutate: globalMutate } = useSWRConfig();

  const postComment = useCallback(
    (comment: Comment) => {
      if (!post) return;
      const newPost =
        post.comments === null
          ? {
              ...post,
              comments: [comment],
            }
          : {
              ...post,
              comments: [...post.comments, comment],
            };

      return mutate(addComment(post.id, comment.text, comment.createdAt), {
        optimisticData: newPost,
        populateCache: false,
        revalidate: false,
        rollbackOnError: true,
      }).then(() => globalMutate('/api/posts'));
    },
    [post, mutate, globalMutate]
  );

  return { post, isLoading, error, postComment };
}
