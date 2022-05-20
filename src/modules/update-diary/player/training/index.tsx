import { useAtom } from 'jotai'
import React, {
  ChangeEvent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { diaryAtom } from 'src/atoms/diaryAtoms'
import { MyInputChips } from 'src/components'
import { MySlider } from 'src/components/MySlider'
import { MyTextArea } from 'src/components/MyTextarea'
import {
  emotionToNum,
  numToEmotion,
  numToScale,
  scaleToNum,
} from 'src/hooks/functionCommon'

type FormValuesType = Partial<{
  hoursOfPractice: number
  mental: number
  physicallyStrain: string
  physics: number
  practiceTags: string[]
  tactics: number
  technics: number
  trainingMedia: { url: string; type: string }[]
  typeOfTraining: string | string[]
  yourPerformance: string
  teamReview: string
  teamPerformance: string
  trainingReview: string
}>

type TrainingProps = {
  currentTab: string
  onChange?: (value: FormValuesType) => void
  error: (err: string) => void
}

const INITITAL_VALUE = {
  hoursOfPractice: 0,
  mental: 0,
  physicallyStrain: 'NORMAL',
  physics: 0,
  practiceTags: [],
  tactics: 0,
  technics: 0,
  trainingMedia: [],
  yourPerformance: 'NORMAL',
  teamPerformance: 'NORMAL',
  teamReview: '',
  trainingReview: '',
}

export const Training = ({ currentTab, onChange, error }: TrainingProps) => {
  const [diary] = useAtom(diaryAtom)
  const [formValues, setFormValues] = useState<FormValuesType>({
    ...INITITAL_VALUE,
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
    diary?.training
      ? setFormValues(diary.training)
      : setFormValues({
          ...INITITAL_VALUE,
          typeOfTraining: currentTab,
        })
  }, [JSON.stringify(diary?.training)])

  const isFullfill = useMemo(() => {
    return (
      formValues.mental +
        formValues.physics +
        formValues.tactics +
        formValues.technics ===
      100
    )
  }, [formValues])

  useEffect(() => {
    onChange &&
      onChange({
        ...formValues,
      })
    !isFullfill
      ? error(
          'The combination of technics, tactics, physics and mental must be 100%'
        )
      : error('')
  }, [JSON.stringify(formValues)])

  return (
    <div className="mobileM:space-y-3 tabletM:space-y-4">
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
        setTags={(e: string[]) =>
          setFormValues((prev) => ({ ...prev, practiceTags: e }))
        }
      />
      <p className="text-[18px] pt-6 font-normal">Your training review</p>
      <div className="space-y-9">
        <MySlider
          label="How physically strain, was it?"
          onChange={(e) =>
            setFormValues((prev) => ({
              ...prev,
              physicallyStrain: numToScale(e),
            }))
          }
          value={scaleToNum(formValues.physicallyStrain)}
          isScale
          step={25}
          labelClass="text-[#A2A5AD]"
        />
        <MySlider
          label="How was your training performance?"
          onChange={(e) =>
            setFormValues((prev) => ({
              ...prev,
              yourPerformance: numToEmotion(e),
            }))
          }
          isAdjective
          step={25}
          value={emotionToNum(formValues.yourPerformance)}
          labelClass="text-[#A2A5AD]"
        />
        <MyTextArea
          label="Your training review"
          value={formValues.trainingReview}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setFormValues((prev) => ({
              ...prev,
              trainingReview: e.target.value,
            }))
          }
          placeholder="Your Teams game review (Describe what you’re team did well and what you’re team could have done better)"
        />
        <MySlider
          label="How was your Teams performance?"
          onChange={(e) =>
            setFormValues((prev) => ({
              ...prev,
              teamPerformance: numToEmotion(e),
            }))
          }
          isScale
          step={25}
          value={emotionToNum(formValues.teamPerformance)}
          labelClass="text-[#A2A5AD]"
        />
        <MyTextArea
          label="Your Teams training review"
          value={formValues.teamReview}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setFormValues((prev) => ({
              ...prev,
              teamReview: e.target.value,
            }))
          }
          placeholder="Your game review (Describe what you did well and what you could have done better)"
        />
      </div>
    </div>
  )
}
