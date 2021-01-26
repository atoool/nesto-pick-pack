import { useEffect, useState } from 'react';

const useTimer = (timeInSeconds = 3600) => {
  const [now, setNow] = useState(timeInSeconds);
  useEffect(() => {
    const intervalId = setInterval(
      () => setNow((i) => (i !== 0 ? i - 1 : 0)),
      1000,
    );
    return () => clearInterval(intervalId);
  }, []);

  return now;
};

export default useTimer;
