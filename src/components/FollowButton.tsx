'use client';
import Button from './ui/Button';
import useMe from '@/hooks/me';
import DotIcon from './ui/icons/DotIcon';
import { ProfileUser } from '@/model/user';

type Props = {
  user: ProfileUser;
  type: 'text' | 'box';
};

export default function FollowButton({ user, type }: Props) {
  const { username } = user;
  const { user: loggedInUser, toggleFollow } = useMe();

  const showButton = loggedInUser && loggedInUser.username !== username;
  const following =
    loggedInUser &&
    loggedInUser.following.find((item) => item.username === username);

  const text = following ? 'Unfollow' : 'Follow';

  const handleFollow = () => {
    toggleFollow(user.id, !following);
  };

  return (
    <>
      {showButton && type === 'text' ? (
        <>
          <DotIcon />
          <span className="text-sky-500 font-bold">팔로우</span>
        </>
      ) : (
        showButton && (
          <Button
            text={text}
            onClick={handleFollow}
            red={text === 'Unfollow'}
          />
        )
      )}
    </>
  );
}
