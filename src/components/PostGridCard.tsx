import { useState } from 'react';
import { usePostContext } from '@/context/PostContext';
import Image from 'next/image';
import ModalPortal from './ui/ModalPortal';
import PostModal from './PostModal';
import PostDetail from './PostDetail';

type Props = {
  priority: boolean;
};

export default function PostGridCard({ priority = false }: Props) {
  const post = usePostContext();
  const { image, username } = post;
  const [openModal, setOpenModal] = useState(false);

  return (
    <div className="relative w-full aspect-square">
      <Image
        className="object-cover"
        src={image}
        alt={`photo by ${username}`}
        fill
        sizes="650px"
        priority={priority}
        onClick={() => setOpenModal(true)}
      />
      {openModal && (
        <ModalPortal>
          <PostModal onClose={() => setOpenModal(false)}>
            <PostDetail />
          </PostModal>
        </ModalPortal>
      )}
    </div>
  );
}
