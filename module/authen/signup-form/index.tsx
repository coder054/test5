import { Button } from 'components'
import { MyInput } from 'components/MyInput'
import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { useAuth } from '../auth/AuthContext'
import { Form } from 'antd'
import cls from './signup-form.module.css'
import { GoBack } from 'components/go-back'
import { UploadImage } from 'components/upload-image'
import { MySelect } from 'components/MySelect'
import { OptionCountry, OptionUserProfile } from '../types'
import { MyDatePicker } from 'components/MyDatePicker'
import { ROUTES } from 'constants/constants'

const SignUpForm = () => {
  const router = useRouter()
  const [form] = Form.useForm()
  const [loading, setLoading] = useState<boolean>(false)
  const [country, setCountry] = useState<string>('')
  const [userProfile, setUserProfile] = useState<string>('')
  const [faceImage, setFaceImage] = useState<string>('')
  const [fullBodyImage, setFullBodyImage] = useState<string>('')
  const [date, setDate] = useState(null)
  const { signin } = useAuth()

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
    router.push({
      pathname: ROUTES.SIGNUP_FORM_PLAYER,
      query: { profile: userProfile },
    })
  }

  return (
    <div className="autofill2 w-screen h-screen flex items-center">
      <div className="absolute top-[40px] left-[40px]">
        <GoBack label="Sign in form" goBack="/signin" />
      </div>
      <div
        className={`w-[490px] h-[880px] rounded-[8px] pt-[48px] pb-[48px] absolute right-[25%] overflow-y-auto pl-[5px] pr-[5px]`}
      >
        <p className="text-[24px] text-[#FFFFFF] font-semibold mb-[48px]">
          Sign up form
        </p>
        <Form className="" form={form}>
          <div className="w-full flex justify-between mt-[48px]">
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
            <MySelect
              signupForm
              className=""
              label={'Select Country'}
              value={country}
              onChange={(e) => {
                setCountry(e.target.value)
              }}
              arrOption={OptionCountry}
            />
          </Form.Item>

          <Form.Item
            className="mt-[24px]"
            name={'city'}
            rules={[
              {
                required: true,
                message: 'Input your City where you are living in today',
              },
            ]}
          >
            <MyInput
              name={'city'}
              label="City where you are living in today"
              signupForm
            />
          </Form.Item>

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

          <div className="flex mt-[24px]">
            <UploadImage
              width={223}
              height={130}
              title="Face image"
              text="Add portrait photo of 480*640 pixels or more"
              setImage={setFaceImage}
            />
            <UploadImage
              width={223}
              height={130}
              title="Full body image"
              text="Add portrait photo of 480*640 pixels or more"
              className="ml-[24px]"
              setImage={setFullBodyImage}
            />
          </div>

          <div className="mt-[40px]" onClick={handleSubmit}>
            <Button
              loading={loading}
              className="h-[48px] bg-[#4654EA] text-[15px] text-[#FFFFFF] font-semibold hover:bg-[#5b67f3]"
              text="Next"
            />
          </div>
        </Form>
      </div>
    </div>
  )
}

export default SignUpForm
