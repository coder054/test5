import { TextField } from '@mui/material'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { MyInput } from 'src/components'
import { Button } from 'src/components/Button'
import { API_SIGNIN_WITH_USERNAME } from 'src/constants/api.constants'
import { axios } from 'src/utils/axios'
import { getErrorMessage } from 'src/utils/utils'
import * as Yup from 'yup'
import { useAuth } from '../../auth/AuthContext'

interface LoginUsernameProps {
  username: string
  password: string
}

export default function LoginUserName() {
  const { SignInCustomToken } = useAuth()
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const [initialValues] = useState<LoginUsernameProps>({
    username: '',
    password: '',
  })

  const validationSchema = Yup.object().shape({
    username: Yup.string().required(''),
    password: Yup.string().required(''),
  })

  const handleSubmit = async ({ username, password }: LoginUsernameProps) => {
    setIsLoading(true)
    await axios
      .post(API_SIGNIN_WITH_USERNAME, {
        username,
        password,
      })
      .then(async (res) => {
        setIsLoading(false)
        await SignInCustomToken(res.data.customToken)
      })
      .catch((res) => {
        setIsLoading(false)
        toast.error(getErrorMessage(res))
      })
  }

  return (
    <Formik
      onSubmit={handleSubmit}
      enableReinitialize={true}
      initialValues={initialValues}
      validationSchema={validationSchema}
    >
      {() => (
        <Form className="space-y-4">
          <Field
            fullWidth
            as={TextField}
            autoFocus={true}
            name="username"
            label="Username"
            placeholder="Enter your username"
          />
          <Field
            as={MyInput}
            password
            label="Password"
            name="password"
            placeholder="Enter your password"
          />
          <Button
            label="Sign in"
            type="submit"
            isLoading={isLoading}
            loadingColor="#ffffff"
            className="bg-[#4654EA] w-full rounded-lg py-3"
          />
        </Form>
      )}
    </Formik>
  )
}
