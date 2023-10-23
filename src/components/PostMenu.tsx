import EditIcon from './ui/icons/EditIcon';
import DeleteIcon from './ui/icons/DeleteIcon';
import InformationIcon from './ui/icons/InformationIcon';
import { useSession } from 'next-auth/react';

type Props = {
  authorId: string;
  onClose: () => void;
  onOpenDeleteMenu: () => void;
  onOpenEditMenu: () => void;
};

export default function PostMenu({
  authorId,
  onClose,
  onOpenDeleteMenu,
  onOpenEditMenu,
}: Props) {
  const { data: session } = useSession();
  const visible = session?.user.id === authorId;

  const handleDeleteModal = () => {
    onClose();
    onOpenDeleteMenu();
  };

  const handleEditModal = () => {
    onClose();
    onOpenEditMenu();
  };

  const menu = [
    {
      icon: <DeleteIcon />,
      text: 'Delete',
      design: 'text-red-600 font-semibold',
      handle: () => handleDeleteModal(),
      visible: visible,
    },
    {
      icon: <EditIcon />,
      text: 'Edit',
      handle: () => handleEditModal(),
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
