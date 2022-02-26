import { MutableRefObject, useEffect } from 'react';

function useOnClickOutside(
  ref: MutableRefObject<HTMLElement>,
  handler: (event: Event) => void,
) {
  useEffect(() => {
    const listener = (event: Event) => {
      if (!ref.current || ref.current.contains(event.target as Element)) {
        return;
      }

      handler(event);
    };

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler]);
}

export default useOnClickOutside;
