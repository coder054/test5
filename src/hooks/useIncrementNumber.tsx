import { OptionType } from 'src/constants/types'
import { useEffect, useLayoutEffect, useState } from 'react'

interface UseIncrementNumberProps {
  startNumber: number
  endNumber: number
  meanSure?: string
  incrementNumber?: number
}

export const useIncrementNumber = ({
  startNumber,
  endNumber,
  meanSure,
  incrementNumber,
}: UseIncrementNumberProps) => {
  const [lists, setLists] = useState<OptionType[]>([])
  useEffect(() => {
    for (
      let i = startNumber;
      i <= endNumber;
      incrementNumber ? (i += 0.5) : i++
    ) {
      setLists((prev) => [
        ...prev,
        { value: `${i}`, label: `${i} ${meanSure ? meanSure : ''}` },
      ])
    }
  }, [startNumber, endNumber, meanSure])

  return lists
}
