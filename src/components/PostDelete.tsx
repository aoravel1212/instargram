import GridSpinner from './ui/GridSpinner';
import { useState } from 'react';

type Props = {
  onClose: () => void;
  postId: string;
};

export default function PostDelete({ onClose, postId }: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>();

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
      .catch((err) => setError(err.toString()))
      .finally(() => setLoading(false))
      .then(() => onClose());
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
      <span className="text-center m-8 font-medium whitespace-nowrap">
        Would you like to delete this post?
      </span>
      <button
        onClick={() => handleDeletePost(postId)}
        className="p-2 border-t border-neutral-200 text-red-600 font-semibold text-sm"
      >
        Delete
      </button>
      <button
        onClick={() => onClose()}
        className="p-2 border-t border-neutral-200 text-sm"
      >
        Cancel
      </button>
    </div>
  );
}
