import React,{useState, useEffect} from 'react'
import "./Counter.css"

export default function Counter({ startTime, isTimerStarted }) {
  const [elapsedTime, setElapsedTime] = useState('00:00:00');

  useEffect(() => {
    let intervalId;

    if (isTimerStarted && startTime) {
      intervalId = setInterval(() => {
        const now = new Date();
        const diff = now - startTime;
        
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        const formattedTime = [
          hours.toString().padStart(2, '0'),
          minutes.toString().padStart(2, '0'),
          seconds.toString().padStart(2, '0')
        ].join(':');

        setElapsedTime(formattedTime);
      }, 1000);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [startTime, isTimerStarted]);

  return (
    <div className='counterWrapper'>
        <p className="title">経過時間</p>
        <p className="counter">{elapsedTime}</p>
    </div>
  )
}
