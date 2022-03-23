import { useAtom } from 'jotai'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { diaryAtom } from 'src/atoms/diaryAtoms'
import { MyInputChips } from 'src/components'
import { MySlider } from 'src/components/MySlider'
import {
  generateRateByNumber,
  generateRateByString,
} from 'src/hooks/functionCommon'

type FormValuesType = {
  hoursOfPractice: number
  mental: number
  physicallyStrain: string
  physics: number
  practiceTags: string[]
  tactics: number
  technics: number
  trainingMedia: { url: string; type: string }[]
  typeOfTraining: string | string[]
}

type TrainingProps = {
  currentTab: string
}

export const Training = ({ currentTab }: TrainingProps) => {
  const [diary] = useAtom(diaryAtom)

  const [formValues, setFormValues] = useState<FormValuesType>({
    hoursOfPractice: 0,
    mental: 0,
    physicallyStrain: 'NORMAL',
    physics: 0,
    practiceTags: [],
    tactics: 0,
    technics: 0,
    trainingMedia: [],
    typeOfTraining: currentTab,
  })

  const limitSilder = useCallback(
    (e: number, type: keyof FormValuesType) => {
      switch (type) {
        case 'technics':
          if (
            e + formValues.tactics + formValues.physics + formValues.mental <=
            100
          ) {
            setFormValues((prev) => ({ ...prev, technics: e }))
          }
          return
        case 'tactics':
          if (
            e + formValues.technics + formValues.physics + formValues.mental <=
            100
          ) {
            setFormValues((prev) => ({ ...prev, tactics: e }))
          }
          return
        case 'physics':
          if (
            e + formValues.tactics + formValues.technics + formValues.mental <=
            100
          ) {
            setFormValues((prev) => ({ ...prev, physics: e }))
          }
          return
        case 'mental':
          if (
            e + formValues.tactics + formValues.physics + formValues.technics <=
            100
          ) {
            setFormValues((prev) => ({ ...prev, mental: e }))
          }
          return
      }
    },
    [
      JSON.stringify(formValues.tactics),
      JSON.stringify(formValues.physics),
      JSON.stringify(formValues.mental),
      JSON.stringify(formValues.technics),
    ]
  )

  useEffect(() => {
    diary.training && setFormValues(diary.training)
    if (!diary.createdAt) {
      setFormValues({
        hoursOfPractice: 0,
        mental: 0,
        physicallyStrain: 'NORMAL',
        physics: 0,
        practiceTags: [],
        tactics: 0,
        technics: 0,
        trainingMedia: [],
        typeOfTraining: currentTab,
      })
    }
  }, [JSON.stringify(diary)])

  return (
    <div className="space-y-4">
      <MySlider
        label="How physically strain, was it?"
        onChange={(e) =>
          setFormValues((prev) => ({
            ...prev,
            physicallyStrain: generateRateByNumber(e),
          }))
        }
        value={generateRateByString(formValues.physicallyStrain)}
        isScale
        step={25}
        labelClass="text-[#A2A5AD]"
      />
      <MySlider
        label="Hours of Practice"
        onChange={(e) =>
          setFormValues((prev) => ({ ...prev, hoursOfPractice: e }))
        }
        isPoint
        unit="h"
        step={0.5}
        max={4}
        value={formValues.hoursOfPractice}
        labelClass="text-[#A2A5AD]"
      />
      <MySlider
        label="Technics"
        unit="%"
        onChange={(e) => limitSilder(e, 'technics')}
        isPoint
        step={10}
        value={formValues.technics}
        labelClass="text-[#A2A5AD]"
      />
      <MySlider
        label="Tactics"
        onChange={(e) => limitSilder(e, 'tactics')}
        isPoint
        unit="%"
        step={10}
        value={formValues.tactics}
        labelClass="text-[#A2A5AD]"
      />
      <MySlider
        label="Physics"
        onChange={(e) => limitSilder(e, 'physics')}
        isPoint
        unit="%"
        step={10}
        value={formValues.physics}
        labelClass="text-[#A2A5AD]"
      />
      <MySlider
        label="Mental"
        onChange={(e) => limitSilder(e, 'mental')}
        isPoint
        unit="%"
        step={10}
        value={formValues.mental}
        labelClass="text-[#A2A5AD]"
      />
      <MyInputChips
        label="Practice tags"
        labelClass="text-[#A2A5AD]"
        value={formValues.practiceTags}
        setTags={(e) => setFormValues((prev) => ({ ...prev, practiceTags: e }))}
      />
    </div>
  )
}
