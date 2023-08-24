import { SimplePost } from '@/model/post';
import useSWR from 'swr';

async function updateLike(postId: string, like: boolean) {
  return fetch('/api/likes', {
    method: 'PUT',
    body: JSON.stringify({ postId, like }),
  }).then((res) => res.json());
}

export default function usePosts() {
  // hook 내부적으로 api요청을 해서 posts 데이터를 가지고 있고, bound된 mutate 함수도 가지고 있음
  const {
    data: posts,
    isLoading,
    error,
    mutate,
  } = useSWR<SimplePost[]>('/api/posts');

  // setLike를 호출하면 로컬상으로 업데이트 할 변경된 포스트의 배열을 새롭게 만듦
  const setLike = (post: SimplePost, username: string, like: boolean) => {
    const newPost = {
      ...post,
      likes: like
        ? [...post.likes, username] // 사용자가 포스트를 like한다면, 해당 포스트의 likes 정보와 username의 배열을 추가
        : post.likes.filter((item) => item !== username), // 사용자가 포스트를 like하지 않는다면, likes배열에서 사용자 username을 제거
    };
    // 기존의 post 데이터의 아이디가 newPost의 아이디와 같다면 newPost를 사용하고, 같지 않다면 기존의 post 데이터를 사용
    const newPosts = posts?.map((p) => (p.id === post.id ? newPost : p));

    // updateLike함수실생의 반환된 값으로 mutate
    return mutate(updateLike(post.id, like), {
      optimisticData: newPosts,
      populateCache: false,
      revalidate: false,
      rollbackOnError: true,
    });
  };

  return { posts, isLoading, error, setLike };
}
