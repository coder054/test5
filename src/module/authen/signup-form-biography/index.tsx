import { useAtom } from 'jotai'
import { useState } from 'react'
import { profileAtom } from 'src/atoms/profileAtom'
import { GoBack } from 'src/components/go-back'
import { ROUTES } from 'src/constants/constants'
import { InforWithAChart } from 'src/module/bio/InfoWithAChart'
import { InfoWithCircleImage } from 'src/module/bio/InfoWithCircleImage'
import { IBiographyPlayer } from 'src/pages/biography/[username]/[fullname]'
import useSWR from 'swr'
import { useAuth } from '../auth/AuthContext'
const cls = require('./signup-form-biography.module.css')

export const SignupFormBiography = () => {
  const [profileForm, setProfileForm] = useAtom(profileAtom)
  const { currentRoleId } = useAuth()
  const [dataBioPlayer, setDataBioPlayer] = useState<IBiographyPlayer>({
    userId: currentRoleId,
    username: `${profileForm.profile.firstName} ${profileForm.profile.lastName}`,
    firstName: profileForm.profile.firstName,
    lastName: profileForm.profile.lastName,
    faceImageUrl: profileForm.media.faceImage,
    bodyImageUrl: profileForm.media.bodyImage,
    contractedUntil: profileForm.playerCareer.contractedUntil,
    leftFoot: profileForm.health.leftFootLength,
    rightFoot: profileForm.health.rightFootLength,
    height: profileForm.health.height.value,
    weight: profileForm.health.weight.value,
    birthDay: profileForm.profile.birthDay,
    summary: profileForm.playerCareer.summary,
    playerRadarSkills: {
      defending: profileForm.playerSkills.radar.defending,
      tackling: profileForm.playerSkills.radar.tackling,
      passing: profileForm.playerSkills.radar.passing,
      dribbling: profileForm.playerSkills.radar.dribbling,
      attacking: profileForm.playerSkills.radar.attacking,
      pace: profileForm.playerSkills.radar.pace,
      heading: profileForm.playerSkills.radar.heading,
      shooting: profileForm.playerSkills.radar.shooting,
    },
    specialities: profileForm.playerSkills.specialityTags,
  })

  const { data: dataBio, error: errorBio } = useSWR(
    `/biographies/player?username=maiJ070101`
  ) as {
    data: IBiographyPlayer
    error: any
  }
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
          <InfoWithCircleImage
            dataBio={dataBioPlayer}
            currentRoleId=""
            signupForm
          />
        </div>
        <div
          className={`${cls.formInfor} rounded-[8px] w-[568px] p-[24px] z-30 `}
        >
          <InforWithAChart
            dataBio={dataBioPlayer}
            dataBioRadarChart={{}}
            signupForm
          />
        </div>
      </div>
    </div>
  )
}
