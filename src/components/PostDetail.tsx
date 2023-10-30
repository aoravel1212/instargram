import { usePostContext } from '@/context/PostContext';
import { PostMenuModalProvider } from '@/context/PostMenuModalContext';
import Image from 'next/image';
import ActionBar from './ActionBar';
import useFullPost from '@/hooks/post';
import PostContent from './PostContent';
import PostHeader from './PostHeader';

export default function PostDetail() {
  const post = usePostContext();
  const { id, username, image } = post;
  const { post: data, postComment } = useFullPost(id);

  return (
    <section className="flex w-full h-full">
      <div className="relative basis-3/5 rounded-l-lg bg-black">
        <Image
          className="max-h-full max-w-full"
          src={image}
          alt={`photo by ${username}`}
          priority
          fill
          objectFit="contain"
        />
      </div>
      <div className="w-full basis-2/5 flex flex-col border-l border-neutral-200">
        {data && (
          <PostMenuModalProvider>
            <PostHeader />
            <PostContent data={data} />
          </PostMenuModalProvider>
        )}
        <ActionBar onComment={postComment} />
      </div>
    </section>
  );
}
