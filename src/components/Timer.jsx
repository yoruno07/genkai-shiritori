import { useEffect } from 'react'
import { useState } from 'react';
import { useRef } from 'react';

const useCountDownInterval = (countTime, setCountTime) => {
  const intervalRef = useRef(null);

  useEffect(() => {
    if (countTime > 0 && intervalRef.current === null) {
      intervalRef.current = setInterval(() => {
        setCountTime(prevTime => {
          if (prevTime > 0) return prevTime - 1;
          clearInterval(intervalRef.current);
          intervalRef.current = null;
          return 0;
        });
      }, 1000);
    }

    return () => {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    };
  }, [countTime]);

  return intervalRef;
}

const StopStartButton = ({ setCountTime, intervalRef }) => {
  const [isRunning, setIsRunning] = useState(true);

  const handleClick = () => {
    if (isRunning) {
      clearInterval(intervalRef.current)
      intervalRef.current = null;
      setIsRunning(false)
    } else {
      intervalRef.current = setInterval(() => {
        setCountTime(prevTime => {
          if (prevTime > 0) return prevTime - 1;
          clearInterval(intervalRef.current);
          intervalRef.current = null;
          return 0;
        });
      }, 1000);
      setIsRunning(true)
    }
  }

  return (
    <button onClick={handleClick}>
      {isRunning ? '一時停止する' : '再開する'}
    </button>
  );
}

const Timer  = () => {
  const [countTime, setCountTime] = useState(80)
  const intervalRef = useCountDownInterval(countTime, setCountTime)
    return (
      <>
        <p>ゲーム残り時間: {Math.floor(countTime / 60)}分{countTime % 60}秒 </p>
        <StopStartButton setCountTime={setCountTime} intervalRef={intervalRef} />
      </>
    )
}

export default Timer
