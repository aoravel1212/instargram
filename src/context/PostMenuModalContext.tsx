import { ReactNode, createContext, useContext, useState } from 'react';

type ModalType = 'menu' | 'delete' | 'edit' | 'userInfo' | null;

interface PostMenuModalContextType {
  modalType: ModalType;
  openModal: (type: ModalType) => void;
  closeModal: () => void;
}

const PostMenuModalContext = createContext<
  PostMenuModalContextType | undefined
>(undefined);

export const PostMenuModalProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [modalType, setModalType] = useState<ModalType>(null);

  const openModal = (type: ModalType) => {
    setModalType(type);
  };

  const closeModal = () => {
    setModalType(null);
  };

  return (
    <PostMenuModalContext.Provider value={{ modalType, openModal, closeModal }}>
      {children}
    </PostMenuModalContext.Provider>
  );
};

export const usePostMenuModalContext = () => {
  const context = useContext(PostMenuModalContext);
  if (!context) {
    throw new Error(
      'usePostMenuModalContext must be used within a ModalProvider'
    );
  }
  return context;
};
