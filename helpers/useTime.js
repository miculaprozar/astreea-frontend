import { useState, useEffect } from 'react';
import { realTimeDifference } from './formatFunctions';

function useTime() {
  const [startTimer, setStartTimer] = useState(null);
  const [endDate, setEndTime] = useState(null);

  useEffect(() => {
    if (startTimer) {
      const setNewTime = setInterval(() => {
        setEndTime(new Date());
      }, 1000);
    }
  }, [startTimer]);

  const setTimeHandler = (startDate) => {
    if (startTimer === null) {
      setStartTimer(startDate);
      setEndTime(new Date());
    }
  };

  return [realTimeDifference(startTimer, endDate), setTimeHandler];
}

export default useTime;
