import { Button, LogoBigSize } from 'src/components'
import { MyInput } from 'src/components/MyInput'
import { useAuth } from '../auth/AuthContext'
import { Form } from 'antd'
const cls = require('./reset-password.module.css')
import { MyModal } from 'src/components/MyModal'
import React, { useState } from 'react'
import { useRouter } from 'next/router'

const ResetPassword = () => {
  const [form] = Form.useForm()
  const { ResetPassword, checkEmail, setCheckEmail } = useAuth()
  const [openModal, setOpenModal] = useState<boolean>(checkEmail)
  const [email, setEmail] = useState<string>('')
  const router = useRouter()

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

  const handleSubmit = async (e) => {
    e.preventDefault()
    const submitForm = await form.validateFields()
    setEmail(submitForm.email)
    await ResetPassword(submitForm.email)
  }

  return (
    <div className="w-screen h-screen flex items-center">
      <div
        className={`${cls.formResetPassword} w-[470px] rounded-[8px] pt-[48px] pl-[32px] pr-[32px] pb-[48px] ml-[17%]`}
      >
        <Form className="" form={form}>
          <div className="w-full text-center">
            <p className="text-[24px] text-[#FFFFFF] font-semibold">
              Forgot Password
            </p>
          </div>
          <p className="text-[16px] text-[#FFFFFF] mt-[24px]">
            Enter the mail you want to recieve code
          </p>
          <Form.Item
            className="mt-[8px]"
            name={'email'}
            rules={[
              {
                required: true,
                message: 'Email is invalid.',
              },
              { type: 'email', message: 'Email is invalid.' },
            ]}
          >
            <MyInput name={'email'} label="Email" />
          </Form.Item>
          <div className="mt-[24px]" onClick={handleSubmit}>
            <Button
              className="h-[48px] bg-[#4654EA] text-[15px] text-[#FFFFFF] font-semibold hover:bg-[#5b67f3]"
              text="Send"
            />
          </div>
        </Form>
      </div>
      <LogoBigSize />
      <MyModal show={checkEmail} width={542} setShow={setOpenModal}>
        <div
          className={`${cls.modal} bg-[#1E1F24] pt-[42.8px] pr-[44.8px] pl-[44.8px] pb-[44.8px] rounded-[4px] float-left`}
        >
          <p className="float-left text-[18px] text-[#FFFFFF] mt-[20.8px] mb-[32px]">
            Please check your email:{' '}
            <span className="text-[#09E099] underline-offset-1">{email}</span>
          </p>
          <div className="w-full float-left">
            <Button
              className="h-[48px] bg-[#4654EA] text-[15px] text-[#FFFFFF] font-semibold hover:bg-[#5b67f3]"
              text="Back"
              onClick={() => {
                setCheckEmail(false)
                router.push('/signin')
              }}
            />
          </div>
        </div>
      </MyModal>
    </div>
  )
}

export default ResetPassword
