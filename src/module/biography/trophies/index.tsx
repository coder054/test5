import React from 'react'
import { MyButton } from 'src/components/MyButton'
import { BackGround } from 'src/module/account-settings/common-components/Background'

export const Trophies = () => {
  return (
    <div className="space-y-5">
      <BackGround
        label="Trophies & Awards"
        className="2xl:w-3/5"
        contentClass="xl:w-[600px]"
      >
        <div className="space-y-7">
          <p className="text-white bg-[#13161A] laptopM:py-[10px] laptopM:pl-[10px] laptopM:pr-[20px] mobileM:p-[10px] rounded-[8px]">
            Add your Personal Awards and Team Trophies to your Biography
          </p>
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
