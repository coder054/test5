import { useAtom } from 'jotai'
import { useEffect } from 'react'
import { diaryAtom } from 'src/atoms/diaryAtoms'
import { MySlider } from 'src/components/MySlider'
import {
  generateRateByNumber,
  generateRateByString,
} from 'src/hooks/functionCommon'

type HealthType = {
  date: string | Date
}

export const Health = ({ date }: HealthType) => {
  const [diary, setDiary] = useAtom(diaryAtom)

  useEffect(() => {
    setDiary({
      eatAndDrink: 'NORMAL',
      energyLevel: 'NORMAL',
      injuries: [],
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
            energyLevel: generateRateByNumber(e),
          }))
        }
        isAdjective
        step={25}
        value={generateRateByString(diary.energyLevel)}
        labelClass="text-[#A2A5AD]"
      />
      <MySlider
        label="How did you sleep?"
        onChange={(e) =>
          setDiary((prev) => ({
            ...prev,
            sleep: generateRateByNumber(e),
          }))
        }
        isAdjective
        step={25}
        value={generateRateByString(diary.sleep)}
        labelClass="text-[#A2A5AD]"
      />
      <MySlider
        label="How did you eat and drink?"
        onChange={(e) =>
          setDiary((prev) => ({
            ...prev,
            eatAndDrink: generateRateByNumber(e),
          }))
        }
        isAdjective
        step={25}
        value={generateRateByString(diary.eatAndDrink)}
        labelClass="text-[#A2A5AD]"
      />
    </div>
  )
}
