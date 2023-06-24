import UserProfile from '@/components/UserProfile';
import { getUserForProfile } from '@/service/user';
import { notFound } from 'next/navigation';

type Props = {
  params: { username: string };
};

export default async function UserPage({ params: { username } }: Props) {
  const user = await getUserForProfile(username); // 상단: 사용자의 프로필 이미지와 정보(username,name,숫자 등)

  if (!user) {
    notFound();
  }
  console.log('check token', process.env.REACT_APP_SANITY_PROJECT_ID);
  return <UserProfile user={user} />;
}
