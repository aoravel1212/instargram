import Avatar from './Avatar';
import LinkToUserPage from './LinkToUserPage';

type Props = {
  image: string;
  username: string;
};

export default function PostUserAvatar({ image, username }: Props) {
  return (
    <div className="flex items-center">
      <div className="p-1">
        <Avatar username={username} image={image} size="small" highlight />
      </div>
      <div className="ml-2">
        <LinkToUserPage username={username}>
          <span className="text-gray-900 font-bold">{username}</span>
        </LinkToUserPage>
      </div>
    </div>
  );
}
