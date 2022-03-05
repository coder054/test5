import { GoBack } from 'src/components/go-back'
import { ROUTES } from 'src/constants/constants'
import { InforWithAChart } from 'src/module/bio/InfoWithAChart'
import { InfoWithCircleImage } from 'src/module/bio/InfoWithCircleImage'
import { IBiographyPlayer } from 'src/pages/biography/[username]/[fullname]'
import useSWR from 'swr'
const cls = require('./signup-form-biography.module.css')

export const SignupFormBiography = () => {
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
          <InfoWithCircleImage dataBio={dataBio} currentRoleId="" signupForm />
        </div>
        <div
          className={`${cls.formInfor} rounded-[8px] w-[568px] p-[24px] z-30 `}
        >
          <InforWithAChart
            dataBio={dataBio}
            dataBioRadarChart={{}}
            signupForm
          />
        </div>
      </div>
    </div>
  )
}
