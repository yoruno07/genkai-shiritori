import { useEffect } from 'react'
import { useState } from 'react';

const useCountDownInterval = (countTime, setCountTime) => {
  useEffect(() => {
    const countDownInterval = setInterval(() => {
      if (countTime === 0) {
        clearInterval(countDownInterval)
      }
      if (countTime && countTime > 0) {
        setCountTime(countTime - 1)
      }
    }, 1000)
    return () => {
      clearInterval(countDownInterval)
    }
  }, [countTime])
}

const Timer  = () => {
  const [countTime, setCountTime] = useState(10)
  useCountDownInterval(countTime, setCountTime)
    return (
      <p>ゲーム残り時間: {Math.floor(countTime / 60)}分{countTime % 60}秒 </p>
    )
}

export default Timer
