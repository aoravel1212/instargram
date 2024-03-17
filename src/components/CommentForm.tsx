import { FormEvent, useState } from 'react';
import SmileIcon from './ui/icons/SmileIcon';

type Props = {
  onPostComment: (comment: string) => void;
};

export default function CommentForm({ onPostComment }: Props) {
  const [comment, setComment] = useState('');
  // 사용자가 인풋에 아무것도 입력하지 않으면 게시 버튼 비활성화
  const buttonDisabled = comment.length === 0;

  // 제출 버튼 누르면 서버로 데이터 가게
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onPostComment(comment);
    setComment('');
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center">
      <SmileIcon />
      <input
        className="w-full ml-2 border-none outline-none p-3"
        type="text"
        placeholder="댓글 달기..."
        required
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <button
        disabled={buttonDisabled}
        className={`font-bold ml-2 whitespace-nowrap ${
          buttonDisabled ? 'text-sky-300' : 'text-sky-500'
        }`}
      >
        게시
      </button>
    </form>
  );
}
