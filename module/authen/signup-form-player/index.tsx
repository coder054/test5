import { Button } from 'components'
import { MyInput } from 'components/MyInput'
import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { useAuth } from '../auth/AuthContext'
import { Form } from 'antd'
// import cls from './signup-form-player.module.css'
import { GoBack } from 'components/go-back'
import { UploadImage } from 'components/upload-image'
import { MySelect } from 'components/MySelect'
import { OptionCountry, OptionUserProfile } from '../types'
import { DynamicFields } from 'components/dynamic-fields'
import { useIncrementNumber } from 'hooks/useIncrementNumber'

export const SignUpFormPlayer = () => {
  const router = useRouter()
  const [form] = Form.useForm()
  const [loading, setLoading] = useState<boolean>(false)
  const [yourClub, setYourClub] = useState<string>('')
  const [yourTeam, setYourTeam] = useState<string>('')
  const [role, setRole] = useState<string>('')
  const { signin } = useAuth()
  const shirtNumber = useIncrementNumber({
    startNumber: 1,
    endNumber: 99,
  })

  const lengthNumber = useIncrementNumber({
    startNumber: 120,
    endNumber: 220,
    meanSure: 'cm',
  })

  const weightNumber = useIncrementNumber({
    startNumber: 30,
    endNumber: 130,
    meanSure: 'kg',
  })

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

  const handleChangeUpload = async (event) => {}

  const handleSubmit = async (event) => {
    event.preventDefault()
    const submitForm = await form.validateFields()
    console.log('submitForm', submitForm)
  }

  function handleFinish(values) {
    console.log('VALUES', values)
  }

  return (
    <div className="autofill2 w-screen h-screen flex items-center">
      <div className="absolute top-[40px] left-[40px]">
        <GoBack label="Sign in form" goBack="/signin" />
      </div>
      <div
        className={`w-[470px] rounded-[8px] pt-[48px] pb-[48px] absolute right-[25%] float-left`}
      >
        <p className="text-[24px] text-[#FFFFFF] font-semibold">
          Sign up form - player
        </p>
        <Form className="" form={form} onFinish={handleFinish}>
          <Form.Item
            className="mt-[48px]"
            name={'yourClub'}
            rules={[
              {
                required: true,
                message: 'Input your Your Club',
              },
            ]}
          >
            <MySelect
              addNew
              titleAddNew="No club found,"
              linkAddNew="add new club"
              className=""
              label={'Your Club'}
              value={yourClub}
              onChange={(e) => {
                setYourClub(e.target.value)
              }}
              arrOption={[
                { value: 'Ha Noi', label: 'Hà Nội T&T' },
                { value: 'HAGL', label: 'HAGL' },
              ]}
            />
          </Form.Item>
          <MyInput
            label="Your Team(s)"
            message="Input your Team"
            name="yourTeam"
            className="w-[430px] float-left mb-[24px]"
          />

          <DynamicFields
            label="Your Team(s)"
            message="Input your Team"
            name="yourTeam"
            maxField={3}
          />

          <Form.Item
            className="w-[470px]"
            name={'shirtNumber'}
            rules={[
              {
                required: true,
                message: 'Input your Shirt Number',
              },
            ]}
          >
            <MySelect
              signupForm
              className=""
              label={'Shirtnumber'}
              value={yourClub}
              onChange={(e) => {
                setYourClub(e.target.value)
              }}
              arrOption={shirtNumber}
            />
          </Form.Item>

          <MySelect
            className="w-[430px] float-left mb-[24px]"
            label={'Favorite Role(s)'}
            // value={yourClub}
            onChange={(e) => {
              // setYourClub(e.target.value)
            }}
            arrOption={[
              { value: '1', label: '1' },
              { value: '2', label: '2' },
            ]}
          />
          <DynamicFields
            maxField={3}
            name={'favoriteRole'}
            label="Favorite Role(s)"
            type="select"
          />

          <Form.Item
            className=" w-[470px]"
            name={'length'}
            rules={[
              {
                required: true,
                message: 'Input your Length',
              },
            ]}
          >
            {shirtNumber && (
              <MySelect
                signupForm
                className=""
                label={'length'}
                value={yourClub}
                onChange={(e) => {
                  setYourClub(e.target.value)
                }}
                arrOption={lengthNumber}
              />
            )}
          </Form.Item>

          <Form.Item
            className="mt-[24px]"
            name={'weight'}
            rules={[
              {
                required: true,
                message: 'Input your Weight',
              },
            ]}
          >
            <MySelect
              signupForm
              className=""
              label={'weight'}
              value={yourClub}
              onChange={(e) => {
                setYourClub(e.target.value)
              }}
              arrOption={weightNumber}
            />
          </Form.Item>

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
