import { OptionType } from 'src/constants/types'
import { useEffect, useLayoutEffect, useState } from 'react'

interface UseIncrementNumberProps {
  startNumber: number
  endNumber: number
  meanSure?: string
}

export const useIncrementNumber = ({
  startNumber,
  endNumber,
  meanSure,
}: UseIncrementNumberProps) => {
  const [lists, setLists] = useState<OptionType[]>([])
  useEffect(() => {
    if (meanSure) {
      for (let i = startNumber; i <= endNumber; i++) {
        setLists((prev) => [
          ...prev,
          { value: `${i}`, label: `${i} ${meanSure}` },
        ])
      }
    } else {
      for (let i = startNumber; i <= endNumber; i++) {
        setLists((prev) => [...prev, { value: `${i}`, label: `${i}` }])
      }
    }
  }, [startNumber, endNumber, meanSure])

  return lists
}
