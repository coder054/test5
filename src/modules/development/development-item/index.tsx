import dayjs from 'dayjs'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { MyButton } from 'src/components/MyButton'
import { MyDatePicker } from 'src/components/MyDatePicker'
import { MySlider } from 'src/components/MySlider'
import { MyTextArea } from 'src/components/MyTextarea'
import {
  DevelopmentNoteType,
  PlayerCreateDevelopmentNoteType,
} from 'src/constants/types'
import { getStartOfDate, getToday } from 'src/hooks/functionCommon'
import { playerCreateDevelopmentNote } from 'src/service/dashboard/biography-update'
import { BackGround } from 'src/modules/account-settings/common-components/Background'

interface DevelopmentProps {
  playerId?: string
  currentRoleName?: string
}
interface FormValuesType {
  date?: any
  progress?: string
  strengths?: string
  weaknesses?: string
  developedSkill?: string
  skills?: string
  way?: string
  shortTerm?: string
  longTerm?: string
  comment?: string
}

export const Development = ({
  playerId,
  currentRoleName,
}: DevelopmentProps) => {
  const [loading, setLoading] = useState<boolean>(false)
  const [formValues, setFormValues] = useState<FormValuesType>({
    date: getToday(),
    progress: '50',
    strengths: '',
    weaknesses: '',
    developedSkill: '',
    skills: '',
    way: '',
    shortTerm: '',
    longTerm: '',
    comment: '',
  })

  const [notes, setNote] = useState<DevelopmentNoteType>({})
  const [devTalkId, setDevTalkId] = useState<string>('')

  const handleChangeForm = (type: keyof FormValuesType, value) => {
    setFormValues((prev) => ({ ...prev, [type]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    if (
      !formValues.strengths &&
      !formValues.weaknesses &&
      !formValues.developedSkill &&
      !formValues.skills &&
      !formValues.way &&
      !formValues.shortTerm &&
      !formValues.longTerm &&
      !formValues.comment
    ) {
      toast.error('You need fill at least 1 field!')
      setTimeout(() => {
        setLoading(false)
      }, 1000)
      return
    }

    let developmentProgress = ''
    if (+formValues.progress === 0) {
      developmentProgress = 'VERY_BAD'
    } else if (+formValues.progress === 25) {
      developmentProgress = 'BAD'
    } else if (+formValues.progress === 50) {
      developmentProgress = 'NORMAL'
    } else if (+formValues.progress === 75) {
      developmentProgress = 'GOOD'
    } else if (+formValues.progress === 100) {
      developmentProgress = 'VERY_GOOD'
    }

    const valuesUpdate: PlayerCreateDevelopmentNoteType = {
      playerDevelopmentProgress: developmentProgress,
      strength: {
        playerContent: formValues.strengths,
        coachComment: '',
      },
      weaknesses: {
        playerContent: formValues.weaknesses,
        coachComment: '',
      },
      bestDevelopSkills: {
        playerContent: formValues.developedSkill,
        coachComment: '',
      },
      skillsNeededToDevelop: {
        playerContent: formValues.skills,
        coachComment: '',
      },
      bestWayToDevelop: {
        playerContent: formValues.way,
        coachComment: '',
      },
      shortTermGoal: {
        playerContent: formValues.shortTerm,
        coachComment: '',
      },
      longTermGoal: {
        playerContent: formValues.longTerm,
        coachComment: '',
      },
      otherComments: {
        playerContent: formValues.comment,
        coachComment: '',
      },
      playerNotedAt: getStartOfDate(formValues.date),
    }

    try {
      await playerCreateDevelopmentNote(valuesUpdate).then((data) => {
        if (data.status === 201) {
          setLoading(false)
          toast.success('create successfully!')
          window.scroll(0, 0)
        } else {
          toast.error('create failed!')
          window.scroll(0, 0)
        }
      })
    } catch (error) {
      if (error.response.status === 405) {
        toast.error('You created development for this day!')
      }
    }
    setTimeout(() => {
      setLoading(false)
    }, 1000)
  }

  return (
    <div className="space-y-5">
      <BackGround
        label="Development note2"
        className="2xl:w-3/5"
        contentClass="xl:w-[600px]"
      >
        <div className="space-y-12">
          <MyDatePicker
            label="Date"
            onChange={(e) => handleChangeForm('date', e)}
            value={formValues.date}
            maxDate={dayjs(getToday()).toDate()}
          />
          <MySlider
            marks
            label="How is your development progress?"
            onChange={(e) => handleChangeForm('progress', e)}
            isAdjective
            step={25}
            value={+formValues.progress}
            labelClass="text-[#A2A5AD]"
          />
          <MyTextArea
            placeholder="1. My strengths are..."
            onChange={(e) => handleChangeForm('strengths', e.target.value)}
            value={formValues.strengths}
          />
          <MyTextArea
            placeholder="2. My weaknesses are..."
            onChange={(e) => handleChangeForm('weaknesses', e.target.value)}
            value={formValues.weaknesses}
          />
          <MyTextArea
            placeholder="3. My best developed skill lately are..."
            onChange={(e) => handleChangeForm('developedSkill', e.target.value)}
            value={formValues.developedSkill}
          />
          <MyTextArea
            placeholder="4. The skill i need to develop are..."
            onChange={(e) => handleChangeForm('skills', e.target.value)}
            value={formValues.skills}
          />
          <MyTextArea
            placeholder="5. The best way to develop those..."
            onChange={(e) => handleChangeForm('way', e.target.value)}
            value={formValues.way}
          />
          <MyTextArea
            placeholder="6. My short term goal are.."
            onChange={(e) => handleChangeForm('shortTerm', e.target.value)}
            value={formValues.shortTerm}
          />
          <MyTextArea
            placeholder="7. My long term goal are..."
            onChange={(e) => handleChangeForm('longTerm', e.target.value)}
            value={formValues.longTerm}
          />
          <MyTextArea
            placeholder="8. My other comment are..."
            onChange={(e) => handleChangeForm('comment', e.target.value)}
            value={formValues.comment}
          />
        </div>
      </BackGround>
      <MyButton
        onClick={handleSubmit}
        isLoading={loading}
        type="submit"
        label="Save"
        className="mt-[24px] mb-[181px]"
      />
    </div>
  )
}
