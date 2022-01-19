import { Button } from 'components'
import { MyInput } from 'components/MyInput'
import { FormEvent, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { atom, useAtom } from 'jotai'
import axios from 'axios'
import { Cookies } from 'react-cookie'
import { MyModal } from 'components/MyModal'

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
  const [values, setValues] = useAtom(valuesAtom)
  const [response, responseSet] = useAtom(responseSiginin)
  const [status, statusSet] = useAtom(statusAtom)
  const cookies = new Cookies()
  const token = cookies.get('token')

  useEffect(() => {
    if (token) {
    }
  }, [token])

  const onChange = (e: any) => {
    const value = e.target.value
    setValues({
      ...values,
      [e.target.name]: value,
    })
    console.log('e', e.target.value)
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const body = {
      email: values.email,
      password: values.password,
      returnSecureToken: values.returnSecureToken,
    }
    try {
      axios
        .post(
          'https://asia-northeast1-zporter-dev.cloudfunctions.net/api/log-in',
          body
        )
        .then((res) => {
          responseSet(res.data)
          statusSet(res.status)
          cookies.set('token', res.data.idToken)
          window.location.href = '/feed'
        })
        .catch(() => {
          alert(
            'Your email or password is invalid. Please try again or reset your password'
          )
        })
    } catch (error) {}
  }
  console.log('email', values.email)

  const handleSignup = () => {
    router.push('/signup')
  }
  const handleResetPassword = () => {
    router.push('/reset-password')
  }

  return (
    <div className="w-full mt-28">
      <div className="w-1/4 m-auto border border-stone-500 rounded-[8px] p-10">
        <form className="" onSubmit={handleSubmit}>
          <p className="text-[24px] text-[#FFFFFF]">Sign in</p>
          <MyInput
            name={'email'}
            label="Email"
            value={values.email}
            className="mt-12"
            onChange={onChange}
          />
          <MyInput
            name={'password'}
            label="Password"
            value={values.password}
            password
            className="mt-8"
            onChange={onChange}
          />
          <div className="mt-8">
            <Button
              submit
              className="h-[48px] bg-[#4654EA] text-[15px] hover:bg-[#5b67f3]"
              text="Sign In"
            />
          </div>
          <div className="mt-2" onClick={handleSignup}>
            <Button
              text="Sign up"
              className="h-[48px] text-[#09E099] border border-[#09E099]"
            />
          </div>
          <div className="mt-2" onClick={handleResetPassword}>
            <Button
              text="Reset password"
              className="h-[48px] text-[#09E099] border border-[#09E099]"
            />
          </div>
        </form>
      </div>
    </div>
  )
}

export default SignIn
