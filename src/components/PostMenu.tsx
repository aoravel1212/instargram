import EditIcon from './ui/icons/EditIcon';
import DeleteIcon from './ui/icons/DeleteIcon';
import InformationIcon from './ui/icons/InformationIcon';
import { useSession } from 'next-auth/react';

type Props = {
  authorId: string;
  onClose: () => void;
  onOpen: () => void;
};

export default function PostMenu({ authorId, onClose, onOpen }: Props) {
  // const [loading, setLoading] = useState(false);
  // const [error, setError] = useState<string>();
  const { data: session } = useSession();
  const visible = session?.user.id === authorId;

  const handleEditPost = (postId: string) => {
    // fetch(`/api/posts/${postId}`, { method: 'PUT', body: formData });
  };

  const handleModal = () => {
    onClose();
    onOpen();
  };

  const menu = [
    {
      icon: <DeleteIcon />,
      text: 'Delete',
      design: 'text-red-600 font-semibold',
      handle: () => handleModal(),
      visible: visible,
    },
    {
      icon: <EditIcon />,
      text: 'Edit',
      handle: () => handleEditPost,
      visible: visible,
    },
    {
      icon: <InformationIcon />,
      text: 'This account information',
      visible: true,
    },
  ];

  const visibleMenu = menu.filter((item) => item.visible);

  return (
    <div className="w-full">
      {visibleMenu.map((item, index) => (
        <button
          onClick={item.handle}
          className={`flex justify-center items-center w-full gap-1 py-3 ${
            index !== 0 ? 'border-t border-neutral-300' : ''
          } ${item.design && item.design}`}
          key={item.text}
        >
          {item.icon} {item.text}
        </button>
      ))}
    </div>
  );
}
