import * as datefns from 'date-fns'
import dayjs from 'dayjs'
import { Layout } from 'components/Layout'

import { MyInput } from 'components/MyInput'
import {
  getAuth,
  PhoneAuthProvider,
  RecaptchaVerifier,
  signInWithCredential,
  signInWithPhoneNumber,
  updateEmail,
} from 'firebase/auth'

import { auth } from 'config'

import {
  getFirestore,
  collection,
  getDocs,
  doc,
  updateDoc,
  getDoc,
} from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { initializeApp } from 'firebase/app'
import { useAuth } from 'module/authen/auth/AuthContext'
import { axios } from 'utils/axios'

const Test = () => {
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
        console.log('aaa users', users)
      } catch (err) {
        console.log('aaa err', err)
        console.log('aaa JSON.stringify(err)', JSON.stringify(err))
      }
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
      updateEmail(user, 'austin@zporter.co')
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
            debugger
          }}
          className="bg-green-500 p-4 flex justify-center items-center "
        >
          delete user
        </button>
      </div>
    </Layout>
  )
}

export default Test
