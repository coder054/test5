import { useAtom } from 'jotai'
import { useEffect } from 'react'
import { diaryAtom } from 'src/atoms/diaryAtoms'
import { MySlider } from 'src/components/MySlider'
import { emotionlToNum, numToEmotional } from 'src/hooks/functionCommon'

type HealthType = {
  date: string | Date
}

export const Health = ({ date }: HealthType) => {
  const [diary, setDiary] = useAtom(diaryAtom)

  useEffect(() => {
    // debugger
    setDiary({
      eatAndDrink: 'NORMAL',
      energyLevel: 'NORMAL',
      sleep: 'NORMAL',
      typeOfDiary: 'TRAINING',
    })
  }, [date])

  return (
    <div className="space-y-9">
      <MySlider
        label="How is your energy level?"
        onChange={(e) =>
          setDiary((prev) => ({
            ...prev,
            energyLevel: numToEmotional(e),
          }))
        }
        isAdjective
        step={25}
        value={emotionlToNum(diary?.energyLevel)}
        labelClass="text-[#A2A5AD]"
      />
      <MySlider
        label="How did you sleep?"
        onChange={(e) =>
          setDiary((prev) => ({
            ...prev,
            sleep: numToEmotional(e),
          }))
        }
        isAdjective
        step={25}
        value={emotionlToNum(diary?.sleep)}
        labelClass="text-[#A2A5AD]"
      />
      <MySlider
        label="How did you eat and drink?"
        onChange={(e) =>
          setDiary((prev) => ({
            ...prev,
            eatAndDrink: numToEmotional(e),
          }))
        }
        isAdjective
        step={25}
        value={emotionlToNum(diary?.eatAndDrink)}
        labelClass="text-[#A2A5AD]"
      />
    </div>
  )
}
