import { useEffect, useState } from 'react';

export default function useViewportWidth() {
  const [viewportWidth, setViewportWidth] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      setViewportWidth(window.innerWidth);
    };

    // 페이지 최초 렌더링(ssr)에서 동작하지 않도록 가드
    if (typeof window !== 'undefined') {
      setViewportWidth(window.innerWidth); // 초기 렌더링 시에 한 번 호출
      window.addEventListener('resize', handleResize);
      return () => {
        window.removeEventListener('resize', handleResize); // 리스너 클린업
      };
    }
  }, []);

  return viewportWidth;
}
