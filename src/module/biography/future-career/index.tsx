import { TextField } from '@mui/material'
import _ from 'lodash'
import React, { useCallback, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { MyButton } from 'src/components/MyButton'
import { MyDatePicker } from 'src/components/MyDatePicker'
import { MyInputChips } from 'src/components/MyInputChips'
import { MySelect } from 'src/components/MySelect'
import { MySlider } from 'src/components/MySlider'
import { MyTextArea } from 'src/components/MyTextarea'
import { UpdateSkills } from 'src/constants/types'
import { BackGround } from 'src/module/account-settings/common-components/Background'
import { InfiniteScrollClub } from 'src/module/account-settings/football/components/InfiniteScrollClub'
import { InfiniteScrollTeam } from 'src/module/account-settings/football/components/InfiniteScrollTeam'
import {
  coachUpdatePlayerSkills,
  getPlayerRadar,
} from 'src/service/biography-update'
import { axios } from 'src/utils/axios'
import { useAuth } from '../../authen/auth/AuthContext'

interface FutureCareerProps {
  playerId?: string
}

const tagsClass =
  'text-white bg-[#13161A] laptopM:py-[10px] laptopM:pl-[10px] laptopM:pr-[20px] mobileM:p-[10px] rounded-[8px]'

export const FutureCareer = ({ playerId }: FutureCareerProps) => {
  const { userRoles, currentRoleId } = useAuth()
  const [loading, setLoading] = useState<boolean>(false)

  const handleChangeForm = () => {}

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
  }

  return (
    <div className="space-y-5">
      <BackGround
        label="Future Career"
        className="2xl:w-3/5"
        contentClass="xl:w-[600px]"
      >
        <div className="space-y-12 ">
          <div className="space-y-7">
            <div className="flex">
              <div className="flex-1 mr-[10px]">
                <MyDatePicker label="From" />
              </div>
              <div className="flex-1 ml-[10px]">
                <MyDatePicker label="To" />
              </div>
            </div>

            <MySelect
              label="Country"
              arrOption={[]}
              onChange={() => handleChangeForm()}
            />

            <MySelect
              label="League"
              arrOption={[]}
              onChange={() => handleChangeForm()}
            />

            {/* <InfiniteScrollClub /> */}

            {/* <InfiniteScrollTeam /> */}

            <MySelect
              label="Role"
              arrOption={[]}
              onChange={() => handleChangeForm()}
            />

            <MyTextArea
              placeholder="Write a short summary of your time at this Club"
              onChange={(e) => handleChangeForm()}
              // value={formValues.strengths}
            />
          </div>
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
