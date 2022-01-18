import { Button } from 'components'
import { MyInput } from 'components/MyInput'
import { FormEvent, useState } from 'react'
import { useRouter } from 'next/router'

const ChangePassword = () => {
  const router = useRouter()
  const [values, setValues] = useState({
    newPassword: '',
    ConfirmPassword: '',
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
    router.push('/')
  }

  return (
    <div className="w-full mt-28">
      <div className="w-1/4 m-auto border border-stone-500 rounded-[8px] p-10">
        <form className="" onSubmit={handleSubmit}>
          <p className="text-[24px] text-[#FFFFFF]">Change Password</p>
          <MyInput
            name={'newPassword'}
            placeholder="New Password"
            value={values.newPassword}
            className="mt-12"
            handleChange={handleChange}
          />
          <MyInput
            name={'ConfirmPassword'}
            placeholder="Confirm Password"
            value={values.ConfirmPassword}
            className="mt-12"
            handleChange={handleChange}
          />
          <div className="mt-12" onClick={handleSendOtp}>
            <Button
              text="Submit"
              className="h-[48px] text-[#09E099] border border-[#09E099]"
            />
          </div>
        </form>
      </div>
    </div>
  )
}

export default ChangePassword
