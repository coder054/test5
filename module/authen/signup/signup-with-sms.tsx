import OtpInput from 'react-otp-input'
import { Button, LogoBigSize } from 'components'
import { MyInput } from 'components/MyInput'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useAuth } from '../auth/AuthContext'
import { Form, Button as ButtonAnt, notification } from 'antd'
import { MyCheckbox } from 'components/common/MyCheckbox'
import { GoBack } from 'components/go-back'
import { MyModal } from 'components/MyModal'
import { LogoLargeSize } from 'components/logo/LogoLargeSize'
import { InputVerifyCode } from 'components/input/input-verify-code'
import {
  RecaptchaVerifier,
  signInWithPhoneNumber,
  updateEmail,
} from 'firebase/auth'
import { auth } from 'config'
import { axios } from 'utils/axios'
import { get } from 'lodash'
import Link from 'next/link'

export const SignUpWithSMS = () => {
  const router = useRouter()
  const [step, setStep] = useState<1 | 2>(1)
  const [loading, setLoading] = useState<boolean>(false)
  const [checked, setChecked] = useState<boolean>(true)
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [otp, setOtp] = useState<string>('')
  const [form] = Form.useForm()
  const {} = useAuth()

  const sendPhone = async (phone: string) => {
    if (typeof window === 'undefined') {
      return
    }

    try {
      //@ts-ignore: Unreachable code error
      const appVerifier = window.recaptchaVerifier
      const confirmationResult = await signInWithPhoneNumber(
        auth,
        phone,
        appVerifier
      )

      //@ts-ignore: Unreachable code error
      window.confirmationResult = confirmationResult
    } catch (error) {
      console.log(error)
    }
  }

  const sendCode = async (code: string) => {
    if (typeof window === 'undefined') {
      return
    }

    try {
      //@ts-ignore: Unreachable code error
      const result = await window.confirmationResult.confirm(code)
      const user = result.user
      updateEmail(user, 'austin@zporter.co')
      console.log('user: ', user)
    } catch (error) {
      console.log(error)
    }
  }

  const handleSignUp = async (e: any) => {
    // e.preventDefault()
    // if (!checked) {
    //   return
    // }
    // const submitForm = await form.validateFields()
  }

  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }

    /// fix conflict css
    let el = window.document.querySelector('.ant-form')
    if (!el) {
      return
    }
    el.classList.remove('ant-form')

    /// init recapcha
    //@ts-ignore: Unreachable code error
    window.recaptchaVerifier = new RecaptchaVerifier(
      'sign-in-button4',
      {
        size: 'invisible',
        callback: (response) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
          // onSignInSubmit();
          setStep(2)
        },
      },
      auth
    )
  }, [])

  const contentFillInfoSignUpWithPhone = () => {
    return (
      <div className="w-screen h-screen relative">
        <div className="absolute top-[40px] left-[40px]">
          <GoBack label="Sign up with SMS" goBack="/signin" />
        </div>
        <div className="w-full h-full flex items-center">
          <div
            style={{
              boxShadow: `0px 4px 4px rgba(0, 0, 0, 0.25),
  0px 4px 6px -2px rgba(27, 28, 30, 0.05)`,
              backdropFilter: 'blur(68px)',
            }}
            className={`w-[470px] rounded-[8px] pl-[32px] pt-[48px] pr-[32px] pb-[48px] ml-[17%] bg-[#ffffff19] `}
          >
            <Form
              name={`form-${String(Math.random())}`}
              autoComplete="none"
              className=""
              form={form}
              initialValues={{
                phone: '+84355832199',
                password: '123456',
                repeat_password: '123456',
                email: 'example@zporter.co',
              }}
              onFinish={async (values: any) => {
                if (typeof window === 'undefined') {
                  return
                }
                try {
                  console.log('aaa values', values)
                  const { phone, password, repeat_password, email } = values
                  const resp = await axios.get('/auth/check-email/' + email)
                  if (get(resp, 'data.emailExists')) {
                    notification['error']({
                      message: 'Failed',
                      description: 'Email already existed',
                    })
                    return
                  }

                  const respPhone = await axios.get(
                    '/auth/check-phone/' + phone
                  )
                  if (get(respPhone, 'data.phoneExists')) {
                    notification['error']({
                      message: 'Failed',
                      description: 'Phone already existed',
                    })
                    return
                  }

                  await sendPhone(phone)
                } catch (error) {
                  console.log('aaa error', error)
                }
              }}
              onFinishFailed={(errorInfo: any) => {
                console.log('aaa Failed:', errorInfo)
                notification['error']({
                  message: 'Failed',
                  description: 'Your input in not valid',
                })
                return
              }}
            >
              <p className="text-[24px] text-[#FFFFFF] text-center">Sign up</p>
              <p className="text-[14px] text-[#818389] mt-[16px] text-center">
                Register on the internal platform
              </p>
              <Form.Item
                className="mt-[24px]"
                name={'phone'}
                rules={[
                  {
                    required: true,
                    message: 'Required fields must be filled in.',
                    max: 25,
                  },
                ]}
              >
                <MyInput name={'phone'} label="Mobile phone number" />
              </Form.Item>

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
                <MyInput
                  name={'password'}
                  label="Choose password (+8 signs)"
                  password
                />
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
                  approved
                </span>
              </div>
              <div className="w-full mt-[22px]" onClick={handleSignUp}>
                <Button
                  htmlType="submit"
                  submit
                  text="Register"
                  className="sign-in-button h-[48px] font-semibold text-[15px] text-[#FFFFFF] bg-[#4654EA] hover:bg-[#6d78f3]"
                />

                {/* <ButtonAnt type="primary" htmlType="submit">
                Submit
              </ButtonAnt> */}
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
          <LogoBigSize className="mt-12" />
        </div>
        <MyModal show={openModal} setShow={setOpenModal} width={412}>
          <div
            style={{
              boxShadow: '0px 25px 50px rgba(38, 38, 38, 0.1)',
            }}
            className={`w-[412px] p-[32px] bg-[#1e1f24] rounded-[8px]`}
          >
            <LogoLargeSize />
            <p className="text-[24px] text-[#FFFFFF] mt-[16px] text-center font-semibold">
              Verify email
            </p>
            <p className="text-[14px] text-[#FFFFFF] text-center mt-[16px]">
              Now verify your mobile phone number by adding the 6 digit code we
              sent to <span className="text-[#09E099]">+46 768 030568.</span>
            </p>
            <p className="text-sm text-[#FFFFFF] text-center underline">
              Wrong number?
            </p>
            <p className="text-sm text-[#FFFFFF] mt-[24px]">Verify code</p>
            <div className="w-full">
              <InputVerifyCode number={6} />
            </div>
            <Button
              text="Verify code"
              className="bg-[#4654EA] w-[348px] h-[44px] mt-[24px] text-[#FFFFFF] mb-[24px]"
            />
            <div className="h-[1px] w-full bg-[#484A4D] mb-[24px]"></div>
            <span
              className="text-[#4654EA] text-base underline cursor-pointer"
              onClick={() => {
                router.push('/signin')
              }}
            >
              Already have an account?
            </span>
          </div>
        </MyModal>

        <button
          id="sign-in-button4"
          className=" w-[200px] h-[50px] fixed right-0 bottom-0 hidden "
        >
          recapcha
        </button>
      </div>
    )
  }

  const contentFillOtp = () => {
    return (
      <div
        className="w-[372px] mx-auto
                  min-h-[412px]
                  mt-[120px] sm:mt-[120px] md:mt-[120px] lg:mt-[120px] xl:mt-[150px] 2xl:mt-[200px]
                    
                  "
      >
        <img src={'/sidebar/logo.svg'} className="mx-auto mb-[32px]" alt="" />
        <div
          className="text-white text-center font-SVNGilroy text-[24px] leading-[137%] 
        mb-2"
        >
          Verify phone number
        </div>

        <div className="mb-[32px] font-Roboto text-[14px] leading-[22px] px-[14px] ">
          <span className="text-white  ">
            Now verify your mobile phone number by adding the 6 digit code we
            sent to&nbsp;
          </span>

          <span className="text-[#00e09d] ">+46 768 030568.&nbsp;</span>
          <span className="underline text-white">Wrong number?</span>
        </div>

        <div className="text-white text-[14px] leading-[22px] mb-2 ">
          Verify code
        </div>

        <OtpInput
          value={otp}
          onChange={(value) => {
            setOtp(value)
          }}
          numInputs={6}
          separator={<span></span>}
          containerStyle="flex space-x-[16px] ml-[-2px] "
          inputStyle="border-[2px] border-[#4654EA]  rounded-[8px] w-[49px] h-[56px] flex justify-center items-center
             text-[28px] font-SVNGilroy "
        />

        <div className="h-[24px] "></div>

        <button
          onClick={() => {
            sendCode(otp)
          }}
          className="bg-Blue flex justify-center items-center text-[14px] leading-[22px] 
        text-white w-full h-[44px] rounded-[8px] mb-[14px]
        "
        >
          Verify code
        </button>

        <div className="h-[1px] bg-Stroke mb-[24px] "></div>

        <Link href="/signin">
          <a className="text-Blue text-[16px] leading-[175%] border-b-[1px] border-Blue ">
            Already having an account?
          </a>
        </Link>
      </div>
    )
  }

  return (
    <div className="autofill2 ">
      {step === 1 ? contentFillInfoSignUpWithPhone() : contentFillOtp()}
    </div>
  )
}
