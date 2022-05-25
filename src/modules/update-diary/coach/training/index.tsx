import { TextField } from '@mui/material'
import { useAtom } from 'jotai'
import { debounce } from 'lodash'
import {
  ChangeEvent,
  default as React,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { COACH_DIARY_ATOM } from 'src/atoms/diaryAtoms'
import { MyInputChips } from 'src/components'
import { MySlider } from 'src/components/MySlider'
import { ParticipateType, TrainingType } from 'src/constants/types/diary.types'
import {
  emotionToNum,
  numToEmotion,
  numToScale,
  scaleToNum,
} from 'src/hooks/functionCommon'

export const INITIAL_TRAINING_VALUES = {
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

interface TrainingProps {
  onChange: (value: ParticipateType) => void
  isHasError: (value: string) => void
  currentTab: string
}

export default function Training({
  isHasError,
  currentTab,
  onChange,
}: TrainingProps) {
  const [participate] = useAtom(COACH_DIARY_ATOM)
  const [formValues, setFormValues] = useState<TrainingType>(
    INITIAL_TRAINING_VALUES
  )

  const limitSilder = (e: number, type: keyof TrainingType) => {
    const { tactics, physics, mental, technics } = formValues
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
      typeOfTraining: currentTab,
    }))
  }

  const IS_FULLFILL = useMemo(() => {
    return (
      formValues?.mental +
        formValues?.physics +
        formValues?.tactics +
        formValues?.technics ===
      100
    )
  }, [formValues])

  useEffect(() => {
    ;(participate?.isParticipate || participate?.isPeriod) &&
      setFormValues(participate?.training)
    if (!participate) {
      setFormValues(INITIAL_TRAINING_VALUES)
    }
  }, [JSON.stringify(participate), currentTab])

  useEffect(() => {
    !IS_FULLFILL
      ? isHasError(
          'The combination of technics, tactics, physics and mental must be 100%'
        )
      : isHasError(undefined)
  }, [IS_FULLFILL])

  useEffect(() => {
    onChange && onChange({ ...participate, training: formValues })
  }, [JSON.stringify(formValues)])

  return (
    <div className="mobileM:space-y-3 tabletM:space-y-4">
      <MySlider
        label="Hours of Practice"
        onChange={(e) => handleChange('hoursOfPractice', e)}
        isPoint
        unit="h"
        step={0.5}
        max={4}
        value={formValues?.hoursOfPractice}
        labelClass="text-[#A2A5AD]"
      />
      <MySlider
        label="Technics"
        unit="%"
        onChange={(e) => limitSilder(e, 'technics')}
        isPoint
        step={10}
        value={formValues?.technics}
        labelClass="text-[#A2A5AD]"
      />
      <MySlider
        label="Tactics"
        onChange={(e) => limitSilder(e, 'tactics')}
        isPoint
        unit="%"
        step={10}
        value={formValues?.tactics}
        labelClass="text-[#A2A5AD]"
      />
      <MySlider
        label="Physics"
        onChange={(e) => limitSilder(e, 'physics')}
        isPoint
        unit="%"
        step={10}
        value={formValues?.physics}
        labelClass="text-[#A2A5AD]"
      />
      <MySlider
        label="Mental"
        onChange={(e) => limitSilder(e, 'mental')}
        isPoint
        unit="%"
        step={10}
        value={formValues?.mental}
        labelClass="text-[#A2A5AD]"
      />
      <MyInputChips
        label="Practice tags"
        labelClass="text-[#A2A5AD]"
        value={formValues?.practiceTags}
        setTags={(e: string[]) => handleChange('practiceTags', e)}
      />
      <p className="text-[18px] pt-6 font-normal">Your training review</p>
      <div className="space-y-9">
        <MySlider
          label="How physically strain, was it?"
          onChange={(e) => handleChange('physicallyStrain', numToScale(e))}
          value={scaleToNum(formValues?.physicallyStrain)}
          isScale
          step={25}
          labelClass="text-[#A2A5AD]"
        />
        <MySlider
          label="How was your training performance?"
          onChange={(e) => handleChange('yourPerformance', numToEmotion(e))}
          isAdjective
          step={25}
          value={emotionToNum(formValues?.yourPerformance)}
          labelClass="text-[#A2A5AD]"
        />
        <TextField
          rows={4}
          multiline
          fullWidth
          name="trainingReview"
          value={formValues?.trainingReview}
          placeholder="Your Teams game review (Describe what you’re team did well and what you’re team could have done better)"
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            handleChange('trainingReview', event.target.value)
          }
        />
        <MySlider
          label="How was your Teams performance?"
          onChange={(e) => handleChange('teamPerformance', numToEmotion(e))}
          isScale
          step={25}
          value={emotionToNum(formValues?.teamPerformance)}
          labelClass="text-[#A2A5AD]"
        />
        <TextField
          rows={4}
          multiline
          fullWidth
          name="teamReview"
          value={formValues?.teamReview}
          placeholder="Your game review (Describe what you did well and what you could have done better)"
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            handleChange('teamReview', event.target.value)
          }
        />
      </div>
    </div>
  )
}
