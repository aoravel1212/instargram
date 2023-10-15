import { useState } from 'react';
import EditIcon from './ui/icons/EditIcon';
import DeleteIcon from './ui/icons/DeleteIcon';
import InformationIcon from './ui/icons/InformationIcon';
import GridSpinner from './ui/GridSpinner';
import { useSession } from 'next-auth/react';

type Props = {
  postId: string;
  authorId: string;
};

export default function PostMenu({ postId, authorId }: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>();
  const { data: session } = useSession();
  const visible = session?.user.id === authorId;

  const handleEditPost = () => {
    // fetch('/api/posts/[id]', {method:'PUT', body: })
  };

  const handleDeletePost = (postId: string) => {
    fetch(`/api/posts/${postId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        if (!res.ok) {
          setError(`${res.status} ${res.statusText}`);
          return;
        }
      })
      .catch((err) => setError(err.toString()))
      .finally(() => setLoading(false));
  };

  const menu = [
    {
      icon: <EditIcon />,
      text: 'Edit',
      handle: () => handleEditPost,
      visible: visible,
    },
    {
      icon: <DeleteIcon />,
      text: 'Delete',
      handle: () => handleDeletePost(postId),
      visible: visible,
    },
    {
      icon: <InformationIcon />,
      text: 'This account information',
      visible: true,
    },
  ];

  const visibleMenu = menu.filter((item) => item.visible);

  return (
    <div className="w-full relative">
      {loading && (
        <div className="flex justify-center items-center absolute bg-slate-300/70 inset-0 z-20">
          <GridSpinner />
        </div>
      )}
      {error && (
        <p className="w-full bg-red-100 text-red-600 text-center p-4 mb-4 font-bold absolute -top-20">
          {error}
        </p>
      )}
      {visibleMenu.map((item, index) => (
        <button
          onClick={item.handle}
          className={`flex justify-center items-center w-full gap-1 py-3 ${
            index !== 0 ? 'border-t border-neutral-300' : ''
          }`}
          key={item.text}
        >
          {item.icon} {item.text}
        </button>
      ))}
    </div>
  );
}
