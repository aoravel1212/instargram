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
      <div className="flex flex-col justify-between basis-full rounded-lg sm:inline sm:rounded-r-none sm:rounded-l-lg sm:bg-black">
        <div className="px-2 sm:hidden">
          <PostMenuModalProvider>
            <PostHeader />
          </PostMenuModalProvider>
        </div>
        <div className="flex justify-center items-center h-full">
          <Image
            className="object-contain max-w-full max-h-full"
            src={image}
            alt={`photo by ${username}`}
            width={1000}
            height={1000}
            priority
          />
        </div>
        <div className="px-2 sm:hidden">
          <ActionBar onComment={postComment} />
        </div>
      </div>
      <div className="hidden sm:min-w-[400px] sm:flex sm:flex-col sm:border-l sm:border-neutral-200">
        <div className="px-4">
          <PostMenuModalProvider>
            <PostHeader />
          </PostMenuModalProvider>
        </div>
        {data && <PostContent data={data} />}
        <div className="px-4">
          <ActionBar onComment={postComment} />
        </div>
      </div>
    </section>
  );
}
