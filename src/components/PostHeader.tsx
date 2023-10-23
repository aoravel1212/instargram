import { usePostContext } from '@/context/PostContext';
import { useState } from 'react';
import { parseDate } from '@/util/date';
import FollowButton from './FollowButton';
import DotsThreeBoldIcon from './ui/icons/DotsThreeBoldIcon';
import ModalPortal from './ui/ModalPortal';
import PostModal from './PostModal';
import PostMenu from './PostMenu';
import PostDelete from './PostDelete';
import PostEdit from './PostEdit';
import PostUserAvatar from './PostUserAvatar';
import DotIcon from './ui/icons/DotIcon';

export default function PostHeader() {
  const post = usePostContext();
  const { userImage, username, createdAt, author, id: postId } = post;

  const [openMenu, setOpenMenu] = useState(false);
  const [openDeleteMenu, setOpenDeleteMenu] = useState(false);
  const [openEditMenu, setOpenEditMenu] = useState(false);

  return (
    <div className="flex justify-between items-center p-2">
      <div className="flex items-center">
        <PostUserAvatar image={userImage} username={username} />
        <DotIcon />
        <p className=" text-neutral-500 uppercase my-2">
          {parseDate(createdAt)}
        </p>
        <FollowButton username={username} id={author._ref} type={'text'} />
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
              authorId={author._ref}
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
            <PostEdit onClose={() => setOpenEditMenu(false)} />
          </PostModal>
        </ModalPortal>
      )}
    </div>
  );
}
