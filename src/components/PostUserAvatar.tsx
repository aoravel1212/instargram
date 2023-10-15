import { useState } from 'react';
import Avatar from './Avatar';
import FollowButton from './FollowButton';
import LinkToUserPage from './LinkToUserPage';
import DotsThreeBoldIcon from './ui/icons/DotsThreeBoldIcon';
import ModalPortal from './ui/ModalPortal';
import PostModal from './PostModal';
import PostMenu from './PostMenu';

type Props = {
  image: string;
  username: string;
  authorId: string;
  postId: string;
  children?: React.ReactNode;
};

export default function PostUserAvatar({
  image,
  username,
  authorId,
  postId,
  children,
}: Props) {
  const [openModal, setOpenModal] = useState(false);
  return (
    <div className="flex justify-between items-center p-2">
      <div className="flex items-center">
        <div className="p-1">
          <Avatar username={username} image={image} size="small" highlight />
        </div>
        <div className="ml-2">
          <LinkToUserPage username={username}>
            <span className="text-gray-900 font-bold">{username}</span>
          </LinkToUserPage>
        </div>
        {children}
        <FollowButton username={username} id={authorId} type={'text'} />
      </div>
      <div className="cursor-pointer" onClick={() => setOpenModal(true)}>
        <DotsThreeBoldIcon />
      </div>
      {openModal && (
        <ModalPortal>
          <PostModal onClose={() => setOpenModal(false)} size="medium">
            <PostMenu postId={postId} authorId={authorId} />
          </PostModal>
        </ModalPortal>
      )}
      {/* <Dropdown>
        <DotsThreeBoldIcon />
      </Dropdown> */}
    </div>
  );
}
