import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import { Form } from 'antd'
import clsx from 'clsx'
import { LogoutIcon } from 'components/icons/LogoutIcon'
import { MyButton } from 'components/MyButton'
import { MyDatePicker } from 'components/MyDatePicker'
import { MyInput } from 'components/MyInput'
import { MySelect } from 'components/MySelect'
import { ReactElement } from 'react'
import { BackGround } from '../common-components/Background'

export const Profile = () => {
  const [form] = Form.useForm()

  const handleSubmit = async () => {
    const res = await form.validateFields()
    console.log('RES: ', res)
  }

  const RenderTermsForm = () => {
    const Items = ({ label, icon }: { label: string; icon: ReactElement }) => {
      return (
        <div
          className={clsx(
            'flex justify-between cursor-pointer hover:bg-white  rounded-[4px] duration-200 px-4 py-2.5'
          )}
        >
          <h1 className="text-[#818389] text-[16px] font-semibold">{label}</h1>
          <span>{icon}</span>
        </div>
      )
    }
    return (
      <div className="space-y-4">
        <Items label="Support" icon={<ArrowForwardIosIcon />} />
        <Items label="Terms & Conditions" icon={<ArrowForwardIosIcon />} />
        <Items label="Privacy rules" icon={<ArrowForwardIosIcon />} />
        <Items label="Delete user profile" icon={<ArrowForwardIosIcon />} />
        <Items label="Log out" icon={<LogoutIcon />} />
      </div>
    )
  }

  const RenderProfileForm = () => {
    return (
      <Form form={form} className="space-y-7">
        <div className="grid grid-cols-2 gap-x-4 gap-y-0">
          <Form.Item className="mb-0" name="firstName">
            <MyInput label="First name" />
          </Form.Item>
          <Form.Item className="mb-0" name="lastName">
            <MyInput label="Last name" />
          </Form.Item>
        </div>
        <Form.Item name="gender">
          <MySelect
            label="Gender"
            arrOption={[
              { value: 'Male', label: 'Male' },
              { value: 'Female', label: 'Female' },
            ]}
          />
        </Form.Item>
        <Form.Item name="birthDay">
          <MyDatePicker label="Birth day" />
        </Form.Item>
      </Form>
    )
  }

  return (
    <div className="space-y-6">
      <BackGround label="Basic Profile" form={<RenderProfileForm />} />
      <BackGround label="Terms" form={<RenderTermsForm />} />
    </div>
  )
}
