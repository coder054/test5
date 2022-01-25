import { Layout } from 'components/Layout'
import { MyInput } from 'components/MyInput'
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from 'firebase/auth'
import { useEffect, useState } from 'react'

const auth = getAuth()

const Test = () => {
  const [phone, setPhone] = useState('+84931876194')
  const [code, setCode] = useState('')

  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }

    //@ts-ignore: Unreachable code error
    window.recaptchaVerifier = new RecaptchaVerifier(
      'capcha-container',
      {},
      auth
    )
  }, [])

  const sendPhone = async () => {
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

  const sendCode = async () => {
    if (typeof window === 'undefined') {
      return
    }

    try {
      //@ts-ignore: Unreachable code error
      const result = await window.confirmationResult.confirm(code)
      const user = result.user
      console.log('user: ', user)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Layout title="Zporter">
      <div className="" id="capcha-container"></div>

      <div className="w-[400px] p-4 ">
        <MyInput
          label={'Phone'}
          value={phone}
          onChange={(e) => {
            setPhone(e.target.value)
          }}
        />
        <button
          onClick={sendPhone}
          className="bg-green-500 p-4 flex justify-center items-center "
        >
          send phone
        </button>
      </div>

      <div className="w-[400px] p-4  ">
        <MyInput
          label={'Code'}
          value={code}
          onChange={(e) => {
            setCode(e.target.value)
          }}
        />
        <button
          onClick={sendCode}
          className="bg-green-500 p-4 flex justify-center items-center "
        >
          send code
        </button>
      </div>
    </Layout>
  )
}

export default Test
