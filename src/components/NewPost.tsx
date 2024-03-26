import { FormEvent, useRef, useState } from 'react';
import ImageUploadView from './ImageUploadView';
import ImageView from './ImageView';
import GridSpinner from './ui/GridSpinner';
import Button from './ui/Button';

export default function NewPost() {
  const [file, setFile] = useState<File>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>();
  const [next, setNext] = useState(false);
  const [text, setText] = useState('');
  // 사용자가 인풋에 아무것도 입력하지 않으면 게시 버튼 비활성화
  const buttonDisabled = text.length === 0;

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
    <section className="w-full h-full flex flex-col">
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
        className="flex justify-center items-center relative w-full h-[40px] py-4 border-b border-gray-200"
        onSubmit={handleSubmit}
      >
        <span className="font-semibold">새 게시물</span>
        <div className="absolute right-0 pr-2">
          {!next ? (
            <Button
              text={'다음'}
              onClick={() => {
                setNext(true);
              }}
              type="text"
              buttonDisabled={!file}
            />
          ) : (
            <Button
              text={'공유'}
              onClick={() => {}}
              type="text"
              buttonDisabled={buttonDisabled}
            />
          )}
        </div>
      </form>
      <div className="flex-1 w-full">
        <div className="flex flex-col items-center h-full w-full relative">
          {!file && <ImageUploadView onImageUpload={handleImageUpload} />}
          {file && !next && <ImageView image={URL.createObjectURL(file)} />}
          {next && (
            <textarea
              className="w-full h-full border-none outline-none resize-none rounded-b-lg p-2"
              name="text"
              id="input-text"
              required
              rows={10}
              placeholder="문구를 작성해주세요"
              ref={textRef}
              onChange={(e) => setText(e.target.value)}
            />
          )}
        </div>
      </div>
    </section>
  );
}
