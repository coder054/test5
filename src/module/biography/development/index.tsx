import React, { useState } from 'react'
import { MyButton } from 'src/components/MyButton'
import { MyDatePicker } from 'src/components/MyDatePicker'
import { MySlider } from 'src/components/MySlider'
import { MyTextArea } from 'src/components/MyTextarea'
import { BackGround } from 'src/module/account-settings/common-components/Background'

export const Development = () => {
  const [progress, setProgress] = useState<number>(25)
  return (
    <div className="space-y-5">
      <BackGround
        label="Development note"
        className="2xl:w-3/5"
        contentClass="xl:w-[600px]"
      >
        <div className="space-y-12">
          <MyDatePicker label="Date" />
          <MySlider
            marks
            label="How is your development progress?"
            onChange={(e) => setProgress(e)}
            isAdjective
            step={25}
            value={progress}
            labelClass="text-[#A2A5AD]"
          />
          <MyTextArea placeholder="1. My strengths are..." />
          <MyTextArea placeholder="2. My weaknesses are..." />
          <MyTextArea placeholder="3. My best developed skill lately are..." />
          <MyTextArea placeholder="4. The skill i need to develop are..." />
          <MyTextArea placeholder="5. The best way to develop those..." />
          <MyTextArea placeholder="6. My short term goal are.." />
          <MyTextArea placeholder="7. My long term goal are..." />
          <MyTextArea placeholder="8. My other comment are..." />
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
