import { useAtom } from 'jotai'
import {
  ChangeEvent,
  default as React,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { MyInputChips } from 'src/components'
import { MySlider } from 'src/components/MySlider'
import { MyTextArea } from 'src/components/MyTextarea'
import { TrainingType } from 'src/constants/types/diary.types'
import {
  emotionToNum,
  numToEmotion,
  numToScale,
  scaleToNum,
} from 'src/hooks/functionCommon'
import { COACH_DIARY_ATOM } from 'src/atoms/diaryAtoms'

const INITIAL_VALUES = {
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

export default function Training() {
  const [selectedParticipate, setSelectedParticipate] =
    useAtom(COACH_DIARY_ATOM)
  const [formValues, setFormValues] = useState<TrainingType>(INITIAL_VALUES)
  const {
    tactics,
    physics,
    mental,
    technics,
    hoursOfPractice,
    practiceTags,
    physicallyStrain,
    yourPerformance,
    trainingReview,
    teamPerformance,
    teamReview,
  } = formValues

  const limitSilder = (e: number, type: keyof TrainingType) => {
    switch (type) {
      case 'technics':
        if (e + tactics + physics + mental <= 100) {
          handleChange('technics', e)
        }
        return
      case 'tactics':
        if (e + technics + physics + mental <= 100) {
          handleChange('tactics', e)
        }
        return
      case 'physics':
        if (e + tactics + technics + mental <= 100) {
          handleChange('physics', e)
        }
        return
      case 'mental':
        if (e + tactics + physics + technics <= 100) {
          handleChange('mental', e)
        }
        return
    }
  }

  const handleChange = (
    type: keyof TrainingType,
    value: number | string | string[]
  ) => {
    setFormValues((prev) => ({
      ...prev,
      [type]: value,
    }))
    selectedParticipate &&
      /* @ts-ignore */
      setSelectedParticipate((prev) => ({
        ...prev,
        training: {
          ...prev.training,
          [type]: value,
        },
      }))
  }

  const IS_FULLFILL = useMemo(() => {
    return mental + physics + tactics + technics === 100
  }, [formValues])

  useEffect(() => {
    selectedParticipate?.training && setFormValues(selectedParticipate.training)
    if (!selectedParticipate) {
      setFormValues(INITIAL_VALUES)
    }
  }, [JSON.stringify(selectedParticipate?.originalDiaryId)])

  // useEffect(() => {
  //   onChange &&
  //     onChange({
  //       ...formValues,
  //     })
  //   !IS_FULLFILL
  //     ? error(
  //         'The combination of technics, tactics, physics and mental must be 100%'
  //       )
  //     : error('')
  // }, [JSON.stringify(formValues)])

  return (
    <div className="mobileM:space-y-3 tabletM:space-y-4">
      <MySlider
        label="Hours of Practice"
        onChange={(e) => handleChange('hoursOfPractice', e)}
        isPoint
        unit="h"
        step={0.5}
        max={4}
        value={hoursOfPractice}
        labelClass="text-[#A2A5AD]"
      />
      <MySlider
        label="Technics"
        unit="%"
        onChange={(e) => limitSilder(e, 'technics')}
        isPoint
        step={10}
        value={technics}
        labelClass="text-[#A2A5AD]"
      />
      <MySlider
        label="Tactics"
        onChange={(e) => limitSilder(e, 'tactics')}
        isPoint
        unit="%"
        step={10}
        value={tactics}
        labelClass="text-[#A2A5AD]"
      />
      <MySlider
        label="Physics"
        onChange={(e) => limitSilder(e, 'physics')}
        isPoint
        unit="%"
        step={10}
        value={physics}
        labelClass="text-[#A2A5AD]"
      />
      <MySlider
        label="Mental"
        onChange={(e) => limitSilder(e, 'mental')}
        isPoint
        unit="%"
        step={10}
        value={mental}
        labelClass="text-[#A2A5AD]"
      />
      <MyInputChips
        label="Practice tags"
        labelClass="text-[#A2A5AD]"
        value={practiceTags}
        setTags={(e: string[]) => handleChange('practiceTags', e)}
      />
      <p className="text-[18px] pt-6 font-normal">Your training review</p>
      <div className="space-y-9">
        <MySlider
          label="How physically strain, was it?"
          onChange={(e) => handleChange('physicallyStrain', numToScale(e))}
          value={scaleToNum(physicallyStrain)}
          isScale
          step={25}
          labelClass="text-[#A2A5AD]"
        />
        <MySlider
          label="How was your training performance?"
          onChange={(e) => handleChange('yourPerformance', numToEmotion(e))}
          isAdjective
          step={25}
          value={emotionToNum(yourPerformance)}
          labelClass="text-[#A2A5AD]"
        />
        <MyTextArea
          label="Your training review"
          value={trainingReview}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            handleChange('trainingReview', e.target.value)
          }
          placeholder="Your Teams game review (Describe what you’re team did well and what you’re team could have done better)"
        />
        <MySlider
          label="How was your Teams performance?"
          onChange={(e) => handleChange('teamPerformance', numToEmotion(e))}
          isScale
          step={25}
          value={emotionToNum(teamPerformance)}
          labelClass="text-[#A2A5AD]"
        />
        <MyTextArea
          label="Your Teams training review"
          value={teamReview}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            handleChange('teamReview', e.target.value)
          }
          placeholder="Your game review (Describe what you did well and what you could have done better)"
        />
      </div>
    </div>
  )
}
