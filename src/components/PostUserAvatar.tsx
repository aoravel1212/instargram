import Avatar from './Avatar';
import FollowButton from './FollowButton';

type Props = {
  image: string;
  username: string;
  children?: React.ReactNode;
};

export default function PostUserAvatar({ image, username, children }: Props) {
  return (
    <div className="flex items-center p-2">
      <div className="p-1">
        <Avatar image={image} size="medium" highlight />
      </div>
      <div className="ml-2">
        <span className="text-gray-900 font-bold">{username}</span>
      </div>
      {children}
      <FollowButton username={username} type={'text'} />
    </div>
  );
}
