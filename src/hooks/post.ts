import { Comment, FullPost } from '@/model/post';
import useSWR, { useSWRConfig } from 'swr';

async function addComment(postId: string, comment: string) {
  return fetch('/api/comments', {
    method: 'POST',
    body: JSON.stringify({ postId, comment }),
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

  const postComment = (comment: Comment) => {
    if (!post) return;
    const newPost = {
      ...post,
      comments: [...post.comments, comment],
    };

    return mutate(addComment(post.id, comment.comment), {
      optimisticData: newPost,
      populateCache: false,
      revalidate: false,
      rollbackOnError: true,
    }).then(() => globalMutate('/api/posts'));
  };

  return { post, isLoading, error, postComment };
}
