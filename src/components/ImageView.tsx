import Image from 'next/image';

type Props = {
  image: string;
};

export default function ImageView({ image }: Props) {
  return (
    <div className="w-full h-full aspect-square">
      <Image
        className="object-contain w-full h-full"
        src={image}
        alt="local file"
        fill
        sizes="650px"
      />
    </div>
  );
}
