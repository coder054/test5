import { Button, LogoBigSize } from 'src/components'
import { MyInput } from 'src/components/MyInput'
import { useAuth } from '../auth/AuthContext'
import { Form } from 'antd'
const cls = require('./change-password.module.css')
import { useRouter } from 'next/router'
import { useState } from 'react'

const ChangePassword = () => {
  const [form] = Form.useForm()
  const router = useRouter()
  const { ForgotPassword } = useAuth()
  const [oobCode] = useState<string>(router.query.oobCode as string)

  const handleSubmit = async (e) => {
    e.preventDefault()
    const submitForm = await form.validateFields()
    await ForgotPassword(oobCode, submitForm.newPassword)
  }

  return (
    <div className="w-screen h-screen flex items-center">
      {/* <div
        className={`${cls.formChangePassword} w-[470px] border rounded-[8px] pt-[48px] pl-[32px] pr-[32px] pb-[48px] ml-[17%]`}
      >
        <Form className="" form={form}>
          <div className="w-full text-center">
            <p className="text-[24px] text-[#FFFFFF] font-semibold">New Password</p>
          </div>
          <Form.Item
            className="mt-[24px]"
            name={'newPassword'}
            rules={[
              {
                required: true,
                message: 'Required fields must be filled in.',
              },
            ]}
          >
            <MyInput name={'newPassword'} label="New Password" />
          </Form.Item>
          <div className="mt-[24px]" onClick={handleSubmit}>
            <Button
              className="h-[48px] bg-[#4654EA] text-[15px] text-[#FFFFFF] font-semibold hover:bg-[#5b67f3]"
              text="Send Email"
            />
          </div>
        </Form>
      </div> */}
      <LogoBigSize />
    </div>
  )
}

export default ChangePassword
