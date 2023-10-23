import { FormEvent, useRef, useState } from 'react';
import ImageUploadView from './ImageUploadView';
import ImageView from './ImageView';
import GridSpinner from './ui/GridSpinner';
import Button from './ui/Button';

export default function NewPost() {
  const [file, setFile] = useState<File>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>();

  const textRef = useRef<HTMLTextAreaElement>(null);

  const handleImageUpload = (imageFile: File) => {
    setFile(imageFile);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!file) return;

    setLoading(true);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('text', textRef.current?.value ?? '');

    fetch('/api/posts/', { method: 'POST', body: formData }) //
      .then((res) => {
        if (!res.ok) {
          setError(`${res.status} ${res.statusText}`);
          return;
        }
        location.reload();
      })
      .catch((err) => setError(err.toString()))
      .finally(() => setLoading(false));
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
        onSubmit={handleSubmit}
      >
        <span className="font-semibold">Create a new post</span>
        <div className="absolute right-0 pr-2">
          <Button text="Publish" onClick={() => {}} type="text" />
        </div>
      </form>
      <div className="flex h-[92%]">
        <div className="flex flex-col items-center w-2/3 h-full relative">
          {!file && <ImageUploadView onImageUpload={handleImageUpload} />}
          {file && <ImageView image={URL.createObjectURL(file)} />}
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
          />
        </div>
      </div>
    </section>
  );
}
