'use client';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';
import Link from 'next/link';
import HomeIcon from './ui/icons/HomeIcon';
import HomeFillIcon from './ui/icons/HomeFillIcon';
import SearchIcon from './ui/icons/SearchIcon';
import SearchFillIcon from './ui/icons/SearchFillIcon';
import NewIcon from './ui/icons/NewIcon';
import NewFillIcon from './ui/icons/NewFillIcon';
import Avatar from './Avatar';
import ColorButton from './ui/ColorButton';
import NewPost from './NewPost';
import ModalPortal from './ui/ModalPortal';
import PostModal from './PostModal';

const menu = [
  {
    href: '/',
    icon: <HomeIcon />,
    clickedIcon: <HomeFillIcon />,
  },
  {
    href: '/search',
    icon: <SearchIcon />,
    clickedIcon: <SearchFillIcon />,
  },
];

export default function Navbar() {
  const path = usePathname();
  const [openModal, setOpenModal] = useState(false);
  const { data: session } = useSession();
  const user = session?.user;

  return (
    <>
      <div className="flex justify-between items-center px-6">
        <Link href="/">
          <h1 className="text-3xl font-bold">Instantgram</h1>
        </Link>
        <nav className="gap-3">
          <ul className="flex items-center gap-4 py-4">
            {menu.map((item) => (
              <li key={item.href}>
                <Link href={item.href}>
                  {path === item.href ? item.clickedIcon : item.icon}
                </Link>
              </li>
            ))}
            <li className="cursor-pointer" onClick={() => setOpenModal(true)}>
              {openModal ? <NewFillIcon /> : <NewIcon />}
            </li>
            {user && (
              <li>
                <Link href={`/user/${user.username}`}>
                  <Avatar image={user.image} size="small" highlight />
                </Link>
              </li>
            )}
            <li>
              {session ? (
                <ColorButton text="Sign out" onClick={() => signOut()} />
              ) : (
                <ColorButton text="Sign in" onClick={() => signIn()} />
              )}
            </li>
          </ul>
        </nav>
      </div>
      {openModal && (
        <ModalPortal>
          <PostModal onClose={() => setOpenModal(false)}>
            <NewPost />
          </PostModal>
        </ModalPortal>
      )}
    </>
  );
}
