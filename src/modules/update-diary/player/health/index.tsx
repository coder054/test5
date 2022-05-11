import { useAtom } from 'jotai'
import { useEffect } from 'react'
import { diaryAtom } from 'src/atoms/diaryAtoms'
import { MySlider } from 'src/components/MySlider'
import { emotionToNum, numToEmotion } from 'src/hooks/functionCommon'

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
    <div className="mobileM:space-y-3 tabletM:space-y-9">
      <MySlider
        label="How is your energy level?"
        onChange={(e) =>
          setDiary((prev) => ({
            ...prev,
            energyLevel: numToEmotion(e),
          }))
        }
        isAdjective
        step={25}
        value={emotionToNum(diary?.energyLevel)}
        labelClass="text-[#A2A5AD]"
      />
      <MySlider
        label="How did you sleep?"
        onChange={(e) =>
          setDiary((prev) => ({
            ...prev,
            sleep: numToEmotion(e),
          }))
        }
        isAdjective
        step={25}
        value={emotionToNum(diary?.sleep)}
        labelClass="text-[#A2A5AD]"
      />
      <MySlider
        label="How did you eat and drink?"
        onChange={(e) =>
          setDiary((prev) => ({
            ...prev,
            eatAndDrink: numToEmotion(e),
          }))
        }
        isAdjective
        step={25}
        value={emotionToNum(diary?.eatAndDrink)}
        labelClass="text-[#A2A5AD]"
      />
    </div>
  )
}
