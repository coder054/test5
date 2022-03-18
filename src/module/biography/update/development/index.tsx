import dayjs from 'dayjs'
import React, { useEffect, useState } from 'react'
import { MyButton } from 'src/components/MyButton'
import { MyDatePicker } from 'src/components/MyDatePicker'
import { MySlider } from 'src/components/MySlider'
import { MyTextArea } from 'src/components/MyTextarea'
import { DevelopmentNoteType } from 'src/constants/types'
import { BackGround } from 'src/module/account-settings/common-components/Background'
import { getListDevelopmentNotes } from 'src/service/biography-update'

interface DevelopmentProps {
  playerId?: string
}
interface FormValuesType {
  date?: string
  progress?: number
  strengths?: string
  weaknesses?: string
  developedSkill?: string
  skills?: string
  way?: string
  shortTerm?: string
  longTerm?: string
  comment?: string
}

export const Development = ({ playerId }: DevelopmentProps) => {
  const [formValues, setFormValues] = useState<FormValuesType>({
    date: '',
    progress: 0,
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

  useEffect(() => {
    const getList = async () => {
      await getListDevelopmentNotes().then((list) => {
        // console.log('list', list.data)

        list.data.map((item) => {
          if (playerId === item.playerId) {
            setNote(item)
          }
        })
      })
    }
    getList()
  }, [playerId])
  console.log('notes', notes)
  console.log('day', dayjs(notes.createdAt).format('YYYY-MM-DD'))

  const handleChangeForm = (type: keyof FormValuesType, value) => {
    setFormValues((prev) => ({ ...prev, [type]: value }))
  }

  const handleSubmit = () => {
    console.log('formValues', formValues)
  }

  console.log('playerId', playerId)

  return (
    <div className="space-y-5">
      <BackGround
        label="Development note"
        className="2xl:w-3/5"
        contentClass="xl:w-[600px]"
      >
        <div className="space-y-12">
          <MyDatePicker
            label="Date"
            onChange={(e) => handleChangeForm('date', e)}
            value={formValues.date}
          />
          <MySlider
            marks
            label="How is your development progress?"
            onChange={(e) => handleChangeForm('progress', e)}
            isAdjective
            step={25}
            value={formValues.progress}
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
        // isLoading={isLoading}
        type="submit"
        label="Save"
      />
    </div>
  )
}
