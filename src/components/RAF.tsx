import React from 'react';

export const useRaf = (
  callback: (timeElapsed: number, timeFromStart: number) => boolean
) => {
  const startTime = React.useRef<number>(Date.now());
  const frameTime = React.useRef<number>(Date.now());
  const rafId = React.useRef<number>(0);
  const [isRunning, setIsRunning] = React.useState<boolean>(true);

  const onEachFrame = React.useCallback(() => {
    const timeFromStart = Date.now() - frameTime.current;
    const timeElapsed = Date.now() - startTime.current;
    startTime.current = Date.now();
    rafId.current = window.requestAnimationFrame(onEachFrame);
    setIsRunning(callback(timeElapsed, timeFromStart));
  }, [callback]);

  React.useLayoutEffect(() => {
    if (isRunning) {
      frameTime.current = Date.now();
      startTime.current = Date.now();
      rafId.current = window.requestAnimationFrame(onEachFrame);
      return () => {
        window.cancelAnimationFrame(rafId.current);
      };
    }
  }, [isRunning, onEachFrame]);
};
