'use client';
import { usePostContext } from '@/context/PostContext';
import { useState } from 'react';
import { Comment } from '@/model/post';
import Image from 'next/image';
import ActionBar from './ActionBar';
import ModalPortal from './ui/ModalPortal';
import PostModal from './PostModal';
import PostDetail from './PostDetail';
import PostHeader from './PostHeader';
import usePosts from '@/hooks/posts';

type Props = {
  priority?: boolean;
};

export default function PostListCard({ priority = false }: Props) {
  const post = usePostContext();
  const { username, image, text, comments } = post;
  const { postComment } = usePosts();
  const [openModal, setOpenModal] = useState(false);

  const handlePostComment = (comment: Comment) => {
    postComment(post, comment);
  };

  return (
    <article className="rounded-lg shadow-md border border-gray-200">
      <PostHeader />
      <Image
        className="w-full object-cover aspect-square border border-neutral-200"
        src={image}
        alt={`photo by ${username}`}
        width={500}
        height={500}
        priority={priority}
        onClick={() => setOpenModal(true)}
      />
      <ActionBar onComment={handlePostComment}>
        <p>
          <span className="font-bold mr-1">{username}</span>
          {text}
        </p>
        {comments > 0 && (
          <button
            className="font-bold my-2 text-sky-500"
            onClick={() => setOpenModal(true)}
          >
            {comments === 1
              ? `댓글 ${comments}개 보기`
              : `댓글 ${comments}개 모두 보기`}
          </button>
        )}
      </ActionBar>
      {openModal && (
        <ModalPortal>
          <PostModal onClose={() => setOpenModal(false)}>
            <PostDetail />
          </PostModal>
        </ModalPortal>
      )}
    </article>
  );
}
