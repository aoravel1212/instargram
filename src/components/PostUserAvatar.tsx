import { useState } from 'react';
import Avatar from './Avatar';
import FollowButton from './FollowButton';
import LinkToUserPage from './LinkToUserPage';
import DotsThreeBoldIcon from './ui/icons/DotsThreeBoldIcon';
import ModalPortal from './ui/ModalPortal';
import PostModal from './PostModal';
import PostMenu from './PostMenu';
import PostDelete from './PostDelete';
// import PostEdit from './PostEdit';

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
  const [openMenu, setOpenMenu] = useState(false);
  const [openDeleteMenu, setOpenDeleteMenu] = useState(false);
  const [openEditMenu, setOpenEditMenu] = useState(false);

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
      <div className="cursor-pointer" onClick={() => setOpenMenu(true)}>
        <DotsThreeBoldIcon />
      </div>
      {openMenu && (
        <ModalPortal>
          <PostModal onClose={() => setOpenMenu(false)} size="medium">
            <PostMenu
              onClose={() => setOpenMenu(false)}
              onOpen={() => setOpenDeleteMenu(true)}
              authorId={authorId}
            />
          </PostModal>
        </ModalPortal>
      )}
      {openDeleteMenu && (
        <ModalPortal>
          <PostModal onClose={() => setOpenDeleteMenu(false)} size="medium">
            <PostDelete
              onClose={() => setOpenDeleteMenu(false)}
              postId={postId}
            />
          </PostModal>
        </ModalPortal>
      )}
      {/* {openEditMenu && (
        <ModalPortal>
          <PostModal onClose={() => setOpenEditMenu(false)} size="medium">
            <PostEdit onClose={() => setOpenEditMenu(false)} postId={postId} />
          </PostModal>
        </ModalPortal>
      )} */}
    </div>
  );
}
