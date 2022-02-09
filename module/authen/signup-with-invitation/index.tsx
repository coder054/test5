import { Button, LogoBigSize } from 'components'
import { MyInput } from 'components/MyInput'
import React, { FormEvent, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useAuth } from '../auth/AuthContext'
import { Form } from 'antd'
import cls from './signup-with-invitation.module.css'
import { GoBack } from 'components/go-back'
import { imgAvatarSignup } from 'imports/images'
import Image from 'next/image'
import Link from 'next/link'
import { MyCheckbox } from 'components/common/MyCheckbox'

const SignUpWithInvitation = () => {
  const router = useRouter()
  const [form] = Form.useForm()
  const [loading, setLoading] = useState<boolean>(false)
  const [checkedFormPhoneSignUp, setCheckedFormPhoneSignUp] =
    useState<boolean>(true)
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
  }

  return (
    <div className="autofill2 w-screen h-screen flex items-center">
      <div className="absolute top-[40px] left-[40px]">
        <GoBack label="Sign up with SMS" goBack="/signin" />
      </div>
      <div
        className={`${cls.formSignUpWithInvitation} w-[470px] rounded-[8px] pt-[48px] pl-[32px] pr-[32px] pb-[48px] ml-[17%]`}
      >
        <div className="w-full text-center">
          <p className="text-[24px] text-[#FFFFFF] font-semibold">Sign up</p>
          <p className="mt-[16px] text-[#818389] text-[14px]">
            {"You've been invited by"}
          </p>
        </div>
        <div className="mt-[24px] h-[40px]">
          <div className="float-left">
            <Image src={imgAvatarSignup} alt="" className="w-[40px] h-[40px]" />
          </div>
          <div className="float-left ml-[12px]">
            <span className="text-base text-[#FFFFFF]">Nicklas Jonsson</span>
            <div className="text-[12px] text-[#818389]">
              <span>#NicJon68</span>
              <span className="ml-[12px]">Coach</span>
            </div>
          </div>
        </div>

        <Form className="" form={form}>
          <Form.Item
            className="mt-[24px]"
            name={'code'}
            rules={[
              {
                required: true,
                message: 'Input your code address',
              },
            ]}
          >
            <MyInput name={'code'} label="Code" />
          </Form.Item>

          <Form.Item
            className="mt-[24px]"
            name={'email'}
            rules={[
              {
                required: true,
                message: 'Input your email address',
              },
              { type: 'email', message: 'Your email is invalid' },
            ]}
          >
            <MyInput name={'email'} label="Email" />
          </Form.Item>

          <Form.Item
            className="mt-[24px]"
            name={'password'}
            rules={[
              {
                required: true,
                message: 'Input your password ',
              },
            ]}
          >
            <MyInput
              name={'password'}
              label="Choose password (+8 signs)"
              password
            />
          </Form.Item>

          <Form.Item
            className="mt-[24px]"
            name={'repeatPassword'}
            rules={[
              {
                required: true,
                message: 'Input your Repeat password',
              },
            ]}
          >
            <MyInput name={'repeatPassword'} label="Repeat Password" password />
          </Form.Item>
          <div className="w-full">
            <MyCheckbox
              label={''}
              checked={checkedFormPhoneSignUp}
              onChange={() => {
                setCheckedFormPhoneSignUp(!checkedFormPhoneSignUp)
              }}
            />
            <span className="text-[#4654EA] text-sm underline">
              Terms & Conditions, Privacy Rules{' '}
            </span>
            <span className="text-base text-[#FFFFFF] ml-[2px]">approved</span>
          </div>
          <div className="mt-[24px]" onClick={handleSubmit}>
            <Button
              loading={loading}
              className="h-[48px] bg-[#4654EA] text-[15px] text-[#FFFFFF] font-semibold hover:bg-[#5b67f3]"
              text="Register"
            />
          </div>
        </Form>

        <div className="bg-[#818389] w-full h-[1px] mt-[24px] mb-[24px]"></div>
        <Link href="/signin">
          <a className="text-Blue text-[16px] leading-[175%] border-b-[1px] border-Blue ">
            Already having an account?
          </a>
        </Link>
      </div>
      <LogoBigSize />
    </div>
  )
}

export default SignUpWithInvitation
