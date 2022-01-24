import { Button, LogoBigSize } from 'components'
import { MyInput } from 'components/MyInput'
import { useState } from 'react'
import { useRouter } from 'next/router'
import { useAuth } from '../auth/AuthContext'
import cls from './signup.module.css'
import { Form } from 'antd'
import { MyCheckbox } from 'components/common/MyCheckbox'
import { GoBack } from 'components/go-back'
import { MyModal } from 'components/MyModal'
import { LogoLargeSize } from 'components/logo/LogoLargeSize'
import { InputVerifyCode } from 'components/input/input-verify-code'
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth'
import { auth } from 'config'

export const SignUpWithSMS = () => {
  const router = useRouter()
  const [loading, setLoading] = useState<boolean>(false)
  const [checked, setChecked] = useState<boolean>(false)
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [otp, setOtp] = useState<string>('')
  const [form] = Form.useForm()
  const {} = useAuth()

  // const SetUpRecaptcha = () => {
  //   if(typeof window !== "undefined") {
  //     (window as any).recaptchaVerifier = new RecaptchaVerifier('sign-in-button', {
  //       'size': 'invisible',
  //       'callback': (response) => {
  //         console.log("ré", response);

  //         // handleSignUp();
  //       }
  //     }, auth);
  //   }
  // }

  const handleSignUp = async (e: any) => {
    e.preventDefault()
    if (!checked) {
      return
    }
    const submitForm = await form.validateFields()
    // SetUpRecaptcha();
    // if(typeof window !== "undefined") {
    //   const appVerifier = (window as any).recaptchaVerifier;
    //   signInWithPhoneNumber(auth, submitForm.phone, appVerifier)
    //   .then((confirmationResult) => {

    //       (window as any).confirmationResult = confirmationResult;
    //     confirmationResult.confirm(otp).then((result) => {
    //       const user = result.user;
    //       console.log("success");

    //     }).catch((error) => {
    //     });

    //   }).catch((error) => {
    //   });
    //   }
  }

  return (
    <div className="w-screen h-screen relative">
      <div className="absolute top-[40px] left-[40px]">
        <GoBack label="Sign up with SMS" goBack="/signin" />
      </div>
      <div className="w-full h-full flex items-center">
        <div
          className={`${cls.formSignUp} w-[470px] rounded-[8px] pl-[32px] pt-[48px] pr-[32px] pb-[48px] ml-[17%] `}
        >
          <Form className="" form={form}>
            <p className="text-[24px] text-[#FFFFFF] text-center">Sign up</p>
            <p className="text-[14px] text-[#818389] mt-[16px] text-center">
              Register on the internal platform
            </p>
            <Form.Item
              className="mt-[24px]"
              name={'phone'}
              rules={[
                {
                  required: true,
                  message: 'Required fields must be filled in.',
                  max: 25,
                },
              ]}
            >
              <MyInput name={'phone'} label="Mobile phone number" />
            </Form.Item>

            <Form.Item
              className="mt-[24px]"
              name={'email'}
              rules={[
                {
                  required: true,
                  message: 'Required fields must be filled in.',
                  max: 255,
                },
                { type: 'email', message: 'Email is wrong format.' },
              ]}
            >
              <MyInput name={'email'} label="Email" />
            </Form.Item>

            <Form.Item
              className="mt-[24px]"
              name={'password'}
              rules={[
                {
                  required: true,
                  message: 'Required fields must be filled in.',
                  max: 255,
                },
                {
                  min: 6,
                  message: 'Your password must be more than 6 characters',
                },
              ]}
            >
              <MyInput
                name={'password'}
                label="Choose password (+8 signs)"
                password
              />
            </Form.Item>

            <Form.Item
              className="mt-[24px]"
              name={'repeat_password'}
              rules={[
                {
                  required: true,
                  message: 'Required fields must be filled in.',
                },
                ({ getFieldValue }) => ({
                  validator(rule, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve()
                    }
                    return Promise.reject(
                      'The two passwords that you entered do not match!'
                    )
                  },
                }),
              ]}
            >
              <MyInput
                name={'repeat_password'}
                label="Repeat Password"
                password
              />
            </Form.Item>
            <div className="w-full">
              <MyCheckbox
                label={''}
                checked={checked}
                onChange={() => {
                  setChecked(!checked)
                }}
              />
              <span className="text-[#4654EA] text-sm underline">
                Terms & Conditions, Privacy Rules{' '}
              </span>
              <span className="text-base text-[#FFFFFF] ml-[2px]">
                appeoved
              </span>
            </div>
            <div className="w-full mt-[22px]" onClick={handleSignUp}>
              <Button
                submit
                text="Register"
                className="sign-in-button h-[48px] font-semibold text-[15px] text-[#FFFFFF] bg-[#4654EA] hover:bg-[#6d78f3]"
              />
            </div>
            <div className="w-full h-[1px] bg-[#818389] mt-[24px]"></div>
            <p
              className="text-[#4654EA] underline mt-[24px] cursor-pointer"
              onClick={() => {
                router.push('/signin')
              }}
            >
              Already have an account?
            </p>
          </Form>
        </div>
      </div>
      <LogoBigSize className="mt-12" />
      <MyModal show={openModal} setShow={setOpenModal} width={412}>
        <div className={`${cls.modalVerifySMS} w-[412px] p-[32px]`}>
          <LogoLargeSize />
          <p className="text-[24px] text-[#FFFFFF] mt-[16px] text-center font-semibold">
            Verify email
          </p>
          <p className="text-[14px] text-[#FFFFFF] text-center mt-[16px]">
            Now verify your mobile phone number by adding the 6 digit code we
            sent to <span className="text-[#09E099]">+46 768 030568.</span>
          </p>
          <p className="text-sm text-[#FFFFFF] text-center underline">
            Wrong number?
          </p>
          <p className="text-sm text-[#FFFFFF] mt-[24px]">Verify code</p>
          <div className="w-full">
            <InputVerifyCode number={6} />
          </div>
          <Button
            text="Verify code"
            className="bg-[#4654EA] w-[348px] h-[44px] mt-[24px] text-[#FFFFFF] mb-[24px]"
          />
          <div className="h-[1px] w-full bg-[#484A4D] mb-[24px]"></div>
          <span
            className="text-[#4654EA] text-base underline cursor-pointer"
            onClick={() => {
              router.push('/signin')
            }}
          >
            Already have an account?
          </span>
        </div>
      </MyModal>
    </div>
  )
}
