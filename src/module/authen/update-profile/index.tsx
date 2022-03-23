import { Button } from 'src/components'
import { MyInput } from 'src/components/MyInput'
import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { useAuth } from '../auth/AuthContext'
const cls = require('./update-profile.module.css')
import { GoBack } from 'src/components/go-back'
import { OptionUserProfile } from '../types'
import { MyDatePicker } from 'src/components/MyDatePicker'
import { ROUTES } from 'src/constants/constants'
import { LocationSearchInput } from 'src/components/location-search-input'
import { MySelectCountry } from 'src/components/MySelectCountry'
import { MyCustomSelect } from 'src/components/MyCustomSelect'
import { useAtom } from 'jotai'
import { profileAtom } from 'src/atoms/profileAtom'
import { profileCoachAtom } from 'src/atoms/profileCoachAtom'
import { CustomUploadImage } from 'src/components/custom-upload-image'
import { isMobile } from 'react-device-detect'
import clsx from 'clsx'

type FormValues = {
  firstName?: string
  lastName?: string
  birthDay?: string
  country?: any
  city?: string
  userProfile?: string
  faceImage?: string
  bodyImage?: string
}

interface valueSignupType {
  media: {
    faceImage: string
    bodyImage: string
    teamImage?: string
    videoLinks?: string[]
  }
  profile: {
    firstName: string
    lastName: string
    birthDay: string
    birthCountry: any
    city: string
    phone?: string
    gender?: string
    homeAddress?: string
    postNumber?: string
    region?: string
  }
}

const SignUpForm = ({ title }: { title: string }) => {
  const [profileForm, setProfileForm] = useAtom(profileAtom)
  const [profileCoachForm, setProfileCoachForm] = useAtom(profileCoachAtom)
  const router = useRouter()
  const [loading, setLoading] = useState<boolean>(false)
  const [formValues, setFormValues] = useState<FormValues>({
    firstName: '',
    lastName: '',
    birthDay: null,
    country: '',
    city: '',
    userProfile: '',
  })
  const [formErrors, setFormErrors] = useState<FormValues>({
    firstName: '',
    lastName: '',
    birthDay: '',
    country: '',
    city: '',
    userProfile: '',
    faceImage: '',
    bodyImage: '',
  })
  const [faceImages, setFaceImage] = useState<string>('')
  const [fullBodyImage, setFullBodyImage] = useState<string>('')
  const { signout } = useAuth()

  React.useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }

    let el = window.document.querySelector('.ant-form')
    if (!el) {
      return
    }

    el.classList.remove('ant-form')
  }, [])

  const handleChangeForm = (type: keyof FormValues, value: string) => {
    setFormValues((prev) => ({ ...prev, [type]: value }))
    setFormErrors((prev) => ({ ...prev, [type]: '' }))
  }
  // console.log('formValues', formValues)

  const handleSubmit = async (event) => {
    event.preventDefault()
    setLoading(true)
    //validate
    if (!formValues.firstName) {
      setFormErrors((prev) => ({ ...prev, firstName: 'Input your First Name' }))
    } else if (formValues.firstName.length === 1) {
      setFormErrors((prev) => ({
        ...prev,
        lastName: 'First Name must be more than 2 character',
      }))
    } else if (!formValues.lastName) {
      setFormErrors((prev) => ({ ...prev, lastName: 'Input your Last Name' }))
    } else if (formValues.lastName.length === 1) {
      setFormErrors((prev) => ({
        ...prev,
        lastName: 'Last Name must be more than 2 character',
      }))
    } else if (!formValues.birthDay) {
      setFormErrors((prev) => ({ ...prev, birthDay: 'Input your Birthdate' }))
    } else if (!formValues.country) {
      setFormErrors((prev) => ({ ...prev, country: 'Input your Country' }))
    } else if (!formValues.city) {
      setFormErrors((prev) => ({ ...prev, city: 'Input your City' }))
    } else if (!formValues.userProfile) {
      setFormErrors((prev) => ({
        ...prev,
        userProfile: 'Input your User profile',
      }))
    }

    if (
      formValues.firstName &&
      formValues.lastName &&
      formValues.birthDay &&
      formValues.country &&
      formValues.city &&
      formValues.userProfile
      // && formValues.faceImage &&
      // formValues.bodyImage
    ) {
      /* @ts-ignore */
      if (formValues.userProfile.label === 'Player') {
        setProfileForm({
          ...profileAtom,
          media: {
            faceImage: faceImages,
            bodyImage: fullBodyImage,
            teamImage: '',
            videoLinks: [],
          },
          profile: {
            firstName: formValues.firstName,
            lastName: formValues.lastName,
            birthDay: formValues.birthDay,
            birthCountry: formValues.country,
            city: formValues.city,
            phone: '',
            gender: '',
            homeAddress: '',
            postNumber: '',
            region: '',
          },
        })
        /* @ts-ignore */
      } else if (formValues.userProfile.label === 'Coach') {
        setProfileCoachForm({
          ...profileCoachAtom,
          media: {
            faceImage: faceImages,
            bodyImage: fullBodyImage,
            teamImage: '',
            videoLinks: [],
          },
          profile: {
            firstName: formValues.firstName,
            lastName: formValues.lastName,
            birthDay: formValues.birthDay,
            birthCountry: formValues.country,
            city: formValues.city,
            phone: '',
            gender: '',
            homeAddress: '',
            postNumber: '',
            region: '',
          },
        })
      }

      setLoading(false)
      router.push({
        pathname:
          /* @ts-ignore */
          formValues.userProfile.label === 'Player'
            ? ROUTES.UPDATE_PROFILE_PLAYER
            : ROUTES.UPDATE_PROFILE_COACH,
        /* @ts-ignore */
        query: { profile: formValues.userProfile.label },
      })
    }
    setTimeout(() => {
      setLoading(false)
    }, 1000)
  }

  return (
    <div className="autofill2 w-screen min-h-screen float-left lg:flex md:items-center">
      <div
        className="absolute top-[16px] lg:top-[40px] md:left-[40px]"
        onClick={async () => {
          await signout()
        }}
      >
        <GoBack label="Sign in form" goBack="/signin" />
      </div>
      <div
        className={`w-[320px] mobileM:w-[365px] md:w-[480px] rounded-[8px] pt-[48px] pb-[48px] lg:right-[5%] xl:right-[10%] 
          2xl:right-[25%] mx-auto lg:mr-0 lg:absolute`}
      >
        <p className="text-[24px] text-[#FFFFFF] font-semibold md:mb-[48px] text-center md:text-left absolute">
          {title}
        </p>

        <div className="w-full flex justify-between mt-[38px] md:pt-[48px]">
          <MyInput
            signupForm
            name={'firstName'}
            label="First name"
            onChange={(e) => handleChangeForm('firstName', e.target.value)}
            className="pr-[6px] md:pr-[12px]"
            errorMessage={formErrors.firstName}
          />
          <MyInput
            signupForm
            name={'lastName'}
            label="Last name"
            onChange={(e) => handleChangeForm('lastName', e.target.value)}
            className="pl-[6px] md:pl-[12px]"
            errorMessage={formErrors.lastName}
          />
        </div>

        <MyDatePicker
          label="Birthdate"
          onChange={(e) => handleChangeForm('birthDay', e)}
          value={formValues.birthDay}
          className="mt-[24px]"
          errorMessage={formErrors.birthDay}
        />

        <MySelectCountry
          label="Select Country"
          onChange={(_, value) => handleChangeForm('country', value)}
          value={formValues.country}
          className="mt-[24px]"
          errorMessage={formErrors.country}
        />

        <LocationSearchInput
          setCity={(value) => {
            setFormValues((prev) => ({ ...prev, city: value }))
            setFormErrors((prev) => ({ ...prev, city: '' }))
          }}
          errorMessage={formErrors.city}
        />

        <MyCustomSelect
          className="mt-[24px]"
          label={'User profile'}
          onChange={(_, value) => handleChangeForm('userProfile', value)}
          arrOptions={OptionUserProfile}
          val={formValues.userProfile}
          errorMessage={formErrors.userProfile}
        />

        <div className="mt-[4px] md:flex md:gap-[24px] md:mt-[24px] w-full">
          <div className="md:flex-1">
            <CustomUploadImage
              title="Face image"
              text="Add portrait photo of 480*640 pixels or more"
              width={isMobile ? '100%' : 223}
              height={isMobile ? 160 : 130}
              className="border-[2px] border-gray-700 hover:border-white duration-150"
              textClass="pt-8 px-9 font-medium"
              iconClass={clsx(isMobile ? 'pt-[38px]' : 'pt-[18px]')}
              setImage={setFullBodyImage}
            />
          </div>
          <div className="md:flex-1">
            <CustomUploadImage
              title="Body image"
              text="Add portrait photo of 480*640 pixels or more"
              width={isMobile ? '100%' : 223}
              height={isMobile ? 160 : 130}
              className="border-[2px] border-gray-700 hover:border-white duration-150"
              textClass="pt-8 px-9 font-medium"
              iconClass={clsx(isMobile ? 'pt-[38px]' : 'pt-[18px]')}
              setImage={setFullBodyImage}
            />
          </div>
        </div>

        <div className="mt-[40px]" onClick={handleSubmit}>
          <Button
            loading={loading}
            className=" h-[48px] w-[300px] md:w-[470px] bg-[#4654EA] text-[15px] text-[#FFFFFF] font-semibold hover:bg-[#5b67f3]"
            text="Next"
          />
        </div>
      </div>
    </div>
  )
}

export default SignUpForm
