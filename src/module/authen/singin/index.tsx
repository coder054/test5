import { Button, LogoBigSize } from 'src/components'
import { MyInput } from 'src/components/MyInput'
import { FormEvent, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useAtom } from 'jotai'
import { useAuth } from '../auth/AuthContext'
import { Form, notification } from 'antd'
const cls = require('./signin.module.css')

import { IconWarning, SvgXIcon } from 'src/imports/svgs'
import Link from 'next/link'
import { TabPanel, Tabs } from 'src/components/Tabs'
import { signInWithPhoneNumber, RecaptchaVerifier } from 'firebase/auth'
import OtpInput from 'react-otp-input'
import { get } from 'lodash'
import { auth } from 'src/config/firebase-client'
import { async } from '@firebase/util'
import { axios } from 'src/utils/axios'
import { API_SIGNIN_WITH_USERNAME } from 'src/constants/api.constants'
// import { getCustomToken } from 'src/atoms/signin'

const initialValuesFormEmailSignIn = {
  emailFormEmailSignIn: 'example@zporter.co',
  passwordFormEmailSignIn: 'aA&123456',
}
const initialValuesFormPhoneSignIn = {
  phoneFormPhoneSignIn: '+84355832199',
}

enum Tab {
  Email = 'Email',
  Phone = 'Phone',
  UserName = 'UserName',
}

const tabs = [{ text: Tab.Email }, { text: Tab.Phone }, { text: Tab.UserName }]

const SignIn = () => {
  const router = useRouter()
  const [step, setStep] = useState<1 | 2>(1)
  const [tab, setTab] = useState(Tab.Email)
  const [loading, setLoading] = useState<boolean>(false)
  const [isAuthen, setIsAuthen] = useState<boolean>(false)
  // const [errorSignIn, setErrorSignIn] = useState<boolean>(false)
  const [openModal, setOpenModal] = useState<boolean>(false)

  /// form sign in with email
  const [emailFormEmailSignIn, setEmailFormEmailSignIn] = useState<string>(
    initialValuesFormEmailSignIn.emailFormEmailSignIn
  )
  const [passwordFormEmailSignIn, setPasswordFormEmailSignIn] =
    useState<string>(initialValuesFormEmailSignIn.passwordFormEmailSignIn)

  /// form sign in with phone
  const [phoneFormPhoneSignIn, setPhoneFormPhoneSignIn] = useState<string>(
    initialValuesFormPhoneSignIn.phoneFormPhoneSignIn
  )

  const [userFormUserNameSignIn, setUserFormUserNameSignIn] = useState<string>(
    initialValuesFormEmailSignIn.emailFormEmailSignIn
  )

  const [passFormUserNameSignIn, setPassFormUserNameSignIn] = useState<string>(
    initialValuesFormEmailSignIn.emailFormEmailSignIn
  )

  const [otp, setOtp] = useState<string>('')

  const [formEmail] = Form.useForm()
  const [formPhone] = Form.useForm()

  const { signin, currentUser, errorSignin, SignInCustomToken } = useAuth()

  const handleSubmit = async (e) => {
    try {
      e.preventDefault()
      setLoading(true)
      if (tab === 'Email') {
        await signin(emailFormEmailSignIn, passwordFormEmailSignIn)
      } else if (tab === 'UserName') {
        const response = await axios.post(API_SIGNIN_WITH_USERNAME, {
          username: userFormUserNameSignIn,
          password: passFormUserNameSignIn,
        })
        await SignInCustomToken(response.data.customToken)
      }
      setTimeout(() => {
        setLoading(false)
      }, 1000)
    } catch (error) {
      setTimeout(() => {
        setLoading(false)
      }, 1000)
      notification['error']({
        message: 'Login failed',
        description: '',
      })
    }
  }

  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }

    let el = window.document.querySelectorAll('.ant-form')

    if (!el) {
      return
    }

    let arr = Array.from(el)
    arr.forEach((o) => {
      o.classList.remove('ant-form')
    })

    /// init recapcha
    //@ts-ignore: Unreachable code error
    window.recaptchaVerifier = new RecaptchaVerifier(
      'capcha_element_signin_with_phone',
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
  const handleSignup = () => {
    setOpenModal(true)
  }
  const handleResetPassword = () => {
    router.push('/reset-password')
  }

  const handleCloseModal = () => {
    setOpenModal(false)
  }

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
      notification['success']({
        message: 'Login success',
        description: '',
      })
    } catch (error) {
      // console.log('aaa ', error)
      //@ts-ignore: Unreachable code error
      // console.log('aaa error.message', error.message)
      // console.log('aaa JSON.stringify(error)', JSON.stringify(error))
      //@ts-ignore: Unreachable code error
      console.log('aaa error.code', error.code)
      if (get(error, 'code') === 'auth/invalid-verification-code') {
        notification['error']({
          message: 'Invalid verification code',
          description: '',
        })
      }
    }
  }

  const contentFillInfoSignInWithPhone = () => {
    return (
      <div className="autofill2 w-screen min-h-screen md:flex md:items-center float-left">
        <LogoBigSize className="absolute left-[18%] md:left-2/3 lg:left-[56%] mt-[32px]" />

        <div
          className={`${cls.formSignIn} w-[310px] mobileM:w-[365px] md:w-[450px] lg:w-[470px] rounded-[8px] mx-auto mt-[118px] md:mt-[0px] 
            pt-[16px] md:pt-[48px] pl-[12px] md:pl-[24px] lg:pl-[32px] pr-[12px] md:pr-[24px] lg:pr-[32px] pb-[16px] 
            md:pb-[48px] md:ml-[10%] lg:ml-[8%] xl:ml-[17%]`}
        >
          <div className="w-full text-center">
            <p className="text-[24px] text-[#FFFFFF] font-semibold">Log in</p>
            <p className="mt-[16px] text-[#818389] text-[14px]">
              Sign in on the internal platform
            </p>
          </div>

          <Tabs tab={tab} setTab={setTab} tabs={tabs} />
          <TabPanel visible={tab === Tab.Email}>
            <Form
              className="h-[312px] "
              form={formEmail}
              initialValues={initialValuesFormEmailSignIn}
            >
              <Form.Item
                className="mt-[24px]"
                name={'emailFormEmailSignIn'}
                rules={[
                  {
                    required: true,
                    message: 'Input your email address',
                  },
                  { type: 'email', message: 'Your email is invalid' },
                ]}
              >
                <MyInput
                  name={'emailFormEmailSignIn'}
                  label="Email address"
                  value={emailFormEmailSignIn}
                  onChange={(e) => {
                    setEmailFormEmailSignIn(e.target.value)
                  }}
                />
              </Form.Item>
              <Form.Item
                className="mt-[24px]"
                name={'passwordFormEmailSignIn'}
                rules={[
                  {
                    required: true,
                    message: 'Input your password',
                  },
                  { whitespace: false },
                ]}
              >
                <MyInput
                  name={'passwordFormEmailSignIn'}
                  label="Password"
                  password
                  value={passwordFormEmailSignIn}
                  onChange={(e) => {
                    setPasswordFormEmailSignIn(e.target.value)
                  }}
                />
              </Form.Item>
              <div className="mt-[24px]" onClick={handleSubmit}>
                <Button
                  loading={loading}
                  className="h-[48px] bg-[#4654EA] text-[15px] text-[#FFFFFF] font-semibold hover:bg-[#5b67f3]"
                  text="Log In"
                />
              </div>
              <div
                className={`${cls.divWarning} w-full h-[56px] rounded-[4px] mt-[24px] flex items-center pl-[16px] pr-[16px]`}
              >
                <IconWarning />
                <span className="text-[#FFFFFF] text-[14px] pl-[8px]">
                  Use demo@devias.io and password Password123!
                </span>
              </div>
            </Form>
          </TabPanel>
          <TabPanel visible={tab === Tab.Phone}>
            <button
              id="sign-in-button5"
              className=" w-[200px] h-[50px] fixed right-0 bottom-0 hidden "
            >
              recapcha
            </button>
            <Form
              className="h-[312px] "
              form={formPhone}
              initialValues={initialValuesFormPhoneSignIn}
            >
              <Form.Item
                className="mt-[24px]"
                name={'phoneFormPhoneSignIn'}
                rules={[
                  {
                    required: true,
                    message: 'Required fields must be filled in.',
                    max: 25,
                  },
                ]}
              >
                <MyInput
                  name={'phoneFormPhoneSignIn'}
                  label="Mobile phone number"
                  value={phoneFormPhoneSignIn}
                  onChange={(e) => {
                    setPhoneFormPhoneSignIn(e.target.value)
                  }}
                />
              </Form.Item>
              <div
                className="mt-[24px]"
                onClick={async () => {
                  await sendPhone(phoneFormPhoneSignIn)
                }}
              >
                <Button
                  loading={loading}
                  className="h-[48px] bg-[#4654EA] text-[15px] text-[#FFFFFF] font-semibold hover:bg-[#5b67f3]"
                  text="Log In"
                />
              </div>
              <div
                className={`${cls.divWarning} w-full h-[56px] rounded-[4px] mt-[24px] flex items-center pl-[16px] pr-[16px]`}
              >
                <IconWarning />
                <span className="text-[#FFFFFF] text-[14px] pl-[8px]">
                  Use phone: +84355832199 and otp code: 123456
                </span>
              </div>
            </Form>
          </TabPanel>
          <TabPanel visible={tab === Tab.UserName}>
            <Form
              className="h-[312px] "
              form={formEmail}
              initialValues={initialValuesFormEmailSignIn}
            >
              <Form.Item
                className="mt-[24px]"
                name={'userFormUserNameSignIn'}
                rules={[
                  {
                    required: true,
                    message: 'Input your user name',
                  },
                ]}
              >
                <MyInput
                  name={'userFormUserNameSignIn'}
                  label="Email address"
                  value={userFormUserNameSignIn}
                  onChange={(e) => {
                    setUserFormUserNameSignIn(e.target.value)
                  }}
                />
              </Form.Item>
              <Form.Item
                className="mt-[24px]"
                name={'passFormUserNameSignIn'}
                rules={[
                  {
                    required: true,
                    message: 'Input your password',
                  },
                  { whitespace: false },
                ]}
              >
                <MyInput
                  name={'passFormUserNameSignIn'}
                  label="Password"
                  password
                  value={passFormUserNameSignIn}
                  onChange={(e) => {
                    setPassFormUserNameSignIn(e.target.value)
                  }}
                />
              </Form.Item>
              <div className="mt-[24px]" onClick={handleSubmit}>
                <Button
                  loading={loading}
                  className="h-[48px] bg-[#4654EA] text-[15px] text-[#FFFFFF] font-semibold hover:bg-[#5b67f3]"
                  text="Log In"
                />
              </div>
              <div
                className={`${cls.divWarning} w-full h-[56px] rounded-[4px] mt-[24px] flex items-center pl-[16px] pr-[16px]`}
              >
                <IconWarning />
                <span className="text-[#FFFFFF] text-[14px] pl-[8px]">
                  Use demo@devias.io and password Password123!
                </span>
              </div>
            </Form>
          </TabPanel>

          <div className="bg-[#818389] w-full h-[1px] mt-[24px]"></div>
          <div className="mt-[24px]">
            <Link href="/signup">
              <a className="text-Blue text-[16px] leading-[175%] hover:text-[#2b3cec] pr-[16px] hover:underline cursor-pointer">
                Create account
              </a>
            </Link>
            <Link href={'/reset-password'}>
              <a
                onClick={handleResetPassword}
                className="text-[#4654EA] hover:text-[#2b3cec] text-base hover:underline"
              >
                Forgot password
              </a>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const contentFillOtp = () => {
    return (
      <div className="w-full absolute">
        <div
          className="w-[320px] md:w-[372px] mx-auto
                  min-h-[412px]
                  mt-[120px] sm:mt-[120px] md:mt-[120px] lg:mt-[120px] xl:mt-[150px] 2xl:mt-[200px]"
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

            <span className="text-[#00e09d] ">
              {phoneFormPhoneSignIn}.&nbsp;
            </span>
            <span className="underline text-white">Wrong number?</span>
          </div>

          <div className="w-[300px] md:w-[372px] mx-auto">
            <div className="text-white text-[12px] md:text-[14px] leading-[18px] md:leading-[22px] mb-1.5 md:mb-2 ">
              Verify code
            </div>

            <OtpInput
              value={otp}
              onChange={(value) => {
                setOtp(value)
              }}
              numInputs={6}
              separator={<span></span>}
              containerStyle="flex space-x-[6px] md:space-x-[16px] ml-[-2px] "
              inputStyle="border-[1px] md:border-[2px] border-[#4654EA] rounded-[8px] w-[45px] md:w-[49px] h-[51px] md:h-[56px] flex justify-center items-center
              text-[24px] md:text-[28px] font-SVNGilroy text-black"
              isInputNum
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

            {/* <Link href="/signin"> */}
            <a
              className="text-Blue text-[16px] leading-[175%] border-b-[1px] border-Blue "
              onClick={() => {
                setStep(1)
              }}
            >
              Already having an account?
            </a>
            {/* </Link> */}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="autofill2">
      {step === 1 ? contentFillInfoSignInWithPhone() : contentFillOtp()}
      <div id="capcha_element_signin_with_phone"></div>
    </div>
  )
}

export default SignIn
