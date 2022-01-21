import { Button, LogoBigSize } from 'components'
import { MyInput } from 'components/MyInput'
import { FormEvent, useState } from 'react'
import { useRouter } from 'next/router'
import { useAtom } from 'jotai'
import { useAuth } from '../auth/AuthContext'
import cls from './signup.module.css'
import { Form } from 'antd'
import { MyCheckbox } from 'components/common/MyCheckbox'
import { GoBack } from 'components/go-back'

export const SignUpWithEmail = () => {
  const router = useRouter()
  const [loading, setLoading] = useState<boolean>(false)
  const [checked, setChecked] = useState<boolean>(false)
  const [values, setValues] = useState({
    email: '',
    password: '',
    confirm_password: '',
  })
  const [form] = Form.useForm()
  const { SignUpWithEmailAndPassword } = useAuth()

  const handleSignUp = async (e: any) => {
    e.preventDefault()
    const submitForm = await form.validateFields()
    console.log('submitForm', submitForm)
    if (!checked) {
      return
    }
    // try {
    //   await SignUpWithEmailAndPassword(values.email, values.password)
    //   router.push('/signin')
    // } catch (error) {
    //   console.log('err')
    // }
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
                  message: 'Required fields must be filled in.',
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
                  message: 'Required fields must be filled in.',
                  max: 255,
                },
                {
                  min: 6,
                  message: 'Your password must be more than 6 characters',
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
                  message: 'Required fields must be filled in.',
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
                text="Sign up"
                className="h-[48px] font-semibold text-[15px] text-[#FFFFFF] bg-[#4654EA] hover:bg-[#6d78f3]"
              />
            </div>
            <div className="w-full h-[1px] bg-[#818389] mt-[24px]"></div>
            <p
              className="text-[#4654EA] underline mt-[24px] cursor-pointer"
              onClick={() => {
                router.push('/signin')
              }}
            >
              Already have an account?
            </p>
          </Form>
        </div>
      </div>

      <LogoBigSize className="mt-12" />
    </div>
  )
}
