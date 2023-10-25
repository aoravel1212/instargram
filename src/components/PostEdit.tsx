import { usePostContext } from '@/context/PostContext';
import { usePostMenuModalContext } from '@/context/PostMenuModalContext';
import ImageView from './ImageView';
import Button from './ui/Button';
import GridSpinner from './ui/GridSpinner';
import { FormEvent, useRef, useState } from 'react';

export default function PostEdit() {
  const post = usePostContext();
  const { id, image, text } = post;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>();
  const { closeModal } = usePostMenuModalContext();

  const textRef = useRef<HTMLTextAreaElement>(null);

  const handleEditPost = (e: FormEvent) => {
    e.preventDefault();
    if (!textRef) return;

    setLoading(true);
    const editedText = textRef.current?.value;

    fetch(`/api/posts/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ editedText }),
    })
      .then((res) => {
        if (!res.ok) {
          setError(`${res.status} ${res.statusText}`);
          return;
        }
      })
      .then(() => alert('Your post was edited.'))
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
    <section className="w-full h-full relative">
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
      <form
        className="flex justify-center items-center relative w-full h-[8%] py-2 border-b border-gray-200"
        onSubmit={handleEditPost}
      >
        <span className="font-semibold">Edit post</span>
        <div className="absolute left-0 pl-2">
          <Button text="Canel" onClick={() => closeModal()} type="text" />
        </div>
        <div className="absolute right-0 pr-2">
          <Button text="Publish" onClick={() => {}} type="text" />
        </div>
      </form>
      <div className="flex h-[92%]">
        <div className="flex flex-col items-center w-2/3 h-full relative">
          <ImageView image={image} />
        </div>
        <div className="w-1/3 h-full border-l-2 border-gray-200">
          <textarea
            className="w-full h-full border-none outline-none resize-none rounded-br-lg p-2"
            name="text"
            id="input-text"
            required
            rows={10}
            placeholder="Write a caption..."
            ref={textRef}
          >
            {text}
          </textarea>
        </div>
      </div>
    </section>
  );
}
