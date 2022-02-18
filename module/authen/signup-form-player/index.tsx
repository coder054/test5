import { Button } from 'components'
import { MyInput } from 'components/MyInput'
import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { useAuth } from '../auth/AuthContext'
import { Form } from 'antd'
import { GoBack } from 'components/go-back'
import { MySelect } from 'components/MySelect'
import { OptionCoach, OptionPlayer } from '../types'
import { DynamicFields } from 'components/dynamic-fields'
import { useIncrementNumber } from 'hooks/useIncrementNumber'
import { MyModal } from 'components/MyModal'
import { ROUTES } from 'constants/constants'

export const SignUpFormPlayer = () => {
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

  const handleAddNewClub = async (event) => {}

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
      <div className="absolute top-[16px] lg:top-[40px] md:left-[40px]]">
        <GoBack label="Sign up form" goBack={ROUTES.SIGNUP_FORM} />
      </div>
      <div
        className={`w-[320px] md:w-[490px] md:h-[880px] rounded-[8px] pt-[48px] pb-[48px] lg:right-[5%] xl:right-[10%] 2xl:right-[25%] overflow-y-auto 
        pl-[5px] pr-[5px] mx-auto lg:mr-0 lg:absolute`}
      >
        <p className="text-[24px] text-[#FFFFFF] font-semibold text-center md:text-left">
          Sign up form - player
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
            className="w-[310px] md:w-[470px]"
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

          <Form.Item
            className="float-left"
            name={'favoriteRole'}
            rules={[
              {
                required: true,
                message: 'Input your Favorite Role(s)',
              },
            ]}
          >
            <MySelect
              className="w-[270px] md:w-[430px]"
              label={'Favorite Role(s)'}
              // value={yourClub}
              onChange={(e) => {
                // setYourClub(e.target.value)
              }}
              arrOption={profile === 'player' ? OptionPlayer : OptionCoach}
            />
          </Form.Item>
          <div className="-mt-[48px]">
            <DynamicFields
              maxField={3}
              name={'favoriteRoles'}
              label="Favorite Role(s)"
              type="select"
              profile={profile as string}
            />
          </div>

          <Form.Item
            className="w-[310px] md:w-[470px]"
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
            className="w-[310px] md:w-[470px]"
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
