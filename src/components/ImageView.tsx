import Image from 'next/image';

type Props = {
  file: File;
};

export default function ImageView({ file }: Props) {
  return (
    <div className="w-full h-full aspect-square">
      <Image
        className="object-contain w-full h-full"
        src={URL.createObjectURL(file)}
        alt="local file"
        fill
      />
    </div>
  );
}
