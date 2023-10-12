import LinkToUserPage from './LinkToUserPage';

type AvatarSize = 'small' | 'medium' | 'large' | 'xlarge';
type Props = {
  image?: string | null;
  size?: AvatarSize;
  highlight?: boolean;
  username?: string;
};

export default function Avatar({
  image,
  size = 'large',
  highlight = false,
  username,
}: Props) {
  const imageSizeStyle = getImageSizeStyle(size);

  const avatarImage = (
    <div className="rounded-full border-[3px] border-white">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className={`object-cover rounded-full shadow-slate-600
        ${imageSizeStyle.image}`}
        src={image ?? undefined}
        alt="user profile"
        referrerPolicy="no-referrer"
      />
    </div>
  );

  return (
    <div className={getContainerStyle(size, highlight)}>
      {username ? (
        <LinkToUserPage username={username}>{avatarImage}</LinkToUserPage>
      ) : (
        avatarImage
      )}
    </div>
  );
}

function getContainerStyle(size: AvatarSize, highlight: boolean): string {
  const baseStyle = 'flex justify-center items-center rounded-full';
  const highlightStyle = highlight
    ? 'bg-gradient-to-bl from-fuchsia-600 via-rose-500 to-amber-300'
    : '';
  const { container } = getImageSizeStyle(size);
  return `${baseStyle} ${highlightStyle} ${container}`;
}

type ImageSizeStyle = {
  container: string;
  image: string;
};

function getImageSizeStyle(size: AvatarSize): ImageSizeStyle {
  switch (size) {
    case 'small':
      return {
        container: 'w-[42px] h-[42px]',
        image: 'w-8 h-8 shadow-[0_0_1px_0.5px_rgba(0,0,0,0.05)]',
      };
    case 'medium':
      return {
        container: 'w-[54px] h-[54px]',
        image: 'w-[44px] h-[44px] shadow-[0_0_1px_0.5px_rgba(0,0,0,0.05)]',
      };
    case 'large':
      return {
        container: 'w-[66px] h-[66px]',
        image: 'w-14 h-14 shadow-[0_0_1px_0.5px_rgba(0,0,0,0.05)]',
      };
    case 'xlarge':
      return {
        container: 'w-[164px] h-[164px]',
        image: 'w-[150px] h-[150px] shadow-[0_0_1px_1px_rgba(0,0,0,0.05)]',
      };
    default:
      throw new Error(`Unsupported type size: ${size}`);
  }
}
