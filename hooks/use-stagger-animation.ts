import { useEffect, useState } from "react"

export function useStaggerAnimation(itemCount: number, delayBetweenItems: number = 100) {
  const [visibleIndices, setVisibleIndices] = useState<Set<number>>(new Set())

  useEffect(() => {
    let timeouts: NodeJS.Timeout[] = []

    for (let i = 0; i < itemCount; i++) {
      const timeout = setTimeout(() => {
        setVisibleIndices((prev) => {
          const newSet = new Set(prev)
          newSet.add(i)
          return newSet
        })
      }, i * delayBetweenItems)

      timeouts.push(timeout)
    }

    return () => {
      timeouts.forEach((timeout) => clearTimeout(timeout))
    }
  }, [itemCount, delayBetweenItems])

  return visibleIndices
}
