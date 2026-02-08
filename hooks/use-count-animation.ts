import { useEffect, useRef, useState } from "react"

export function useCountAnimation(targetValue: number, duration: number = 2000) {
  const [count, setCount] = useState(0)
  const animationFrameRef = useRef<number | null>(null)
  const startTimeRef = useRef<number | null>(null)

  useEffect(() => {
    const startAnimation = () => {
      startTimeRef.current = Date.now()

      const animate = () => {
        if (!startTimeRef.current) return

        const elapsed = Date.now() - startTimeRef.current
        const progress = Math.min(elapsed / duration, 1)
        
        // 使用缓动函数（ease-out-cubic）
        const easeOutCubic = 1 - Math.pow(1 - progress, 3)
        const currentValue = Math.floor(easeOutCubic * targetValue)
        
        setCount(currentValue)

        if (progress < 1) {
          animationFrameRef.current = requestAnimationFrame(animate)
        } else {
          setCount(targetValue)
        }
      }

      animationFrameRef.current = requestAnimationFrame(animate)
    }

    startAnimation()

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [targetValue, duration])

  return count
}
