import { useAtom } from 'jotai'
import { useState, useEffect } from 'react'
import { profileAtom } from 'src/atoms/profileAtom'
import { GoBack } from 'src/components/go-back'
import { API_GET_BIOGRAPHY_PLAYER } from 'src/constants/api.constants'
import { ROUTES } from 'src/constants/constants'
import { InforWithAChart } from 'src/module/bio/InfoWithAChart'
import { InfoWithCircleImage } from 'src/module/bio/InfoWithCircleImage'
import { IBiographyPlayer } from 'src/pages/biography/[username]/[fullname]'
import { axios } from 'src/utils/axios'
import useSWR from 'swr'
import { useAuth } from '../auth/AuthContext'
const cls = require('./signup-form-biography.module.css')

export const SignupFormBiography = () => {
  // const [dataPlayer, setDataPlayer] = useState<IBiographyPlayer>({})
  const { currentRoleId, playerProfile, coachProfile, currentUser } = useAuth()

  // useEffect(() => {
  //   const getBioPlayer = async () => {
  //     const response = await axios.get(
  //       `/biographies/player?userIdQuery=${playerProfile.userId}`
  //     )
  //     console.log('res', response)
  //   }

  //   getBioPlayer()
  // }, [])

  // console.log('dataPlayer', dataPlayer)

  return (
    <div className="autofill2 w-screen min-h-screen float-left lg:flex md:items-center">
      <div className="absolute top-[16px] lg:top-[40px] md:left-[40px] z-20">
        <GoBack
          label="Sign up form"
          goBack={ROUTES.SIGNUP_FORM_PLAYER_SKILLS}
        />
      </div>

      <div className="w-2/3 h-full mx-auto grid grid-cols-2 -mt-[48px]">
        <div
          className={`${cls.formInfor} rounded-[8px] w-[568px] p-[24px] z-30 max-h-[626px]`}
        >
          {/* <InfoWithCircleImage
            dataBio={dataPlayer}
            currentRoleId={currentRoleId}
            signupForm
          /> */}
        </div>
        <div
          className={`${cls.formInfor} rounded-[8px] w-[568px] p-[24px] z-30 `}
        >
          {/* <InforWithAChart
            dataBio={dataPlayer}
            dataBioRadarChart={{}}
            signupForm
          /> */}
        </div>
      </div>
    </div>
  )
}
