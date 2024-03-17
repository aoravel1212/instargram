import { usePostMenuModalContext } from '@/context/PostMenuModalContext';
import { usePostContext } from '@/context/PostContext';
import { ReactElement } from 'react';
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

export default function PostHeader() {
  const post = usePostContext();
  const { userImage, username, createdAt, author, id: postId } = post;
  const { modalType, openModal, closeModal } = usePostMenuModalContext();

  const renderModal = (): ReactElement | null => {
    switch (modalType) {
      case 'menu':
        return (
          <PostModal onClose={closeModal} size="medium">
            <PostMenu authorId={author._ref} />
          </PostModal>
        );
      case 'delete':
        return (
          <PostModal onClose={closeModal} size="medium">
            <PostDelete postId={postId} />
          </PostModal>
        );
      case 'edit':
        return (
          <PostModal onClose={closeModal} size="large">
            <PostEdit />
          </PostModal>
        );
      case 'userInfo':
        return (
          <PostModal onClose={closeModal} size="medium">
            <UserInfo username={username} userImage={userImage} />
          </PostModal>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex justify-between items-center py-3">
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
