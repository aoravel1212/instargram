import { usePostContext } from '@/context/PostContext';
import { Comment } from '@/model/post';
import TooggleButton from './ui/TooggleButton';
import HeartIcon from './ui/icons/HeartIcon';
import HeartFillIcon from './ui/icons/HeartFillIcon';
import BookmarkIcon from './ui/icons/BookmarkIcon';
import BookmarkFillIcon from './ui/icons/BookmarkFillIcon';
import usePosts from '@/hooks/posts';
import useMe from '@/hooks/me';
import CommentForm from './CommentForm';

type Props = {
  children?: React.ReactNode;
  onComment: (comment: Comment) => void;
};

export default function ActionBar({ children, onComment }: Props) {
  const post = usePostContext();
  const { id, likes } = post;
  const { setLike } = usePosts();
  const { user, setBookmark } = useMe();

  const liked = user ? likes.includes(user.username) : false;
  const bookmarked = user?.bookmarks.includes(id) ?? false;

  const handleLike = (like: boolean) => {
    user && setLike(post, user.username, like);
  };

  const handleBookmark = (bookmark: boolean) => {
    user && setBookmark(id, bookmark);
  };

  const handleComment = (comment: string) => {
    user &&
      onComment({
        username: user.username,
        image: user.image,
        text: comment,
        createdAt: new Date().toISOString(),
      });
  };

  return (
    <>
      <div className="flex justify-between my-2 px-4">
        <TooggleButton
          toggled={liked}
          onToggle={handleLike}
          onIcon={<HeartFillIcon />}
          offIcon={<HeartIcon />}
        />
        <TooggleButton
          toggled={bookmarked}
          onToggle={handleBookmark}
          onIcon={<BookmarkFillIcon />}
          offIcon={<BookmarkIcon />}
        />
      </div>
      <div className="px-4 py-1">
        <p className="text-sm font-bold mb-2">{`${likes?.length ?? 0} ${
          likes?.length > 1 ? 'likes' : 'like'
        }`}</p>
        {children}
      </div>
      <CommentForm onPostComment={handleComment} />
    </>
  );
}
