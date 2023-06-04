import { createPortal } from 'react-dom';

type Props = {
  children: React.ReactNode;
};

export default function ModalPortal({ children }: Props) {
  // 브라우저 환경일 때만 모달을 렌더링 할 것 <= ssr이 안되도록 하기 위해서
  if (typeof window === 'undefined') {
    return null;
  }

  const node = document.getElementById('portal') as Element;

  return createPortal(children, node);
}
