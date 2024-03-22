import Followingbar from '@/components/FollowingBar';
import PostList from '@/components/PostList';
// import SideBar from '@/components/SideBar';
import { authOptions } from './api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

export default async function HomePage() {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) {
    redirect('/auth/signin');
  }

  return (
    <section className="flex flex-col items-center w-full max-w-[850px]">
      <div className="flex flex-col items-center max-w-[630px] w-full">
        <Followingbar />
        <PostList />
      </div>
      {/* <div className="w-[319px] ml-16">
        <SideBar user={user} />
      </div> */}
    </section>
  );
}
