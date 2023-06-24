'use client';
import { HomeUser, ProfileUser } from '@/model/user';
import useSWR from 'swr';
import Button from './ui/Button';

type Props = {
  user: ProfileUser;
};

export default function FollowButton({ user }: Props) {
  const { username } = user;
  const { data: loggedInUser } = useSWR<HomeUser>('/api/me');

  // 로그인한 유저의 페이지일 경우 팔로우 버튼 보여줄 필요가 없음
  // 로그인한 유저가 있고 로그인한 유저의 username이 현재 전달된 유저(보고있는 유저페이지의) username이 아니라면 버튼 활성화
  const showButton = loggedInUser && loggedInUser.username !== username;

  // 로그인 유저가 해당 유저를 팔로우하고 있는지 아닌지 판단
  // 로그인 유저가 있고 로그인 유저의 팔로윙 목록에 해당 유저페이지의 username이 있는지 찾음
  const following =
    loggedInUser &&
    loggedInUser.following.find((item) => item.username === username);

  const text = following ? 'Unfollow' : 'Follow';
  return (
    <>
      {showButton && (
        <Button text={text} onClick={() => {}} red={text === 'Unfollow'} />
      )}
    </>
  );
}
