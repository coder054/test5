import * as datefns from 'date-fns'
import dayjs from 'dayjs'
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth'
import { collection, getDocs, getFirestore } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { Layout } from 'src/components/Layout'
import { MyInput } from 'src/components/MyInput'
import { auth } from 'src/config/firebase-client'
import { useAuth } from 'src/modules/authentication/auth/AuthContext'
import { axios } from 'src/utils/axios'
import { StringParam, useQueryParam, withDefault } from 'use-query-params'
import toast from 'react-hot-toast'

const Test = () => {
  const [foo, setFoo] = useQueryParam('foo', withDefault(StringParam, 'email'))

  const [phone, setPhone] = useState('+84355832199')
  const [code, setCode] = useState('')

  const {
    currentUser,
    token,
    errorSignin,
    signin,
    signout,
    SignUpWithEmailAndPassword,
    resetPassword,
  } = useAuth()

  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }

    //@ts-ignore: Unreachable code error
    window.datefns = datefns
    //@ts-ignore: Unreachable code error
    window.dayjs = dayjs

    // init services:
    const db = getFirestore()

    // collection ref:
    const userColRef = collection(db, 'users')

    // get collection data:
    const f1 = async () => {
      try {
        const snapshot = await getDocs(userColRef)
        const users = snapshot.docs.map((doc) => {
          return { ...doc.data(), id: doc.id }
        })
      } catch (err) {}
    }
    // f1()

    //@ts-ignore: Unreachable code error
    // window.recaptchaVerifier = new RecaptchaVerifier(
    //   'capcha-container',
    //   {},
    //   auth
    // )

    window.recaptchaVerifier = new RecaptchaVerifier(
      'sign-in-button',
      {
        size: 'invisible',
        callback: (response) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
          // onSignInSubmit();
          alert(1)
        },
      },
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
      toast.error('Something went wrong')
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
    } catch (error) {
      toast.error('Something went wrong')
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
          id="sign-in-button"
          onClick={sendCode}
          className="bg-green-500 p-4 flex justify-center items-center "
        >
          send code
        </button>
      </div>

      <div className="w-[400px] p-4 ">
        <button
          onClick={signout}
          className="bg-green-500 p-4 flex justify-center items-center "
        >
          sign out
        </button>
      </div>
      <div className="w-[400px] p-4 ">
        <button
          onClick={() => {
            let a1 = axios.defaults.headers
            //@ts-ignore: Unreachable code error
            axios.defaults.headers.roleId = String(Math.random())
          }}
          className="bg-green-500 p-4 flex justify-center items-center "
        >
          update header role id
        </button>
      </div>
      <div className="w-[400px] p-4 ">
        <button
          onClick={async () => {
            await axios.get('https://jsonplaceholder.typicode.com/posts')
          }}
          className="bg-green-500 p-4 flex justify-center items-center "
        >
          call api
        </button>
      </div>

      <div className="w-[400px] p-4 ">
        <button
          onClick={async () => {
            await axios.get('/auth/check-email/austin@zporter.co')
          }}
          className="bg-green-500 p-4 flex justify-center items-center "
        >
          check email austin@zporter.co exist
        </button>
      </div>
      <div className="w-[400px] p-4 ">
        <button
          onClick={async () => {
            const resp = await axios.delete('/users')
          }}
          className="bg-green-500 p-4 flex justify-center items-center "
        >
          delete user
        </button>
      </div>
      <div className="w-[400px] p-4 ">
        <button
          onClick={() => {
            setFoo(String(Math.random()))
          }}
          className="bg-green-500 p-4 flex justify-center items-center "
        >
          set foo
        </button>
      </div>
    </Layout>
  )
}

export default Test
