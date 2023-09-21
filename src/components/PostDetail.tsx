import { SimplePost } from '@/model/post';
import Image from 'next/image';
import PostUserAvatar from './PostUserAvatar';
import ActionBar from './ActionBar';
import useFullPost from '@/hooks/post';
import PostContent from './PostContent';

type Props = {
  post: SimplePost;
};

export default function PostDetail({ post }: Props) {
  const { id, username, userImage, image, createdAt } = post;
  const { post: data, postComment } = useFullPost(id);
  const authorId = data?.author._ref;

  return (
    <section className="flex w-full h-full">
      <div className="relative basis-3/5">
        <Image
          className="object-cover"
          src={image}
          alt={`photo by ${username}`}
          priority
          fill
          sizes="650px"
        />
      </div>
      <div className="w-full basis-2/5 flex flex-col">
        <PostUserAvatar
          image={userImage}
          username={username}
          authorId={authorId}
        />
        {data && (
          <PostContent
            image={userImage}
            username={username}
            createdAt={createdAt}
            data={data}
          />
        )}
        <ActionBar post={post} onComment={postComment} />
      </div>
    </section>
  );
}
