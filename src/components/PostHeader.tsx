import { usePostContext } from '@/context/PostContext';
import { ReactElement, useState } from 'react';
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
import UserInfo from './UserInfo';

type ModalType = 'menu' | 'delete' | 'edit' | 'userInfo' | null;

export default function PostHeader() {
  const post = usePostContext();
  const { userImage, username, createdAt, author, id: postId } = post;
  const [modalType, setModalType] = useState<ModalType>(null);

  const openModal = (type: ModalType) => {
    setModalType(type);
  };

  const closeModal = () => {
    setModalType(null);
  };

  const renderModal = (): ReactElement | null => {
    switch (modalType) {
      case 'menu':
        return (
          <PostModal onClose={closeModal} size="medium">
            <PostMenu
              onClose={closeModal}
              onOpenDeleteMenu={() => openModal('delete')}
              onOpenEditMenu={() => openModal('edit')}
              authorId={author._ref}
            />
          </PostModal>
        );
      case 'delete':
        return (
          <PostModal onClose={closeModal} size="medium">
            <PostDelete onClose={closeModal} postId={postId} />
          </PostModal>
        );
      case 'edit':
        return (
          <PostModal onClose={closeModal} size="large">
            <PostEdit onClose={closeModal} />
          </PostModal>
        );
      default:
        return null;
    }
  };

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
      <div className="cursor-pointer" onClick={() => openModal('menu')}>
        <DotsThreeBoldIcon />
      </div>
      {modalType && <ModalPortal>{renderModal()}</ModalPortal>}
    </div>
  );
}
