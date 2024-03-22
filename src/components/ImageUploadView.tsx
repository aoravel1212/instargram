import { ChangeEvent, DragEvent, useRef, useState } from 'react';
import Button from './ui/Button';
import FilesIcon from './ui/icons/FilesIcon';

type Props = {
  onImageUpload: (file: File) => void;
};

export default function ImageUploadView({ onImageUpload: setFile }: Props) {
  const [dragging, setDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const files = e.target?.files;
    if (files && files[0]) {
      setFile(files[0]);
    }
  };

  const handleDrag = (e: DragEvent) => {
    if (e.type === 'dragenter') {
      setDragging(true);
    } else if (e.type === 'dragleave') {
      setDragging(false);
    }
  };

  const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const files = e.dataTransfer?.files;
    if (files && files[0]) {
      setFile(files[0]);
    }
  };

  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <>
      <input
        className="hidden"
        type="file"
        accept="image/*"
        name="input"
        id="input-upload"
        onChange={handleChange}
        ref={fileInputRef}
      />
      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className={`flex flex-col justify-center items-center w-full h-full top-0 mb-4 sm:mb-0 ${
          dragging &&
          'border-2 border-dashed border-black bg-slate-300 opacity-50 rounded-bl-lg'
        }`}
      >
        <div className="flex flex-col items-center pointer-events-none">
          <FilesIcon />
          <p className="m-4 text-lg">사진을 여기에 끌어다 놓으세요</p>
        </div>
        <div className={`${dragging && 'pointer-events-none'}`}>
          <Button
            text="컴퓨터에서 선택"
            onClick={handleUploadClick}
            type="box"
          />
        </div>
      </div>
    </>
  );
}
