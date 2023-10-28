import { FullPost } from '@/model/post';
import Avatar from './Avatar';
import { parseDate } from '@/util/date';
import LinkToUserPage from './LinkToUserPage';
import { usePostContext } from '@/context/PostContext';

type Props = {
  data: FullPost;
};

export default function PostContent({ data }: Props) {
  const post = usePostContext();
  const { username, userImage, createdAt } = post;

  return (
    <div className="flex-1 p-2 border-y border-gray-200 overflow-y-auto">
      <div className="flex">
        <div className="p-1">
          <Avatar
            username={username}
            image={userImage}
            size="small"
            highlight
          />
        </div>
        <div className="ml-2">
          <div>
            <LinkToUserPage username={username}>
              <span className="text-gray-900 font-bold">{username}</span>
            </LinkToUserPage>
            <span className="ml-2">{data.text}</span>
          </div>
          <p className="text-xs text-neutral-500 uppercase my-2">
            {parseDate(createdAt)}
          </p>
        </div>
      </div>
      <ul>
        {data.comments &&
          data.comments.map(
            (
              { username: commentUsername, image, text: comment, createdAt },
              index
            ) => (
              <li key={index} className="flex">
                <div className="p-1">
                  <Avatar
                    username={commentUsername}
                    image={image}
                    size="small"
                    highlight={commentUsername === username}
                  />
                </div>
                <div className="ml-2">
                  <div>
                    <span className="text-gray-900 font-bold">
                      <LinkToUserPage username={commentUsername}>
                        {commentUsername}
                      </LinkToUserPage>
                    </span>
                    <span className="ml-2">{comment}</span>
                  </div>
                  <p className="text-xs text-neutral-500 uppercase my-2">
                    {parseDate(createdAt)}
                  </p>
                </div>
              </li>
            )
          )}
      </ul>
    </div>
  );
}
