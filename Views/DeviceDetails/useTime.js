import { useState, useEffect } from 'react';
import { realTimeDifference } from '../../helpers/formatFunctions';

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

  return [realTimeDifference(startTimer, endDate), setStartTimer];
}

export default useTime;
