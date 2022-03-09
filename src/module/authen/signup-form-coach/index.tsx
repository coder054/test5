import { Button } from 'src/components'
import { MyInput } from 'src/components/MyInput'
import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { useAuth } from '../auth/AuthContext'
import { Form } from 'antd'
import { GoBack } from 'src/components/go-back'
import { MySelect } from 'src/components/MySelect'
import { OptionCoach, OptionPlayer } from '../types'
import { DynamicFields } from 'src/components/dynamic-fields'
import { useIncrementNumber } from 'src/hooks/useIncrementNumber'
import { MyModal } from 'src/components/MyModal'
import { ROUTES } from 'src/constants/constants'
import {
  CoachingStyle,
  CoachingType,
  ExperienceLevel,
  HighestCoachingEducation,
} from 'src/constants/options'

export const SignUpFormCoach = () => {
  const [value, setValue] = useState('')
  const router = useRouter()
  const [form] = Form.useForm()
  const [loading, setLoading] = useState<boolean>(false)
  const [yourClub, setYourClub] = useState<string>('')
  const [yourTeam, setYourTeam] = useState<string>('')
  const [role, setRole] = useState<string>('')
  const [openModal, setOpenModal] = useState<boolean>(false)
  const { profile } = router.query
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

  const handleSubmit = async (event) => {
    event.preventDefault()
    const submitForm = await form.validateFields()
    console.log('submitForm', submitForm)
  }

  function handleFinish(values) {
    console.log('VALUES', values)
  }

  return (
    <div className="autofill2 w-screen min-h-screen lg:flex md:items-center">
      <div className="absolute top-[16px] lg:top-[40px] left-[149px] md:left-[40px]]">
        <GoBack label="Sign up form" goBack={ROUTES.SIGNUP_FORM} />
      </div>
      <div
        className={`w-[320px] md:w-[490px] md:h-[880px] rounded-[8px] pt-[48px] pb-[48px] lg:right-[5%] xl:right-[10%] 2xl:right-[25%] overflow-y-auto 
        pl-[5px] pr-[5px] mx-auto lg:mr-0 lg:absolute`}
      >
        <p className="text-[24px] text-[#FFFFFF] font-semibold text-center md:text-left">
          Sign up form - coach
        </p>
        <Form className="" form={form} onFinish={handleFinish}>
          <Form.Item
            className="w-[310px] md:w-[470px] mt-[48px]"
            name={'yourClub'}
            rules={[
              {
                required: true,
                message: 'Input your Your Club',
              },
            ]}
          >
            <MySelect
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
              addNew
              setOpenModal={setOpenModal}
            />
          </Form.Item>
          <Form.Item
            className="w-[310px] md:w-[470px] float-left"
            name={'yourTeam'}
            rules={[
              {
                required: true,
                message: 'Input your Your Team',
              },
            ]}
          >
            <MyInput
              label="Your Team(s)"
              message="Input your Team"
              name="yourTeam"
              className="w-[270px] md:w-[430px]"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
          </Form.Item>

          <div className="-mt-[48px]">
            <DynamicFields
              label="Your Team(s)"
              message="Input your Team"
              name="yourTeams"
              maxField={3}
            />
          </div>

          <Form.Item
            className="w-full"
            name={'role'}
            rules={[
              {
                required: true,
                message: 'Input your Role',
              },
            ]}
          >
            <MySelect
              className=""
              label={'Role'}
              onChange={(e) => {
                // setYourClub(e.target.value)
              }}
              arrOption={OptionCoach}
            />
          </Form.Item>

          <Form.Item
            className="w-[310px] md:w-[470px]"
            name={'highestCoachingEducation'}
            rules={[
              {
                required: true,
                message: 'Input your Highest Coaching Education',
              },
            ]}
          >
            <MySelect
              signupForm
              className=""
              label={'Highest Coaching Education'}
              // value={yourClub}
              onChange={(e) => {
                setYourClub(e.target.value)
              }}
              arrOption={HighestCoachingEducation}
            />
          </Form.Item>

          <Form.Item
            className="w-[310px] md:w-[470px]"
            name={'experienceLevel'}
            rules={[
              {
                required: true,
                message: 'Input your Experience Level',
              },
            ]}
          >
            <MySelect
              signupForm
              className=""
              label={'Experience Level'}
              // value={yourClub}
              onChange={(e) => {
                setYourClub(e.target.value)
              }}
              arrOption={ExperienceLevel}
            />
          </Form.Item>

          <Form.Item
            className="w-[310px] md:w-[470px]"
            name={'coachingStyle'}
            rules={[
              {
                required: true,
                message: 'Input your Coaching Style',
              },
            ]}
          >
            <MySelect
              signupForm
              className=""
              label={'Coaching Style'}
              // value={yourClub}
              onChange={(e) => {
                setYourClub(e.target.value)
              }}
              arrOption={CoachingStyle}
            />
          </Form.Item>

          <Form.Item
            className="w-[310px] md:w-[470px]"
            name={'coachingType'}
            rules={[
              {
                required: true,
                message: 'Input your Coaching Type',
              },
            ]}
          >
            <MySelect
              signupForm
              className=""
              label={'Coaching Type'}
              // value={yourClub}
              onChange={(e) => {
                setYourClub(e.target.value)
              }}
              arrOption={CoachingType}
            />
          </Form.Item>

          <div className="mt-[40px] " onClick={handleSubmit}>
            <Button
              loading={loading}
              className="h-[48px] bg-[#4654EA] text-[15px] text-[#FFFFFF] font-semibold hover:bg-[#5b67f3]"
              text="Next"
            />
          </div>
        </Form>
      </div>
      <MyModal show={openModal} setShow={setOpenModal} width={412}>
        <div className="w-[300px] md:w-[412px] mx-auto h-full bg-[#1E1F24] rounded-[8px] p-[16px] md:p-[32px]">
          <div>
            <div
              onClick={() => {
                setOpenModal(false)
              }}
              className="h-[32px] flex items-center"
            >
              <GoBack />
              <p className="text-[24px] text-[#FFFFFF] ml-[48px]">
                Add new club
              </p>
            </div>
          </div>
          <MyInput label="Club name" className="mt-[24px]" />
          <MyInput label="Team name" className="mt-[24px]" />
          <MyInput label="Club website url" className="mt-[24px]" />
          <MyInput label="Favorite Role(s)" className="mt-[24px]" />
          <MyInput label="Country" className="mt-[24px]" />
          <MyInput label="City" className="mt-[24px]" />
          <Button
            text="Save"
            className="h-[48px] mt-[40px] bg-[#4654EA] text-[15px] text-[#FFFFFF] font-semibold hover:bg-[#5b67f3]"
          />
        </div>
      </MyModal>
    </div>
  )
}
