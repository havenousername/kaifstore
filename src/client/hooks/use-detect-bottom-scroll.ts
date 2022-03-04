import {
  Dispatch,
  MutableRefObject,
  SetStateAction,
  useEffect,
  useState,
} from 'react';

const useDetectBottomScroll = (
  ref: MutableRefObject<Element>,
): [boolean, Dispatch<SetStateAction<boolean>>] => {
  const [isBottom, setIsBottom] = useState<boolean>(false);
  const onScroll = () => {
    if (ref.current) {
      if (ref.current.getBoundingClientRect().bottom <= window.innerHeight) {
        setIsBottom(true);
      } else {
        setIsBottom(false);
      }
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', onScroll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [isBottom, setIsBottom];
};

export default useDetectBottomScroll;
