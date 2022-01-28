import { Button, LogoBigSize } from 'components'
import { MyInput } from 'components/MyInput'
import React, { FormEvent, useState } from 'react'
import { useRouter } from 'next/router'
import { useAtom } from 'jotai'
import { useAuth } from '../auth/AuthContext'
import { Form, notification } from 'antd'
import { MyCheckbox } from 'components/common/MyCheckbox'
import { GoBack } from 'components/go-back'
import cls from './signup.module.css'

export const SignUpWithEmail = () => {
  const router = useRouter()
  const [loading, setLoading] = useState<boolean>(false)
  const [checked, setChecked] = useState<boolean>(false)
  const [form] = Form.useForm()
  const { SignUpWithEmailAndPassword } = useAuth()

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

  const handleSignUp = async (e: any) => {
    e.preventDefault()
    const submitForm = await form.validateFields()
    if (!checked) {
      notification.open({
        message: '',
        description:
          'You have to accept Zporters Temps & Coditions and Privacy to sign up.',
        className: 'custom-class',
        style: {
          width: 600,
          backgroundColor: '#ff4d4f',
          color: '#FFFFFF',
        },
        duration: 3,
      })
      return
    }
    setLoading(true)
    await SignUpWithEmailAndPassword(submitForm.email, submitForm.password)
    setTimeout(() => {
      setLoading(false)
    }, 1000)
  }

  return (
    <div className="w-screen h-screen relative">
      <div className="absolute top-[40px] left-[40px]">
        <GoBack label="Sign up with Email" goBack="/signin" />
      </div>
      <div className="w-full h-full flex items-center">
        <div
          className={`${cls.formSignUp} w-[470px] rounded-[8px] pl-[32px] pt-[48px] pr-[32px] pb-[48px] ml-[17%] `}
        >
          <Form className="" form={form}>
            <p className="text-[24px] text-[#FFFFFF] text-center">Sign up</p>
            <p className="text-[14px] text-[#818389] mt-[16px] text-center">
              Register on the internal platform
            </p>
            <Form.Item
              className="mt-[24px]"
              name={'email'}
              rules={[
                {
                  required: true,
                  message: 'Input your email',
                  max: 255,
                },
                { type: 'email', message: 'Email is wrong format.' },
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
                  message: 'Input your password',
                  max: 255,
                },
                {
                  min: 8,
                  message: 'Your password must be more than 8 characters',
                },
              ]}
            >
              <MyInput name={'password'} label="Password" password />
            </Form.Item>
            <Form.Item
              className="mt-[24px]"
              name={'repeat_password'}
              rules={[
                {
                  required: true,
                  message: 'Input your repeat password',
                },
                ({ getFieldValue }) => ({
                  validator(rule, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve()
                    }
                    return Promise.reject(
                      'The two passwords that you entered do not match!'
                    )
                  },
                }),
              ]}
            >
              <MyInput
                name={'repeat_password'}
                label="Repeat Password"
                password
              />
            </Form.Item>
            <div className="w-full">
              <MyCheckbox
                label={''}
                checked={checked}
                onChange={() => {
                  setChecked(!checked)
                }}
              />
              <span className="text-[#4654EA] text-sm underline">
                Terms & Conditions, Privacy Rules{' '}
              </span>
              <span className="text-base text-[#FFFFFF] ml-[2px]">
                appeoved
              </span>
            </div>
            <div className="w-full mt-[22px]" onClick={handleSignUp}>
              <Button
                submit
                loading={loading}
                text="Sign up"
                className="h-[48px] font-semibold text-[15px] text-[#FFFFFF] bg-[#4654EA] hover:bg-[#6d78f3]"
              />
            </div>
            <div className="w-full h-[1px] bg-[#818389] mt-[24px] mb-[24px]"></div>
            <span
              className="text-[#4654EA] underline cursor-pointer"
              onClick={() => {
                router.push('/signin')
              }}
            >
              Already have an account?
            </span>
          </Form>
        </div>
        <LogoBigSize className="mt-12" />
      </div>
    </div>
  )
}
