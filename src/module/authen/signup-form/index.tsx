import { Button } from 'src/components'
import { MyInput } from 'src/components/MyInput'
import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { useAuth } from '../auth/AuthContext'
import { Form } from 'antd'
const cls = require('./signup-form.module.css')
import { GoBack } from 'src/components/go-back'
import { UploadImage } from 'src/components/upload-image'
import { MySelect } from 'src/components/MySelect'
import { OptionCountry, OptionUserProfile } from '../types'
import { MyDatePicker } from 'src/components/MyDatePicker'
import { ROUTES } from 'src/constants/constants'
import { LocationSearchInput } from 'src/components/location-search-input'
import { MySelectCountry } from 'src/components/MySelectCountry'

const SignUpForm = () => {
  const router = useRouter()
  const [form] = Form.useForm()
  const [loading, setLoading] = useState<boolean>(false)
  const [country, setCountry] = useState<string>('')
  const [userProfile, setUserProfile] = useState<string>('')
  const [faceImage, setFaceImage] = useState<string>('')
  const [fullBodyImage, setFullBodyImage] = useState<string>('')
  const [date, setDate] = useState(null)
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

  const handleSubmit = async (event) => {
    event.preventDefault()
    const submitForm = await form.validateFields()
    console.log('submitForm', submitForm)

    router.push({
      pathname: ROUTES.SIGNUP_FORM_PLAYER,
      query: { profile: userProfile },
    })
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
        className={`w-[320px] mobileM:w-[365px] md:w-[490px] md:h-[880px] rounded-[8px] pt-[48px] pb-[48px] lg:right-[5%] xl:right-[10%] 
          2xl:right-[25%] overflow-y-auto pl-[5px] pr-[5px] mx-auto lg:mr-0 lg:absolute`}
      >
        <p className="text-[24px] text-[#FFFFFF] font-semibold md:mb-[48px] text-center md:text-left absolute">
          Sign up form
        </p>
        <Form className="" form={form}>
          <div className="w-full flex justify-between mt-[34px] md:mt-[48px]">
            <Form.Item
              className="w-[235px] pr-[12px] mb-[24px]"
              name={'firstName'}
              rules={[
                {
                  required: true,
                  message: 'Input your First name',
                },
              ]}
            >
              <MyInput name={'firstName'} label="First name" signupForm />
            </Form.Item>
            <Form.Item
              className="w-[235px] pl-[12px] mb-[24px]"
              name={'lastName'}
              rules={[
                {
                  required: true,
                  message: 'Input your  Last name',
                },
              ]}
            >
              <MyInput name={'lastName'} label="Last name" signupForm />
            </Form.Item>
          </div>
          <Form.Item
            className=""
            name={'birthDate'}
            rules={[
              {
                required: true,
                message: 'Input your Birth date',
              },
            ]}
          >
            <MyDatePicker
              label="Birthdate"
              value={date}
              onChange={(e) => setDate(e)}
            />
          </Form.Item>

          <Form.Item
            className="mt-[24px]"
            name={'selectCountry'}
            rules={[
              {
                required: true,
                message: 'Input your Select country',
              },
            ]}
          >
            <MySelectCountry
              label="Select Country"
              onChange={(_, value) => {
                setCountry(value)
              }}
              val={country}
            />
          </Form.Item>

          <LocationSearchInput />

          <Form.Item
            className="mt-[24px]"
            name={'userProfile'}
            rules={[
              {
                required: true,
                message: 'Input your User profile',
              },
            ]}
          >
            <MySelect
              signupForm
              className=""
              label={'User profile'}
              value={userProfile}
              onChange={(e) => {
                setUserProfile(e.target.value)
              }}
              arrOption={OptionUserProfile}
            />
          </Form.Item>

          <div className="absolute md:flex mt-[4px] md:mt-[24px] w-full">
            <UploadImage
              title="Face image"
              text="Add portrait photo of 480*640 pixels or more"
              className="float-left"
              setImage={setFaceImage}
            />
            <UploadImage
              title="Full body image"
              text="Add portrait photo of 480*640 pixels or more"
              className="md:ml-[24px] float-left mt-[18px] md:mt-0"
              setImage={setFullBodyImage}
            />
          </div>

          <div
            className="absolute mt-[368px] md:mt-[230px]"
            onClick={handleSubmit}
          >
            <Button
              loading={loading}
              className=" h-[48px] w-[300px] md:w-[480px] bg-[#4654EA] text-[15px] text-[#FFFFFF] font-semibold hover:bg-[#5b67f3]"
              text="Next"
            />
          </div>
        </Form>
      </div>
    </div>
  )
}

export default SignUpForm
