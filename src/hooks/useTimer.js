import { useEffect, useState } from 'react';
/**
 * A React hook to setup a timer based on the time given as parameter
 * @param {number} timeInSeconds time in seconds
 * @returns {number}
 */
const useTimer = (timeInSeconds = 3600) => {
  const [now, setNow] = useState(timeInSeconds);
  useEffect(() => {
    const intervalId = setInterval(
      () => setNow((i) => (i !== 0 ? i - 1 : 0)),
      60000,
    );
    return () => clearInterval(intervalId);
  }, []);

  return now;
};

export default useTimer;
