import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Divider,
  TextField,
  Typography,
} from '@mui/material'
import { notification } from 'antd'
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth'
import { get } from 'lodash'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import OtpInput from 'react-otp-input'
import { TabPanel, Tabs } from 'src/components/Tabs'
import { auth } from 'src/config/firebase-client'
import { API_SIGNIN_WITH_USERNAME } from 'src/constants/api.constants'
import { axios } from 'src/utils/axios'
import { useAuth } from '../auth/AuthContext'
const cls = require('./signin.module.css')

const initialValuesFormEmailSignIn = {
  emailFormEmailSignIn: '',
  passwordFormEmailSignIn: '',
}
const initialValuesFormPhoneSignIn = {
  phoneFormPhoneSignIn: '',
}

enum Tab {
  Email = 'Email',
  SMS = 'SMS',
  UserName = 'UserName',
}

const tabs = [{ text: Tab.Email }, { text: Tab.SMS }, { text: Tab.UserName }]

const SignIn = () => {
  const router = useRouter()
  const [step, setStep] = useState<1 | 2>(1)
  const [tab, setTab] = useState(Tab.Email)
  const [loading, setLoading] = useState<boolean>(false)

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

  const { signin, updateUserRoles, SignInCustomToken } = useAuth()

  useEffect(() => {
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
      // console.log('aaa error.code', error.code)
      if (get(error, 'code') === 'auth/invalid-verification-code') {
        notification['error']({
          message: 'Invalid verification code',
          description: '',
        })
      }
    }
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
    <div className=" absolute inset-0 p-[16px] bg-authen-mobile xl:bg-authen-desktop w-full bg-cover bg-no-repeat bg-center ">
      {step === 1 ? (
        <div className=" flex w-full  h-[100%]  ">
          <div className="w-full xl:w-[50%] flex justify-center items-center  ">
            <Container maxWidth="sm">
              <Card>
                <CardContent
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    minHeight: 400,
                    p: 4,
                  }}
                >
                  <div className="flex items-center">
                    <div>
                      <Typography variant="h4">Log in</Typography>
                      <Typography
                        color="textSecondary"
                        sx={{ mt: 1 }}
                        variant="body2"
                      >
                        Log in on the internal platform
                      </Typography>
                    </div>
                    <div className="grow "></div>
                    <img
                      alt="Zporter"
                      src="/zporter.png"
                      className="w-[150px] h-[34px] cursor-pointer  "
                    />
                  </div>

                  <div className="h-[20px] "></div>
                  <Tabs
                    className="mb-0"
                    tab={tab}
                    setTab={setTab}
                    tabs={tabs}
                  />

                  <TabPanel visible={tab === Tab.Email}>
                    <Box
                      sx={{
                        flexGrow: 1,
                        mt: 1,
                      }}
                    >
                      <FormEmailLogin />
                    </Box>
                  </TabPanel>

                  <TabPanel visible={tab === Tab.SMS}>
                    <Box
                      sx={{
                        flexGrow: 1,
                        mt: 1,
                      }}
                    >
                      <FormSMSLogin />
                    </Box>
                  </TabPanel>
                  <TabPanel visible={tab === Tab.UserName}>
                    <Box
                      sx={{
                        flexGrow: 1,
                        mt: 1,
                      }}
                    >
                      <FormUsernameLogin />
                    </Box>
                  </TabPanel>

                  <Divider sx={{ my: 3 }} />
                  <Link href="/signup">
                    <a className="text-DefaultTextColor hover:underline  ">
                      Create new account
                    </a>
                  </Link>

                  <Link href="/reset-password">
                    <a className="text-DefaultTextColor hover:underline  ">
                      Forgot Password?
                    </a>
                  </Link>
                </CardContent>
              </Card>
            </Container>
          </div>
        </div>
      ) : (
        contentFillOtp()
      )}

      <div id="capcha_element_signin_with_phone"></div>
    </div>
  )
}

export default SignIn

const FormEmailLogin = () => {
  const { signin, updateUserRoles, SignInCustomToken } = useAuth()
  const [email, setEmail] = useState('')
  const [pass, setPass] = useState('')

  const handleLoginEmail = async (e) => {
    e.preventDefault()
    try {
      await signin(email, pass)
    } catch (error) {
      notification['error']({
        message: 'Login failed',
        description: '',
      })
    }
  }

  return (
    <form onSubmit={handleLoginEmail}>
      <TextField
        value={email}
        onChange={(e) => {
          setEmail(e.target.value)
        }}
        fullWidth
        label="Email Address"
        margin="normal"
        name="email"
        type="email"
      />
      <TextField
        fullWidth
        value={pass}
        onChange={(e) => {
          setPass(e.target.value)
        }}
        label="Password"
        margin="normal"
        name="password"
        type="password"
      />
      <Box sx={{ mt: 2 }}>
        <Button fullWidth size="large" type="submit" variant="contained">
          Log In
        </Button>
      </Box>
    </form>
  )
}

const FormSMSLogin = () => {
  const [phone, setPhone] = useState('')

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
    } catch (error) {}
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
      }}
    >
      <button
        id="sign-in-button5"
        className=" w-[200px] h-[50px] fixed right-0 bottom-0 hidden "
      >
        recapcha
      </button>
      <TextField
        value={phone}
        onChange={(e) => {
          setPhone(e.target.value)
        }}
        fullWidth
        label="Phone"
        margin="normal"
        name="phone"
        type="text"
      />
      <Box sx={{ mt: 2 }}>
        <Button
          onClick={async (e) => {
            e.preventDefault()
            await sendPhone(phone)
          }}
          fullWidth
          size="large"
          type="submit"
          variant="contained"
        >
          Log In
        </Button>
      </Box>
    </form>
  )
}

const FormUsernameLogin = () => {
  const { SignInCustomToken } = useAuth()
  const [username, setUsername] = useState('')
  const [pass, setPass] = useState('')

  const handleLoginUsername = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post(API_SIGNIN_WITH_USERNAME, {
        username: username,
        password: pass,
      })
      await SignInCustomToken(response.data.customToken)
    } catch (error) {
      notification['error']({
        message: 'Login failed',
        description: '',
      })
    }
  }

  return (
    <form onSubmit={handleLoginUsername}>
      <TextField
        value={username}
        onChange={(e) => {
          setUsername(e.target.value)
        }}
        fullWidth
        label="Username"
        margin="normal"
        name="username"
        type="text"
      />
      <TextField
        fullWidth
        value={pass}
        onChange={(e) => {
          setPass(e.target.value)
        }}
        label="Password"
        margin="normal"
        name="password2"
        type="password"
      />
      <Box sx={{ mt: 2 }}>
        <Button fullWidth size="large" type="submit" variant="contained">
          Log In
        </Button>
      </Box>
    </form>
  )
}
