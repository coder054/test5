import { Form, notification } from 'antd'
import {
  RecaptchaVerifier,
  signInWithPhoneNumber,
  updateEmail,
  updatePassword,
} from 'firebase/auth'
import { get } from 'lodash'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { SetStateAction, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import OtpInput from 'react-otp-input'
import { Button, LogoBigSize } from 'src/components'
import { MyCheckbox } from 'src/components/common/MyCheckbox'
import { GoBack } from 'src/components/go-back'
import { MyInput } from 'src/components/MyInput'
import { TabPanel, Tabs } from 'src/components/Tabs'
import { auth } from 'src/config/firebase-client'
import { ROUTES } from 'src/constants/constants'
import { axios } from 'src/utils/axios'
import { StringParam, useQueryParam, withDefault } from 'use-query-params'
import { useAuth } from '../auth/AuthContext'

const initialValuesPhoneSignUp = {
  phoneFormPhoneSignUp: '',
  emailFormPhoneSignUp: '',
  passwordFormPhoneSignUp: '',
  confirmPasswordFormPhoneSignUp: '',
}

const initialValuesEmailSignUp = {
  emailFormEmailSignUp: '',
  passwordFormEmailSignUp: '',
  confirmPasswordFormEmailSignUp: '',
}

enum Tab {
  SMS = 'SMS',
  Email = 'Email',
  Google = 'Google',
  Facebook = 'Facebook',
  Apple = 'Apple',
}

const tabs = [
  { text: Tab.SMS },
  { text: Tab.Email },
  { text: Tab.Google },
  { text: Tab.Facebook },
  { text: Tab.Apple },
]

export const SignUp = () => {
  const router = useRouter()
  const [tab, setTab] = useQueryParam('type', withDefault(StringParam, Tab.SMS))
  const [step, setStep] = useState<1 | 2>(1)

  const [loading, setLoading] = useState<boolean>(false)

  const [openModal, setOpenModal] = useState<boolean>(false)

  /// form sign up with phone
  const [otp, setOtp] = useState<string>('')
  const [phoneFormPhoneSignUp, setPhoneFormPhoneSignUp] = useState<string>(
    initialValuesPhoneSignUp.phoneFormPhoneSignUp
  )
  const [emailFormPhoneSignUp, setEmailFormPhoneSignUp] = useState<string>(
    initialValuesPhoneSignUp.emailFormPhoneSignUp
  )
  const [passwordFormPhoneSignUp, setPasswordFormPhoneSignUp] =
    useState<string>(initialValuesPhoneSignUp.passwordFormPhoneSignUp)
  const [confirmPasswordFormPhoneSignUp, setConfirmPasswordFormPhoneSignUp] =
    useState<string>(initialValuesPhoneSignUp.confirmPasswordFormPhoneSignUp)

  const [checkedFormPhoneSignUp, setCheckedFormPhoneSignUp] =
    useState<boolean>(true)

  /// form sign up with email
  const [emailFormEmailSignUp, setEmailFormEmailSignUp] = useState<string>(
    initialValuesEmailSignUp.emailFormEmailSignUp
  )
  const [passwordFormEmailSignUp, setPasswordFormEmailSignUp] =
    useState<string>(initialValuesEmailSignUp.passwordFormEmailSignUp)
  const [confirmPasswordFormEmailSignUp, setConfirmPasswordFormEmailSignUp] =
    useState<string>(initialValuesEmailSignUp.confirmPasswordFormEmailSignUp)

  const [checkedFormEmailSignUp, setCheckedFormEmailSignUp] =
    useState<boolean>(true)

  const { SignUpWithEmailAndPassword } = useAuth()

  const [formEmail] = Form.useForm()
  const [formPhone] = Form.useForm()

  const { token } = useAuth()

  useEffect(() => {
    if (token) {
      router.push(ROUTES.UPDATE_PROFILE)
    }
  }, [router, token])

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
      toast.error('An error has occurred')
    }
  }

  const sendCode = async (code: string, email: string, password: string) => {
    if (typeof window === 'undefined') {
      return
    }

    try {
      //@ts-ignore: Unreachable code error
      const result = await window.confirmationResult.confirm(code)
      const user = result.user
      updateEmail(user, email)
      updatePassword(user, password)
    } catch (error) {
      toast.error('An error has occurred')
    }
  }

  const handleSignUpEmail = async (e: any) => {
    e.preventDefault()
    const submitForm = await formEmail.validateFields()

    if (!checkedFormEmailSignUp) {
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

    await SignUpWithEmailAndPassword(
      emailFormEmailSignUp,
      passwordFormEmailSignUp.replace(/\s/g, '')
    )
    setTimeout(() => {
      setLoading(false)
    }, 1000)
  }

  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }

    /// fix conflict css
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
      'capcha_element_signup_with_phone',
      {
        size: 'invisible',
        callback: (response: any) => {
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
      <div className="autofill2 w-screen h-screen md:flex md:items-center float-left">
        <div className="absolute top-[10px] md:top-[18px] lg:top-[24px] left-[32px] md:left-[40px]">
          <GoBack label="Sign up with SMS" goBack="/signin" />
        </div>
        <LogoBigSize className="absolute left-[18%] md:left-[68%] lg:left-[56%] mt-[42px]" />
        <div className="w-full h-full flex items-center">
          <div
            style={{
              boxShadow: `0px 4px 4px rgba(0, 0, 0, 0.25),
  0px 4px 6px -2px rgba(27, 28, 30, 0.05)`,
              backdropFilter: 'blur(68px)',
            }}
            className={`w-[310px] mobileM:w-[365px] md:w-[450px] lg:w-[470px] rounded-[8px] mt-[78px] md:mt-[0px] pt-[16px] md:pt-[48px] pl-[12px] mx-auto 
              md:pl-[24px] lg:pl-[32px] pr-[12px] md:pr-[24px] lg:pr-[32px] pb-[16px] md:pb-[48px] md:ml-[5%] 
              lg:ml-[8%] xl:ml-[17%] bg-[#ffffff19]`}
          >
            <p className="text-[24px] text-[#FFFFFF] text-center">Sign up</p>
            <p className="text-[14px] text-[#818389] mt-[16px] text-center">
              Register on the internal platform
            </p>
            <Tabs tab={tab} setTab={setTab} tabs={tabs} />
            <TabPanel visible={tab === Tab.SMS}>
              {/* // begin form sign up with phone */}
              <Form
                name={`form-${String(Math.random())}`}
                autoComplete="none"
                className=""
                form={formPhone}
                initialValues={initialValuesPhoneSignUp}
                onFinish={async (values: any) => {
                  if (typeof window === 'undefined') {
                    return
                  }
                  try {
                    const resp = await axios.get(
                      '/auth/check-email/' + emailFormPhoneSignUp
                    )
                    if (get(resp, 'data.emailExists')) {
                      notification['error']({
                        message: 'Failed',
                        description: 'Email already existed',
                      })
                      return
                    }

                    const respPhone = await axios.get(
                      '/auth/check-phone/' + phoneFormPhoneSignUp
                    )
                    if (get(respPhone, 'data.phoneExists')) {
                      toast.error('Phone already exists')
                      return
                    }

                    await sendPhone(phoneFormPhoneSignUp)
                  } catch (error) {
                    toast.error('An error has occurred')
                  }
                }}
                onFinishFailed={(errorInfo: any) => {
                  toast.error('An error has occurred')
                  return
                }}
              >
                <Form.Item
                  className="mt-[24px]"
                  name={'phoneFormPhoneSignUp'}
                  rules={[
                    {
                      required: true,
                      message: 'Required fields must be filled in.',
                      max: 25,
                    },
                  ]}
                >
                  <MyInput
                    name={'phoneFormPhoneSignUp'}
                    label="Mobile phone number"
                    value={phoneFormPhoneSignUp}
                    onChange={(e: {
                      target: { value: SetStateAction<string> }
                    }) => {
                      setPhoneFormPhoneSignUp(e.target.value)
                    }}
                  />
                </Form.Item>

                <Form.Item
                  className="mt-[24px]"
                  name={'emailFormPhoneSignUp'}
                  rules={[
                    {
                      required: true,
                      message: 'Required fields must be filled in.',
                      max: 255,
                    },
                    { type: 'email', message: 'Email is wrong format.' },
                  ]}
                >
                  <MyInput
                    fullWidth
                    name={'emailFormPhoneSignUp'}
                    label="Email"
                    value={emailFormPhoneSignUp}
                    onChange={(e: {
                      target: { value: SetStateAction<string> }
                    }) => {
                      setEmailFormPhoneSignUp(e.target.value)
                    }}
                  />
                </Form.Item>

                <Form.Item
                  className="mt-[24px]"
                  name={'passwordFormPhoneSignUp'}
                  rules={[
                    {
                      required: true,
                      message: 'Required fields must be filled in.',
                      max: 255,
                    },
                    {
                      min: 8,
                      message: 'Your password must be more than 8 characters',
                    },
                  ]}
                >
                  <MyInput
                    name={'passwordFormPhoneSignUp'}
                    label="Choose password (+8 signs)"
                    password
                    value={passwordFormPhoneSignUp}
                    onChange={(e: {
                      target: { value: SetStateAction<string> }
                    }) => {
                      setPasswordFormPhoneSignUp(e.target.value)
                    }}
                  />
                </Form.Item>

                <Form.Item
                  className="mt-[24px]"
                  name={'confirmPasswordFormPhoneSignUp'}
                  rules={[
                    {
                      required: true,
                      message: 'Required fields must be filled in.',
                    },
                    ({ getFieldValue }) => ({
                      validator(rule, value) {
                        if (
                          !value ||
                          getFieldValue('passwordFormPhoneSignUp') === value
                        ) {
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
                    name={'confirmPasswordFormPhoneSignUp'}
                    label="Repeat Password"
                    password
                    value={confirmPasswordFormPhoneSignUp}
                    onChange={(e: {
                      target: { value: SetStateAction<string> }
                    }) => {
                      setConfirmPasswordFormPhoneSignUp(e.target.value)
                    }}
                  />
                </Form.Item>
                <div className="w-full">
                  <MyCheckbox
                    label={''}
                    checked={checkedFormPhoneSignUp}
                    onChange={() => {
                      setCheckedFormPhoneSignUp(!checkedFormPhoneSignUp)
                    }}
                  />
                  <span className="text-[#4654EA] text-sm underline">
                    Terms & Conditions, Privacy Rules{' '}
                  </span>
                  <span className="text-base text-[#FFFFFF] ml-[2px]">
                    approved
                  </span>
                </div>
                <div className="w-full mt-[22px]" onClick={() => {}}>
                  <Button
                    loading={loading}
                    htmlType="submit"
                    submit
                    text="Register2"
                    className="sign-in-button h-[48px] font-semibold text-[15px] text-[#FFFFFF] bg-[#4654EA] hover:bg-[#6d78f3]"
                  />

                  {/* <ButtonAnt type="primary" htmlType="submit">
                Submit
              </ButtonAnt> */}
                </div>
              </Form>
              {/* // end form sign up with phone */}
            </TabPanel>
            <TabPanel visible={tab === Tab.Email}>
              <div className="min-h-[432px] ">
                <Form
                  name={`form-${String(Math.random())}`}
                  autoComplete="none"
                  className=""
                  form={formEmail}
                  initialValues={initialValuesEmailSignUp}
                  onFinish={async (values: any) => {}}
                  onFinishFailed={(errorInfo: any) => {
                    toast.error('Your input is not valid')
                    return
                  }}
                >
                  <Form.Item
                    className="mt-[24px]"
                    name={'emailFormEmailSignUp'}
                    rules={[
                      {
                        required: true,
                        message: 'Required fields must be filled in.',
                        max: 255,
                      },
                      { type: 'email', message: 'Email is wrong format.' },
                    ]}
                  >
                    <MyInput
                      name={'emailFormEmailSignUp'}
                      label="Email"
                      value={emailFormEmailSignUp}
                      onChange={(e: {
                        target: { value: SetStateAction<string> }
                      }) => {
                        setEmailFormEmailSignUp(e.target.value)
                      }}
                    />
                  </Form.Item>

                  <Form.Item
                    className="mt-[24px]"
                    name={'passwordFormEmailSignUp'}
                    rules={[
                      {
                        required: true,
                        message: 'Required fields must be filled in.',
                        max: 255,
                      },
                      {
                        min: 8,
                        message: 'Your password must be more than 8 characters',
                      },
                      {
                        whitespace: true,
                        message: 'Your password must not contain white spaces',
                      },
                    ]}
                  >
                    <MyInput
                      name={'passwordFormEmailSignUp'}
                      label="Choose password (+8 signs)"
                      password
                      value={passwordFormEmailSignUp}
                      onChange={(e: {
                        target: { value: SetStateAction<string> }
                      }) => {
                        setPasswordFormEmailSignUp(e.target.value)
                      }}
                    />
                  </Form.Item>

                  <Form.Item
                    className="mt-[24px]"
                    name={'confirmPasswordFormEmailSignUp'}
                    rules={[
                      {
                        required: true,
                        message: 'Required fields must be filled in.',
                      },
                      ({ getFieldValue }) => ({
                        validator(rule, value) {
                          if (
                            !value ||
                            getFieldValue('passwordFormEmailSignUp') === value
                          ) {
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
                      name={'confirmPasswordFormEmailSignUp'}
                      label="Repeat Password"
                      password
                      value={confirmPasswordFormEmailSignUp}
                      onChange={(e: {
                        target: { value: SetStateAction<string> }
                      }) => {
                        setConfirmPasswordFormEmailSignUp(e.target.value)
                      }}
                    />
                  </Form.Item>
                  <div className="w-full">
                    <MyCheckbox
                      label={''}
                      checked={checkedFormEmailSignUp}
                      onChange={() => {
                        setCheckedFormEmailSignUp(!checkedFormEmailSignUp)
                      }}
                    />
                    <span className="text-[#4654EA] text-sm underline">
                      Terms & Conditions, Privacy Rules{' '}
                    </span>
                    <span className="text-base text-[#FFFFFF] ml-[2px]">
                      approved
                    </span>
                  </div>
                  <div className="w-full mt-[22px]" onClick={handleSignUpEmail}>
                    <Button
                      htmlType="submit"
                      submit
                      text="Register3"
                      className="sign-in-button h-[48px] font-semibold text-[15px] text-[#FFFFFF] bg-[#4654EA] hover:bg-[#6d78f3]"
                    />

                    {/* <ButtonAnt type="primary" htmlType="submit">
                Submit
              </ButtonAnt> */}
                  </div>
                </Form>
              </div>
            </TabPanel>
            <TabPanel visible={tab === Tab.Google}>
              <div className="min-h-[432px] "></div>
            </TabPanel>
            <TabPanel visible={tab === Tab.Facebook}>
              <div className="min-h-[432px] "></div>
            </TabPanel>
            <TabPanel visible={tab === Tab.Apple}>
              <div className="min-h-[432px] "></div>
            </TabPanel>

            <div className="w-full h-[1px] bg-[#818389] mt-[24px]"></div>

            <Link href="/signin">
              <a className="text-[#4654EA] underline mt-[24px] block cursor-pointer">
                Already have an account?
              </a>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const contentFillOtp = () => {
    return (
      <div className="absolute w-full">
        <div
          className="w-[320px] md:w-[372px] mx-auto
                  min-h-[412px]
                  mt-[120px] sm:mt-[120px] md:mt-[120px] lg:mt-[120px] xl:mt-[150px] 2xl:mt-[200px]
                  "
        >
          <img src={'/sidebar/logo.svg'} className="mx-auto mb-[32px]" alt="" />
          <div
            className="text-white text-center font-SVNGilroy text-[18px] md:text-[24px] leading-[137%] 
        mb-2"
          >
            Verify phone number
          </div>

          <div className="mb-[32px] font-Roboto text-[12px] md:text-[14px] leading-[22px] px-[14px] ">
            <span className="text-white  ">
              Now verify your mobile phone number by adding the 6 digit code we
              sent to&nbsp;
            </span>

            <span className="text-[#00e09d] ">
              {phoneFormPhoneSignUp}.&nbsp;
            </span>
            <span className="underline text-white">Wrong number?</span>
          </div>

          <div className="w-[300px] md:w-[372px] mx-auto">
            <div className="text-white text-[12px] md:text-[14px] leading-[18px] md:leading-[22px] mb-1.5 md:mb-2 ">
              Verify code
            </div>
            <OtpInput
              value={otp}
              onChange={(value: SetStateAction<string>) => {
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
                sendCode(otp, emailFormPhoneSignUp, passwordFormPhoneSignUp)
              }}
              className="bg-Blue flex justify-center items-center text-[13px] md:text-[14px] leading-[22px] 
              text-white w-full h-[44px] rounded-[8px] mb-[14px]"
            >
              Verify code
            </button>

            <div className="h-[1px] bg-Stroke mb-[24px] "></div>
            {/* <Link href="/signin"> */}
            <a
              className="text-Blue text-[14px] md:text-[16px] leading-[175%] border-b-[1px] border-Blue"
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
    <div className="autofill2 ">
      {step === 1 ? contentFillInfoSignUpWithPhone() : contentFillOtp()}

      <button
        id="capcha_element_signup_with_phone"
        className=" w-[200px] h-[50px] fixed right-0 bottom-0 hidden "
      >
        recapcha
      </button>
    </div>
  )
}
