import dayjs from 'dayjs'
import React, { useEffect, useState } from 'react'
import { MyInput } from 'src/components'
import { MyButton } from 'src/components/MyButton'
import { MyDatePicker } from 'src/components/MyDatePicker'
import { MySelect } from 'src/components/MySelect'
import { MySlider } from 'src/components/MySlider'
import { MyTextArea } from 'src/components/MyTextarea'
import { DevelopmentNoteType } from 'src/constants/types'
import { SvgCamera, SvgVideo } from 'src/imports/svgs'
import { BackGround } from 'src/module/account-settings/common-components/Background'
import { getListDevelopmentNotes } from 'src/service/biography-update'

interface DevelopmentProps {
  playerId?: string
}
interface FormValuesType {
  season?: string
  fromDate?: string
  toDate?: string
  country?: string
  league?: string
  club?: string
  team?: string
  role?: string
  serie?: number
  cup?: number
  friend?: number
  won?: number
  lost?: number
  draw?: number
  madeTeam?: number
  letInTeamGoal?: number
  yourGoals?: number
  yourAssist?: number
  yourYellowCard?: number
  yourRedCard?: number
  yourEstimated?: number
  summary?: string
}

const tagsClass =
  'text-white bg-[#13161A] laptopM:py-[10px] laptopM:pl-[10px] laptopM:pr-[20px] mobileM:p-[10px] rounded-[8px]'

export const Historic = ({ playerId }: DevelopmentProps) => {
  const [formValues, setFormValues] = useState({})

  const handleChangeForm = (type: keyof FormValuesType, value) => {
    setFormValues((prev) => ({ ...prev, [type]: value }))
  }

  const handleChangeImage = (type: 'image' | 'video', value: string) => {}

  const handleSubmit = () => {
    console.log('formValues', formValues)
  }

  return (
    <div className="space-y-5">
      <BackGround
        label="Historic Career Data"
        className="2xl:w-3/5"
        contentClass="xl:w-[600px]"
      >
        <div className="space-y-7">
          <MySelect
            label="Season"
            onChange={(e) => handleChangeForm('season', e.target.value)}
            arrOption={[]}
          />

          <div className="flex w-full">
            <div className="flex-1 mr-[10px]">
              <MyDatePicker
                label="From"
                onChange={(e) => handleChangeForm('fromDate', e)}
              />
            </div>
            <div className="flex-1 ml-[10px]">
              <MyDatePicker
                label="From"
                onChange={(e) => handleChangeForm('fromDate', e)}
              />
            </div>
          </div>

          <MySelect
            label="Country"
            onChange={(e) => handleChangeForm('country', e.target.value)}
            arrOption={[]}
          />

          <MySelect
            label="League"
            onChange={(e) => handleChangeForm('league', e.target.value)}
            arrOption={[]}
          />

          <MySelect
            label="Club"
            onChange={(e) => handleChangeForm('season', e.target.value)}
            arrOption={[]}
          />

          <MySelect
            label="Team"
            onChange={(e) => handleChangeForm('season', e.target.value)}
            arrOption={[]}
          />

          <MySelect
            label="Role"
            onChange={(e) => handleChangeForm('season', e.target.value)}
            arrOption={[]}
          />

          <MyInput label="Serie matches" />
          <MyInput label="Cup matches" />
          <MyInput label="Friendly matches" />
          <MyInput label="Won matches" />
          <MyInput label="Lost matches" />
          <MyInput label="Draw matches" />
          <MyInput label="Made Team Goals" />
          <MyInput label="Let in Team Goals" />
          <MyInput label="Your Goals" />
          <MyInput label="Your assist" />
          <MyInput label="Your Yellow Card" />
          <MyInput label="Your Red Card" />
          <MyInput label="Your Estimated Play Time" />
          <MyTextArea
            placeholder="Write a short summary of your time at this Club"
            onChange={(e) => handleChangeForm('summary', e.target.value)}
            // value={formValues.strengths}
          />
          <div className="w-full">
            <div className="float-left cursor-pointer w-[17px] h-[17px]">
              <SvgCamera />
              <input
                type={'file'}
                accept="image/png, image/gif, image/jpeg"
                multiple
                className=""
                onChange={(e) => handleChangeImage('image', e.target.value)}
              />
            </div>
            <div className="float-left ml-[31px] cursor-pointer">
              <SvgVideo />
              <input
                type={'file'}
                accept="image/png, image/gif, image/jpeg"
                multiple
                className=""
                onChange={(e) => handleChangeImage('video', e.target.value)}
              />
            </div>
          </div>
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
