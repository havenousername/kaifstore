import { RefObject, useEffect } from 'react';

function useOnClickOutside(
  ref: RefObject<HTMLElement>,
  handler: (event: Event) => void,
  ignoreElements?: RefObject<HTMLElement>[],
) {
  useEffect(() => {
    const listener = (event: Event) => {
      if (!ref.current || ref.current.contains(event.target as Element)) {
        return;
      }

      const includedInIgnoreElements =
        ignoreElements &&
        ignoreElements.filter(
          (element) =>
            element.current &&
            element.current.contains(event.target as Element),
        ).length > 0;
      if (includedInIgnoreElements) {
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
  }, [ref, handler, ignoreElements]);
}

export default useOnClickOutside;
