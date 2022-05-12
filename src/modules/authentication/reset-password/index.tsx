import { TextField } from '@mui/material'
import { sendPasswordResetEmail } from 'firebase/auth'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { isMobile } from 'react-device-detect'
import toast from 'react-hot-toast'
import { LogoBigSize } from 'src/components'
import { Button } from 'src/components/Button'
import { Logo } from 'src/components/logo'
import { ModalMui } from 'src/components/ModalMui'
import { auth } from 'src/config/firebase-client'
import * as Yup from 'yup'
import { useAuth } from '../auth/AuthContext'

const ResetPassword = () => {
  const router = useRouter()

  const [sideEffect, setSideEffect] = useState({
    isLoading: false,
    isOpenModal: false,
  })

  const [initialValues] = useState({
    email: '',
  })

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required(''),
  })

  const handleSubmit = async (value: { email: string }) => {
    setSideEffect((prev) => ({ ...prev, isLoading: true }))
    await sendPasswordResetEmail(auth, value.email)
      .then(() => {
        setSideEffect((prev) => ({
          ...prev,
          isLoading: false,
          isOpenModal: true,
        }))
      })
      .catch(() => {
        toast.error('Email not found')
        setSideEffect((prev) => ({
          ...prev,
          isLoading: false,
        }))
      })
  }

  return (
    <div className="w-screen h-screen flex tabletM:justify-center tabletM:space-x-48 items-center bg-authen-desktop bg-no-repeat bg-cover">
      <div className="bg-[#111827] mobileM:w-screen mobileM:h-screen flex flex-col justify-center tabletM:w-[570px] tabletM:rounded-lg tabletM:h-fit p-8 ">
        <Formik
          onSubmit={handleSubmit}
          enableReinitialize={true}
          initialValues={initialValues}
          validationSchema={validationSchema}
        >
          {() => (
            <Form className="space-y-4">
              <p className="text-white font-bold text-4xl">Forgot password</p>
              <p className="text-gray-400">Enter your email address.</p>
              <Field
                fullWidth
                as={TextField}
                autoFocus={true}
                label="Email"
                name="email"
                placeholder="Enter your email"
                helperText={<ErrorMessage name="email" />}
              />
              <Button
                label="Send"
                type="submit"
                loadingColor="#ffffff"
                isLoading={sideEffect.isLoading}
                className="bg-[#4654EA] w-full rounded-lg py-3"
              />
            </Form>
          )}
        </Formik>
      </div>
      <ModalMui
        sx={{
          top: '50%',
          width: isMobile ? '100%' : 500,
          height: isMobile ? '100%' : 'auto',
        }}
        isOpen={sideEffect.isOpenModal}
        onClose={() =>
          setSideEffect((prev) => ({ ...prev, isOpenModal: false }))
        }
      >
        <>
          <Logo />
          <div className="flex flex-col space-y-4 justify-center  items-center">
            <p className="text-lg text-gray-400 py-2">
              We've sent you an email with a link to reset your password.
            </p>
            <Button
              onClick={() => router.push('/sign-in')}
              className="w-full py-3 bg-[#4654EA] rounded-lg"
              label="Go back"
              type="button"
            />
          </div>
        </>
      </ModalMui>
      <span className="mobileM:hidden tabletM:block">
        <LogoBigSize />
      </span>
    </div>
  )
}

export default ResetPassword
