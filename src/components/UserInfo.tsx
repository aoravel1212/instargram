import { useEffect, useState } from 'react';
import { usePostMenuModalContext } from '@/context/PostMenuModalContext';
import Avatar from './Avatar';
import CalendarIcon from './ui/icons/ClendarIcon';

type Props = {
  userImage: string;
  username: string;
};

interface UserInfo {
  createdAt: string;
}

export default function UserInfo({ userImage, username }: Props) {
  const [error, setError] = useState<string>();
  const [userInfo, setUserInfo] = useState<UserInfo | undefined>(undefined);
  const { closeModal } = usePostMenuModalContext();

  useEffect(() => {
    const getUserInfo = (username: string) => {
      fetch(`/api/info/${username}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(async (res) => {
          if (!res.ok) {
            setError(`${res.status} ${res.statusText}`);
            return;
          }
          const data = await res.json();
          setUserInfo(data[0]);
        })
        .catch((err) => {
          setError(err.toString());
        });
    };
    getUserInfo(username);
  }, [username]);

  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
  };

  const createdAt = userInfo
    ? new Date(userInfo.createdAt).toLocaleDateString('en-US', options)
    : '';

  return (
    <div className="flex flex-col w-full relative">
      {error && (
        <p className="w-full bg-red-100 text-red-600 text-center p-4 mb-4 font-bold absolute -top-20">
          {error}
        </p>
      )}
      <div className="flex flex-col items-center w-full gap-2">
        <span className="w-full text-center py-2 font-medium border-b border-neutral-200">
          This account information
        </span>
        <Avatar image={userImage} username={username} size="large" />
        <span className="font-bold">{username}</span>
      </div>
      <div className="flex items-center p-4 mt-4">
        <CalendarIcon />
        <div className="flex flex-col ml-4">
          <span className="font-medium">Join Date</span>
          <span className="text-neutral-400">{createdAt}</span>
        </div>
      </div>
      <button
        onClick={() => closeModal()}
        className="w-full p-2 border-t border-neutral-200 text-sm"
      >
        Close
      </button>
    </div>
  );
}
