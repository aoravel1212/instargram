'use client';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import HomeIcon from './ui/icons/HomeIcon';
import HomeFillIcon from './ui/icons/HomeFillIcon';
import SearchIcon from './ui/icons/SearchIcon';
import SearchFillIcon from './ui/icons/SearchFillIcon';
import LogoIcon from './ui/icons/LogoIcon';
import NewIcon from './ui/icons/NewIcon';
import NewFillIcon from './ui/icons/NewFillIcon';
import Avatar from './Avatar';
import AuthButton from './ui/AuthButton';
import NewPost from './NewPost';
import ModalPortal from './ui/ModalPortal';
import PostModal from './PostModal';
import SignOutIcon from './ui/icons/SignOutIcon';

const menu = [
  {
    href: '/',
    icon: <HomeIcon />,
    clickedIcon: <HomeFillIcon />,
    text: '홈',
  },
  {
    href: '/search',
    icon: <SearchIcon />,
    clickedIcon: <SearchFillIcon />,
    text: '검색',
  },
];

export default function Navbar() {
  const path = usePathname();
  const [openModal, setOpenModal] = useState(false);
  const { data: session } = useSession();
  const user = session?.user;

  return (
    <>
      <div className="flex justify-center lg:justify-start items-center md:relative md:px-4 lg:px-6 h-full">
        <div className="hidden md:inline-block md:absolute md:top-0">
          <LogoIcon />
        </div>
        <nav className="flex md:flex-col justify-center items-center lg:items-start md:justify-between w-full h-full">
          <ul className="flex md:flex-col justify-evenly md:justify-center items-center lg:items-start md:gap-6 md:mt-28 w-full">
            {menu.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="flex items-center gap-4">
                  <span className="text-2xl">
                    {path === item.href ? item.clickedIcon : item.icon}
                  </span>
                  <span className="hidden lg:inline-block">{item.text}</span>
                </Link>
              </li>
            ))}
            <li
              className="flex items-center gap-4 cursor-pointer"
              onClick={() => setOpenModal(true)}
            >
              <span className="text-2xl">
                {openModal ? <NewFillIcon /> : <NewIcon />}
              </span>
              <span className="hidden lg:inline-block">만들기</span>
            </li>
            {user && (
              <li>
                <Link
                  href={`/user/${user.username}`}
                  className="flex justify-center lg:justify-start items-center gap-3 lg:-translate-x-0.5"
                >
                  <span className="text-2xl">
                    <Avatar
                      image={user.image}
                      size="xsmall"
                      clicked={path === `/user/${user.username}`}
                    />
                  </span>
                  <span className="hidden lg:inline-block">프로필</span>
                </Link>
              </li>
            )}
          </ul>
          <div className="w-full hidden md:flex md:justify-center lg:justify-start md:items-center gap-2 md:mb-8">
            <AuthButton>
              <div className="flex gap-2">
                <span className="text-2xl">
                  <SignOutIcon />
                </span>
                <span className="hidden lg:inline-block">로그아웃</span>
              </div>
            </AuthButton>
          </div>
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
