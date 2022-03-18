import React from 'react'
import { MyInput } from 'src/components'
import { MyButton } from 'src/components/MyButton'
import { MyCustomSelect } from 'src/components/MyCustomSelect'
import { MyDatePicker } from 'src/components/MyDatePicker'
import { MySelect } from 'src/components/MySelect'
import { MyTextArea } from 'src/components/MyTextarea'
import { SvgCamera } from 'src/imports/svgs'
import { BackGround } from 'src/module/account-settings/common-components/Background'

export const Trophies = () => {
  const handleChangeForm = () => {}

  return (
    <div className="space-y-5">
      <BackGround
        label="Trophies & Awards"
        className="2xl:w-3/5"
        contentClass="xl:w-[754px]"
      >
        <div className="space-y-7">
          <p className="text-white bg-[#13161A] laptopM:py-[10px] laptopM:pl-[10px] laptopM:pr-[20px] mobileM:p-[10px] rounded-[8px]">
            Add your Personal Awards and Team Trophies to your Biography
          </p>

          <MySelect
            label="Personal Award"
            arrOption={[]}
            onChange={(e) => handleChangeForm()}
          />

          <MySelect
            label="Type of award"
            arrOption={[]}
            onChange={(e) => handleChangeForm()}
          />

          <MyInput label="Name" onChange={(e) => handleChangeForm()} />

          <MySelect
            label="Country"
            arrOption={[]}
            onChange={(e) => handleChangeForm()}
          />

          <MySelect
            label="Club"
            arrOption={[]}
            onChange={(e) => handleChangeForm()}
          />

          <MyDatePicker
            label="Date"
            onChange={(e) => handleChangeForm()}
            // val={formValues.date}
          />

          <MyTextArea
            placeholder="Description"
            onChange={(e) => handleChangeForm()}
            // value={formValues.strengths}
          />
          <SvgCamera />
        </div>
      </BackGround>
      <MyButton
        // onClick={handleSubmit}
        // isLoading={isLoading}
        type="submit"
        label="Save"
      />
    </div>
  )
}
