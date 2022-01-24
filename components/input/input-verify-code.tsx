import { useState } from 'react'
import OtpInput from 'react-otp-input'
import cls from './input.module.css'

interface InputVerifyCodeProps {
  number: number
  setOtp?: (otp: string) => void
}

export const InputVerifyCode = ({ number }: InputVerifyCodeProps) => {
  const [otp, setOtp] = useState(new Array(number).fill(''))

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return false

    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))])

    // focus next input
    if (element.nextSibling) {
      element.nextSibling.focus()
    }
  }

  const getOtp = (otp: any): string => {
    let result = ''
    otp.map((item) => (result += item))
    if (otp.lengh() === 6) {
    }
    return result
  }
  console.log('otp', getOtp(otp))

  return (
    <div className="w-full flex mt-[8px]">
      {otp.map((data, index) => (
        <input
          key={index}
          maxLength={1}
          name="otp"
          value={data}
          onChange={(e) => {
            handleChange(e.target, index)
          }}
          onFocus={(e) => e.target.select()}
          className={`${cls.inputOtp} w-[44.67px] h-[56px] outline-none flex-1 p-[17px] rounded-[8px] mr-[16px]`}
        ></input>
      ))}
    </div>
  )
}
