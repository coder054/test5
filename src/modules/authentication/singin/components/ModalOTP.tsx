import React, { ChangeEvent, useState } from 'react'
import { ModalMui } from 'src/components/ModalMui'
import OtpInput from 'react-otp-input'
import { isDesktop, isMobile, isTablet } from 'react-device-detect'
import { Button } from 'src/components/Button'
import toast from 'react-hot-toast'
import { get } from 'lodash'

interface ModalOTPProps {
  phone: string
  isOpen: boolean
  onClose: (value: boolean) => void
}

export default function ModalOTP({ isOpen, onClose, phone }: ModalOTPProps) {
  const [otp, setOtp] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.stopPropagation()
    e.preventDefault()
    if (typeof window === 'undefined') {
      return
    }
    setIsLoading(true)
    //@ts-ignore: Unreachable code error
    await window.confirmationResult
      .confirm(otp)
      .then(() => {
        setIsLoading(false)
        toast.success('Login successfully')
      })
      .catch((error) => {
        setIsLoading(false)
        if (get(error, 'code') === 'auth/invalid-verification-code') {
          toast.error('Invalid verification code')
        }
      })
  }

  return (
    <ModalMui
      isOpen={isOpen}
      onClose={onClose}
      sx={{
        p: { xl: 0, xs: 0 },
      }}
    >
      <div>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center justify-center space-y-6 mobileM:h-screen mobileM:w-screen tabletM:w-[500px] tabletM:h-auto mobileM:p-6 tabletM:p-8"
        >
          <div className="w-full flex justify-start">
            <img
              alt="Zporter"
              src="/zporter.png"
              className="w-[150px] h-[34px]"
            />
          </div>
          <p className="text-3xl font-semibold w-full text-left">
            Verify phone number
          </p>
          <p className="font-Roboto text-base ">
            Now verify your mobile phone number by adding the 6 digit code we
            sent to {phone && '+' + phone}{' '}
            <button
              type="button"
              className="underline hover:text-[#09E099]"
              onClick={() => onClose(false)}
            >
              Wrong number
            </button>
            ?
          </p>
          <p className="text-left w-full">Verify code</p>
          <OtpInput
            isInputNum
            numInputs={6}
            value={otp}
            onChange={(value: string) => {
              setOtp(value)
            }}
            inputStyle="border-2 border-gray-400 rounded-lg w-[45px] h-[70px] duration-150 text-2xl md:text-[28px] font-roboto bg-transparent text-white"
            containerStyle="flex justify-between w-full"
          />
          <Button
            label="Next"
            type="submit"
            isLoading={isLoading}
            loadingColor="#ffffff"
            className="bg-[#4654EA] w-full rounded-lg py-3"
          />
        </form>
      </div>
    </ModalMui>
  )
}
