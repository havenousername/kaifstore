import { DependencyList, EffectCallback, useEffect } from 'react';

const useEffectDebounce = (
  effect: EffectCallback,
  deps?: DependencyList,
  time = 200,
) => {
  useEffect(() => {
    setTimeout(() => {
      effect();
    }, time);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
};

export default useEffectDebounce;
