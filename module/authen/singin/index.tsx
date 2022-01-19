import { Button } from 'components'
import { MyInput } from 'components/MyInput'
import { FormEvent, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { atom, useAtom } from 'jotai'
import { MyModal } from 'components/MyModal'
import { useAuth } from '../auth/AuthContext'
import { Form } from 'antd'
import cls from './signin.module.css'
import { IconWarning } from 'imports/svgs'
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
const statusAtom = atom(0)

const SignIn = () => {
  const router = useRouter()
  const [status, statusSet] = useAtom(statusAtom)
  const [loading, setLoading] = useState<boolean>(false)
  const [isAuthen, setIsAuthen] = useState<boolean>(false)
  const [errorSignIn, setErrorSignIn] = useState<string>('')
  const [form] = Form.useForm()

  const { signin, currentUser, token } = useAuth()

  useEffect(() => {
    if (currentUser?.accessToken) {
      router.push('/feed')
    }
  }, [currentUser?.accessToken])

  useEffect(() => {
    if (token) {
    }
  }, [token])
  console.log('token', token)

  const handleSubmit = async (e) => {
    e.preventDefault()
    const submitForm = await form.validateFields()
    try {
      await signin(submitForm.email, submitForm.password)
      setLoading(false)
    } catch (error: any) {
      console.log('err', error.code)

      setErrorSignIn(
        'your email or password is invalid. Please try again or reset your password.'
      )
    }
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
    router.push('/signup')
  }
  const handleResetPassword = () => {
    router.push('/reset-password')
  }

  return (
    <div className="w-full mt-28">
      <div
        className={`${cls.formSignIn} w-[470px] m-auto border border-stone-500 rounded-[8px] pt-[48px] pl-[32px] pr-[32px] pb-[48px]`}
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
                message: 'Please input your username!',
              },
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
                message: 'Please input your username!',
              },
            ]}
          >
            <MyInput name={'password'} label="Password" password />
          </Form.Item>
          {/* {errorSignIn && <p className="text-[#FFFFFF]">{errorSignIn}</p>} */}
          <div className="mt-[24px]" onClick={handleSubmit}>
            <Button
              className="h-[48px] bg-[#4654EA] text-[15px] text-[#FFFFFF] font-semibold hover:bg-[#5b67f3]"
              text="Log In"
            />
          </div>
          <div
            className={`${cls.div} w-full h-[56px] rounded-[4px] mt-[24px] flex items-center pl-[16px] pr-[16px]`}
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
    </div>
  )
}

export default SignIn
