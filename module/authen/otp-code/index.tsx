import { Button } from 'components'
import { MyInput } from 'components/MyInput'
import { FormEvent, useState } from 'react'
import { useRouter } from 'next/router'

const OtpCode = () => {
  const router = useRouter()
  const [values, setValues] = useState({
    otp: '',
  })

  const handleChange = (e: any) => {
    const value = e.target.value
    setValues({
      ...values,
      [e.target.name]: value,
    })
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
  }

  const handleSendOtp = () => {
    router.push('/change-password')
  }

  return (
    <div className="w-full mt-28">
      <div className="w-1/4 m-auto border border-stone-500 rounded-[8px] p-10">
        <form className="" onSubmit={handleSubmit}>
          <p className="text-[24px] text-[#FFFFFF]">Otp</p>
          <MyInput
            name={'otp'}
            placeholder="Otp Code"
            value={values.otp}
            className="mt-12"
            handleChange={handleChange}
          />
          {/* <div className="mt-8">
            <Button
              submit
              className="h-[48px] bg-[#4654EA] text-[15px]"
              text="Sign In"
            />
          </div> */}
          <div className="mt-12" onClick={handleSendOtp}>
            <Button
              text="Send Otp"
              className="h-[48px] text-[#09E099] border border-[#09E099]"
            />
          </div>
        </form>
      </div>
    </div>
  )
}

export default OtpCode
