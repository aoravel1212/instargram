import { useCacheKeys } from '@/context/CacheKeysContext';
import { Comment, SimplePost } from '@/model/post';
import { useCallback } from 'react';
import useSWR from 'swr';

async function updateLike(postId: string, like: boolean) {
  return fetch('/api/likes', {
    method: 'PUT',
    body: JSON.stringify({ postId, like }),
  }).then((res) => res.json());
}

async function addComment(postId: string, comment: string, createdAt: string) {
  return fetch('/api/comments', {
    method: 'POST',
    body: JSON.stringify({ postId, comment, createdAt }),
  }).then((res) => res.json());
}

export default function usePosts() {
  const cacheKeys = useCacheKeys();
  const {
    data: posts,
    isLoading,
    error,
    mutate,
  } = useSWR<SimplePost[]>(cacheKeys.postsKey);

  const setLike = useCallback(
    (post: SimplePost, username: string, like: boolean) => {
      const newPost = {
        ...post,
        likes: like
          ? [...post.likes, username]
          : post.likes.filter((item) => item !== username),
      };

      const newPosts = posts?.map((p) => (p.id === post.id ? newPost : p));

      return mutate(updateLike(post.id, like), {
        optimisticData: newPosts,
        populateCache: false,
        revalidate: false,
        rollbackOnError: true,
      });
    },
    [posts, mutate]
  );

  const postComment = useCallback(
    (post: SimplePost, comment: Comment) => {
      const newPost = {
        ...post,
        comments: post.comments + 1,
      };
      const newPosts = posts?.map((p) => (p.id === post.id ? newPost : p));

      return mutate(addComment(post.id, comment.text, comment.createdAt), {
        optimisticData: newPosts,
        populateCache: false,
        revalidate: false,
        rollbackOnError: true,
      });
    },
    [posts, mutate]
  );

  return { posts, isLoading, error, setLike, postComment };
}
