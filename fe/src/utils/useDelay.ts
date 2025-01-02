import { useCallback } from "react";

export const useDelay = () => {
  const callback = useCallback((callback: () => void, deplay: number) => {
    const timer = setTimeout(() => {
      callback();
    }, deplay);
    return () => clearTimeout(timer);
  }, []);
  return callback;
};
