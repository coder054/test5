import React, { useEffect, useState } from 'react'
import { MyInput } from 'src/components'
import { ListImageVideo } from 'src/components/list-image-video'
import { MyButton } from 'src/components/MyButton'
import { MyDatePicker } from 'src/components/MyDatePicker'
import { MySelect } from 'src/components/MySelect'
import { MySlider } from 'src/components/MySlider'
import { MyTextArea } from 'src/components/MyTextarea'
import { UploadMutilImageVideo } from 'src/components/upload-mutil-image-video'
import { DevelopmentNoteType, ImageVideoType } from 'src/constants/types'
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
  const [arrayFile, setArrayFile] = useState([])

  const handleChangeForm = (type: keyof FormValuesType, value) => {
    setFormValues((prev) => ({ ...prev, [type]: value }))
  }

  // console.log('arrayFile', arrayFile)

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
        <div className="">
          <MySelect
            label="Season"
            onChange={(e) => handleChangeForm('season', e.target.value)}
            arrOption={[]}
          />

          <div className="flex w-full mt-7">
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
            className="mt-7"
          />

          <MySelect
            label="League"
            onChange={(e) => handleChangeForm('league', e.target.value)}
            arrOption={[]}
            className="mt-7"
          />

          <MySelect
            label="Club"
            onChange={(e) => handleChangeForm('season', e.target.value)}
            arrOption={[]}
            className="mt-7"
          />

          <MySelect
            label="Team"
            onChange={(e) => handleChangeForm('season', e.target.value)}
            arrOption={[]}
            className="mt-7"
          />

          <MySelect
            label="Role"
            onChange={(e) => handleChangeForm('season', e.target.value)}
            arrOption={[]}
            className="mt-7"
          />

          <MyInput label="Serie matches" className="mt-7" />
          <MyInput label="Cup matches" className="mt-7" />
          <MyInput label="Friendly matches" className="mt-7" />
          <MyInput label="Won matches" className="mt-7" />
          <MyInput label="Lost matches" className="mt-7" />
          <MyInput label="Draw matches" className="mt-7" />
          <MyInput label="Made Team Goals" className="mt-7" />
          <MyInput label="Let in Team Goals" className="mt-7" />
          <MyInput label="Your Goals" className="mt-7" />
          <MyInput label="Your assist" className="mt-7" />
          <MyInput label="Your Yellow Card" className="mt-7" />
          <MyInput label="Your Red Card" className="mt-7" />
          <MyInput label="Your Estimated Play Time" className="mt-7 mb-7" />
          <MyTextArea
            placeholder="Write a short summary of your time at this Club"
            onChange={(e) => handleChangeForm('summary', e.target.value)}
            // value={formValues.strengths}
          />
          <div className="w-full flex mb-[12.5px] mt-[11.75px]">
            <UploadMutilImageVideo
              image
              arrayFiles={arrayFile}
              setArrayFiles={setArrayFile}
            />
            <div className="ml-[31px]">
              <UploadMutilImageVideo
                arrayFiles={arrayFile}
                setArrayFiles={setArrayFile}
              />
            </div>
          </div>

          <ListImageVideo arrayFile={arrayFile} setArrayFile={setArrayFile} />
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
