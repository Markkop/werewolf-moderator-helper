import { useState, useEffect } from 'react'

export const useTimer = (initialSeconds: number) => {
  const [seconds, setSeconds] = useState(initialSeconds)

  useEffect(() => {
    if (seconds > 0) {
      const timeoutId = setTimeout(() => {
        setSeconds(seconds - 1)
      }, 1000)

      return () => {
        clearTimeout(timeoutId)
      }
    }
  }, [seconds])
  return { seconds, setSeconds }
}
