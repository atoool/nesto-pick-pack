import { useEffect, useRef } from 'react';

/**
 * React Hook to setup a count down timer
 * @param {function} callback function to be called repeatedly as per the delay
 * @param {number} delay milliseconds value of delay
 */
const useInterval = (callback, delay) => {
  const savedCallback = useRef();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    const tick = () => {
      savedCallback.current();
    };
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
};

export default useInterval;
