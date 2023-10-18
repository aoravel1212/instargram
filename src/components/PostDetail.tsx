import { usePostContext } from '@/context/PostContext';
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
      <div className="relative basis-3/5">
        <Image
          className="object-cover rounded-l-lg"
          src={image}
          alt={`photo by ${username}`}
          priority
          fill
          sizes="650px"
        />
      </div>
      <div className="w-full basis-2/5 flex flex-col border-l border-neutral-200">
        {data && (
          <>
            <PostHeader />
            <PostContent data={data} />
          </>
        )}
        <ActionBar onComment={postComment} />
      </div>
    </section>
  );
}
