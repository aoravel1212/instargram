'use client';
import { PropagateLoader } from 'react-spinners';
import useMe from '@/hooks/me';
import Avatar from './Avatar';
import ScrollableBar from './ui/ScrollableBar';
import useViewportWidth from '@/hooks/viewportWidth';

export default function FollowingBar() {
  const viewportWidth = useViewportWidth();
  const { user, isLoading: loading, error } = useMe();
  const users = user?.following;

  return (
    <section
      className={`w-full flex justify-center items-center py-2 min-h-[85px] max-w-[630px] overflow-x-auto relative z-0 mt-4 ${
        viewportWidth <= 470 && 'border-b mt-0'
      }`}
    >
      {loading ? (
        <PropagateLoader size={8} color="red" />
      ) : (
        (!users || users.length === 0) && <p>{`You don't have following`}</p>
      )}
      {users && users.length > 0 && (
        <ScrollableBar>
          {users.map(({ image, username }) => (
            <div key={username} className="flex flex-col items-center w-20">
              <Avatar username={username} image={image} highlight />
              <p className="w-full text-sm text-center text-ellipsis overflow-hidden">
                {username}
              </p>
            </div>
          ))}
        </ScrollableBar>
      )}
    </section>
  );
}
