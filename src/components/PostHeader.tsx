import { useState } from 'react';
import FollowButton from './FollowButton';
import DotsThreeBoldIcon from './ui/icons/DotsThreeBoldIcon';
import ModalPortal from './ui/ModalPortal';
import PostModal from './PostModal';
import PostMenu from './PostMenu';
import PostDelete from './PostDelete';
import PostEdit from './PostEdit';
import PostUserAvatar from './PostUserAvatar';
import DotIcon from './ui/icons/DotIcon';
import { parseDate } from '@/util/date';

type Props = {
  image: string;
  username: string;
  createdAt: string;
  authorId: string;
  postId: string;
};

export default function PostHeader({
  image,
  username,
  createdAt,
  authorId,
  postId,
}: Props) {
  const [openMenu, setOpenMenu] = useState(false);
  const [openDeleteMenu, setOpenDeleteMenu] = useState(false);
  const [openEditMenu, setOpenEditMenu] = useState(false);

  return (
    <div className="flex justify-between items-center p-2">
      <div className="flex items-center">
        <PostUserAvatar image={image} username={username} />
        <DotIcon />
        <p className=" text-neutral-500 uppercase my-2">
          {parseDate(createdAt)}
        </p>
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
              onOpenDeleteMenu={() => setOpenDeleteMenu(true)}
              onOpenEditMenu={() => setOpenEditMenu(true)}
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
      {openEditMenu && (
        <ModalPortal>
          <PostModal onClose={() => setOpenEditMenu(false)} size="large">
            <PostEdit onClose={() => setOpenEditMenu(false)} postId={postId} />
          </PostModal>
        </ModalPortal>
      )}
    </div>
  );
}
