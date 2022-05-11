import { TextField } from '@mui/material'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import { default as React, useState } from 'react'
import toast from 'react-hot-toast'
import { MyInput } from 'src/components'
import { Button } from 'src/components/Button'
import * as Yup from 'yup'
import { useAuth } from '../../auth/AuthContext'

interface LoginEmailProps {
  email: string
  password: string
}

export default function LoginEmail() {
  const { signin } = useAuth()
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const [initialValues] = useState<LoginEmailProps>({
    email: '',
    password: '',
  })

  const validationSchema = Yup.object().shape({
    email: Yup.string().required(''),
    password: Yup.string().required(''),
  })

  const handleSubmit = async (value: LoginEmailProps) => {
    setIsLoading(true)
    await signin(value.email, value.password).finally(() => {
      setIsLoading(false)
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
            name="email"
            label="Email"
            placeholder="Enter your email"
            helperText={<ErrorMessage name="email" />}
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
