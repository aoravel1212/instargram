import { FullPost } from '@/model/post';
import Avatar from './Avatar';
import { parseDate } from '@/util/date';

type Props = {
  image: string;
  username: string;
  data: FullPost;
  createdAt: string;
};

export default function PostContent({
  image,
  username,
  createdAt,
  data,
}: Props) {
  return (
    <div className="p-2 border-t border-gray-200 overflow-y-auto">
      <div className="flex ">
        <div className="p-1">
          <Avatar image={image} size="small" highlight />
        </div>
        <div className="ml-2">
          <div>
            <span className="text-gray-900 font-bold">{username}</span>
            <span className="ml-2">{data.text}</span>
          </div>
          <p className="text-xs text-neutral-500 uppercase my-2">
            {parseDate(createdAt)}
          </p>
        </div>
      </div>
      <ul className="h-full mb-1">
        {data.comments &&
          data.comments.map(
            (
              { username: commentUsername, image, text: comment, createdAt },
              index
            ) => (
              // <li key={index} className="flex items-center p-2">
              //   <Avatar
              //     image={image}
              //     size="small"
              //     highlight={commentUsername === username}
              //   />
              //   <div className="ml-4">
              //     <span className="font-bold mr-2">{commentUsername}</span>
              //     <span>{comment}</span>
              //   </div>
              // </li>
              <li key={index} className="flex">
                <div className="p-1">
                  <Avatar
                    image={image}
                    size="small"
                    highlight={commentUsername === username}
                  />
                </div>
                <div className="ml-2">
                  <div>
                    <span className="text-gray-900 font-bold">
                      {commentUsername}
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
