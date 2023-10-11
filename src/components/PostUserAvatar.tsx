import Avatar from './Avatar';
import FollowButton from './FollowButton';
import LinkToUserPage from './LinkToUserPage';
import DotsThreeBoldIcon from './ui/icons/DotsThreeBoldIcon';

type Props = {
  image: string;
  username: string;
  authorId: string;
  children?: React.ReactNode;
};

export default function PostUserAvatar({
  image,
  username,
  authorId,
  children,
}: Props) {
  return (
    <div className="flex items-center p-2">
      <div className="flex items-center">
        <div className="p-1">
          <Avatar username={username} image={image} size="medium" highlight />
        </div>
        <div className="ml-2">
          <LinkToUserPage username={username}>
            <span className="text-gray-900 font-bold">{username}</span>
          </LinkToUserPage>
        </div>
        {children}
        <FollowButton username={username} id={authorId} type={'text'} />
      </div>
    </div>
  );
}
