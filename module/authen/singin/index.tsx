import { Button, LogoBigSize } from 'components'
import { MyInput } from 'components/MyInput'
import { FormEvent, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { atom, useAtom } from 'jotai'
import { MyModal } from 'components/MyModal'
import { useAuth } from '../auth/AuthContext'
import { Form, notification } from 'antd'
import cls from './signin.module.css'
import { IconWarning, SvgXIcon } from 'imports/svgs'
import Link from 'next/link'

const valuesAtom = atom({
  email: '',
  password: '',
  returnSecureToken: false,
})
const responseSiginin = atom({
  kind: '',
  localId: '',
  email: '',
  displayName: '',
  idToken: '',
  registered: false,
  refreshToken: '',
  expiresIn: '',
})

const SignIn = () => {
  const router = useRouter()
  const [loading, setLoading] = useState<boolean>(false)
  const [isAuthen, setIsAuthen] = useState<boolean>(false)
  // const [errorSignIn, setErrorSignIn] = useState<boolean>(false)
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [form] = Form.useForm()

  const { signin, currentUser, errorSignin } = useAuth()

  // useEffect(() => {
  //   if (currentUser?.accessToken) {
  //     router.push('/feed')
  //   }
  // }, [currentUser?.accessToken])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const submitForm = await form.validateFields()
    setLoading(true)
    await signin(submitForm.email, submitForm.password)
    setTimeout(() => {
      setLoading(false)
    }, 1000)
  }

  // const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
  //   e.preventDefault()
  //   const body = {
  //     email: values.email,
  //     password: values.password,
  //     returnSecureToken: values.returnSecureToken,
  //   }
  //   try {
  //     axios
  //       .post(
  //         'https://asia-northeast1-zporter-dev.cloudfunctions.net/api/log-in',
  //         body
  //       )
  //       .then((res) => {
  //         responseSet(res.data)
  //         statusSet(res.status)
  //         cookies.set('token', res.data.idToken)
  //         window.location.href = '/feed'
  //       })
  //       .catch(() => {
  //         alert(
  //           'Your email or password is invalid. Please try again or reset your password'
  //         )
  //       })
  //   } catch (error) {}
  // }

  const handleSignup = () => {
    setOpenModal(true)
  }
  const handleResetPassword = () => {
    router.push('/reset-password')
  }

  const handleCloseModal = () => {
    setOpenModal(false)
  }

  return (
    <div className="w-screen h-screen flex items-center">
      <div
        className={`${cls.formSignIn} w-[470px] rounded-[8px] pt-[48px] pl-[32px] pr-[32px] pb-[48px] ml-[17%]`}
      >
        <Form className="" form={form}>
          <div className="w-full text-center">
            <p className="text-[24px] text-[#FFFFFF] font-semibold">Log in</p>
            <p className="mt-[16px] text-[#818389] text-[14px]">
              Sign in on the internal platform Copy
            </p>
          </div>
          <Form.Item
            className="mt-[24px]"
            name={'email'}
            rules={[
              {
                required: true,
                message: 'Input your email address',
              },
              { type: 'email', message: 'Your email is invalid' },
            ]}
          >
            <MyInput name={'email'} label="Email address" />
          </Form.Item>
          <Form.Item
            className="mt-[24px]"
            name={'password'}
            rules={[
              {
                required: true,
                message: 'Input your password',
              },
            ]}
          >
            <MyInput name={'password'} label="Password" password />
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
          <div className="bg-[#818389] w-full h-[1px] mt-[24px]"></div>
          <div className="mt-[24px]">
            <span
              onClick={handleSignup}
              className="text-base text-[#4654EA] hover:text-[#2b3cec] pr-[16px] hover:underline cursor-pointer"
            >
              Create account
            </span>
            <Link href={'/reset-password'}>
              <a
                onClick={handleResetPassword}
                className="text-[#4654EA] hover:text-[#2b3cec] text-base hover:underline"
              >
                Forgot password
              </a>
            </Link>
          </div>
        </Form>
      </div>
      <LogoBigSize />
      <MyModal show={openModal} width={412} setShow={setOpenModal}>
        <div
          className={`${cls.modal} bg-[#1E1F24] pt-[42.8px] pr-[44.8px] pl-[44.8px] pb-[44.8px] rounded-[4px] float-left`}
        >
          <div className="float-right" onClick={handleCloseModal}>
            <SvgXIcon className={''} />
          </div>
          <p className="float-left text-[18px] font-semibold text-[#FFFFFF] mt-[20.8px] mb-[32px]">
            By signing up, you agree to Zporters Terms & Conditions and Privacy
            Rules
          </p>
          <Button
            className={`${cls.signupWith} w-full h-[48px]`}
            text="SIGN UP with SMS"
            onClick={() => {
              router.push('/signup-with-sms')
            }}
          />
          <Button
            className={`${cls.signupWith} w-full h-[48px]`}
            text="SIGN UP with Email"
            onClick={() => {
              router.push('/signup-with-email')
            }}
          />
          <Button
            className={`${cls.signupWith} w-full h-[48px]`}
            text="SIGN UP with Google"
          />
          <Button
            className={`${cls.signupWith} w-full h-[48px]`}
            text="SIGN UP with Facebook"
          />
          <Button
            className={`${cls.signupWith} w-full h-[48px]`}
            text="SIGN UP with Apple"
          />
        </div>
      </MyModal>
    </div>
  )
}

export default SignIn
