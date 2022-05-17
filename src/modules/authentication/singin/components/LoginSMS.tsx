import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth'
import React, { ChangeEvent, useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast'

import { Button as CustomButton } from 'src/components/Button'
import { MyPhoneInput } from 'src/components/common/MyPhoneInput'
import { auth } from 'src/config/firebase-client'
import ModalOTP from './ModalOTP'

export default function LoginSMS() {
  const InputRef = useRef(null)
  const [phone, setPhone] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isOpenModalOTP, setIsOpenModalOTP] = useState<boolean>(false)

  const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (phone.length === 0) return
    setIsLoading(true)
    if (typeof window === 'undefined') {
      return
    }
    try {
      //@ts-ignore: Unreachable code error
      const appVerifier = window.recaptchaVerifier
      const confirmationResult = await signInWithPhoneNumber(
        auth,
        '+' + phone,
        appVerifier
      )
      //@ts-ignore: Unreachable code error
      window.confirmationResult = confirmationResult
    } catch (error) {
      setIsLoading(false)
      toast.error('Something went wrong')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    // @ts-ignore: Unreachable code error
    window.recaptchaVerifier = new RecaptchaVerifier(
      'capcha_element_signin_with_phone',
      {
        size: 'invisible',
        callback: () => {
          setIsOpenModalOTP(true)
        },
      },
      auth
    )
  }, [])

  // useEffect(() => {
  //   const res = Intl.DateTimeFormat().resolvedOptions().locale
  //   setRegion(res === 'vi' ? 'vn' : res)
  // }, [])

  return (
    <div>
      <ModalOTP
        isOpen={isOpenModalOTP}
        onClose={setIsOpenModalOTP}
        phone={phone}
      />
      <form onSubmit={handleSubmit} className="space-y-4">
        <MyPhoneInput setPhone={setPhone} />
        <CustomButton
          label="Sign in"
          type="submit"
          isLoading={isLoading}
          loadingColor="#ffffff"
          className="bg-[#4654EA] w-full rounded-lg py-3"
        />
      </form>
      <button
        type="button"
        id="sign-in-button5"
        className="w-[200px] h-[50px] fixed right-0 bottom-0 hidden"
      >
        recapcha
      </button>
    </div>
  )
}
