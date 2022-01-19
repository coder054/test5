import { Button } from 'components'
import { MyInput } from 'components/MyInput'
import { FormEvent, useState } from 'react'
import { useRouter } from 'next/router'
import { useAtom } from 'jotai'

const SignUp = () => {
  const router = useRouter()
  const [values, setValues] = useState({
    email: '',
    password: '',
    confirm_password: '',
  })

  const onChange = (e: any) => {
    const value = e.target.value
    setValues({
      ...values,
      [e.target.name]: value,
    })
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log('valuesd', values.email, values.password)

    // router.push('/')
  }
  console.log(values.email)

  const handleSignup = () => {
    // router.push('/')
  }

  return (
    <div className="w-full mt-28">
      <div className="w-1/4 m-auto border border-stone-500 rounded-[8px] p-10">
        <form className="" onSubmit={handleSubmit}>
          <p className="text-[24px] text-[#FFFFFF]">Sign up</p>
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
          <MyInput
            name={'confirm_password'}
            label="Confirm Password"
            value={values.confirm_password}
            password
            className="mt-8"
            onChange={onChange}
          />
          {/* <div className="mt-8">
            <Button
              submit
              className="h-[48px] bg-[#4654EA] text-[15px]"
              text="Sign In"
            />
          </div> */}
          <div className="mt-12">
            <Button
              submit
              text="Submit"
              className="h-[48px] text-[#09E099] border border-[#09E099]"
            />
          </div>
        </form>
      </div>
    </div>
  )
}

export default SignUp
