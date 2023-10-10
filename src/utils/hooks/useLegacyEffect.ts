import { useEffect, useRef } from 'react';
const useLegacyEffect = (cb: Function, deps: any[]) => {
  const isMountedRef = useRef(false);

  useEffect(() => {
    if (!isMountedRef.current) {
      isMountedRef.current = true;
      return undefined;
    }

    return cb();
  }, deps);
};

export default useLegacyEffect;