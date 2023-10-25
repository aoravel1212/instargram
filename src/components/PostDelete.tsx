import { usePostMenuModalContext } from '@/context/PostMenuModalContext';
import GridSpinner from './ui/GridSpinner';
import { useState } from 'react';

type Props = {
  postId: string;
};

export default function PostDelete({ postId }: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>();
  const { closeModal } = usePostMenuModalContext();

  const handleDeletePost = (postId: string) => {
    setLoading(true);
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
      .then(() => alert('Your post was successfully deleted!'))
      .catch((err) => {
        setError(err.toString());
        alert(error);
      })
      .finally(() => {
        setLoading(false);
        closeModal();
      });
  };

  return (
    <div className="flex flex-col w-full relative">
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
      <div className="flex flex-col items-center p-8 gap-2 whitespace-nowrap">
        <span className="font-medium text-2xl">Are you sure?</span>
        <span>Would you like to delete this post?</span>
      </div>
      <button
        onClick={() => handleDeletePost(postId)}
        className="p-2 border-t border-neutral-200 text-red-600 font-semibold text-sm"
      >
        Delete
      </button>
      <button
        onClick={() => closeModal()}
        className="p-2 border-t border-neutral-200 text-sm"
      >
        Cancel
      </button>
    </div>
  );
}
