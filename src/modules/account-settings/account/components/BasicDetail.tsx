import { MenuItem } from '@mui/material'
import * as firebase from 'firebase/auth'
import { signInWithEmailAndPassword, User } from 'firebase/auth'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import { useAtom } from 'jotai'
import _ from 'lodash'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { settingsAtom } from 'src/atoms/accountAndSettings'
import { MyButton } from 'src/components/MyButton'
import { MyCustomSelect } from 'src/components/MyCustomSelect'
import { MyInput } from 'src/components/MyInput'
import { auth } from 'src/config/firebase-client'
import { useAuth } from 'src/modules/authentication/auth/AuthContext'
import * as Yup from 'yup'
import { BackGround } from '../../common-components/Background'
import { useQueryClient } from 'react-query'
import { QUERIES_SETTINGS } from 'src/constants/query-keys/query-keys.constants'
interface InitialValuesType {
  username?: string
  newPassword: string
  userProfile: string
  confirmPassword: string
  verifyPassword: string
}

export const BasicDetail = () => {
  const queryClient = useQueryClient()
  const { currentUser, currentRoleName, updateUserRoles } = useAuth()

  const [account] = useAtom(settingsAtom)
  const [email, setEmail] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [initialValues, setInitialValues] = useState<InitialValuesType>({
    username: '',
    userProfile: '',
    newPassword: '',
    confirmPassword: '',
    verifyPassword: '',
  })

  const validationSchema = Yup.object().shape({
    newPassword: Yup.string()
      .min(8, 'Min 8 signs & 1 capital letter')
      .matches(/(?=.*?[A-Z])/, 'Min 8 signs & 1 capital letter'),
    confirmPassword: Yup.string().oneOf(
      [Yup.ref('newPassword')],
      'Password not matched'
    ),
  })

  const handleSubmit = async (values: InitialValuesType, { resetForm }) => {
    setIsLoading(true)
    await signInWithEmailAndPassword(auth, email, values.verifyPassword)
      .then(async () => {
        await firebase
          .updatePassword(currentUser as User, values.newPassword)
          .then(() => {
            resetForm()
            setIsLoading(false)
            toast.success('Password changed')
            updateUserRoles()
            queryClient.invalidateQueries(QUERIES_SETTINGS.SETTINGS)
          })
          .catch(() => {
            setIsLoading(false)
            toast.error('Something went wrong, try to refesh the page')
          })
      })
      .catch(() => {
        setIsLoading(false)
        toast.error('Wrong password')
      })
  }

  useEffect(() => {
    currentUser !== null ? setEmail(currentUser.email) : setEmail('')
    account &&
      setInitialValues((prev) => ({
        ...prev,
        username: account?.username,
        userProfile: _.upperFirst(currentRoleName.toLowerCase()),
      }))
  }, [JSON.stringify(account)])

  return (
    <BackGround label="Basic detail" contentClass="xl:w-[400px]">
      <Formik
        onSubmit={handleSubmit}
        enableReinitialize={true}
        initialValues={initialValues}
        validationSchema={validationSchema}
      >
        {() => (
          <Form className="space-y-7">
            <Field
              select
              disabled
              as={MyInput}
              name="userProfle"
              label="User profile"
              value={initialValues.userProfile}
            >
              <MenuItem value="Coach">Coach</MenuItem>
              <MenuItem value="Player">Player</MenuItem>
            </Field>
            <Field
              disabled
              as={MyInput}
              name="username"
              label="Username"
              placeholder="Enter your username"
            />
            <Field
              as={MyInput}
              password
              name="newPassword"
              label="New password"
              placeholder="Enter your new password"
              helperText={
                <ErrorMessage
                  name="newPassword"
                  render={(msg) => (
                    <p className="text-red-500 animate-appear ">{msg}</p>
                  )}
                />
              }
            />
            <Field
              as={MyInput}
              password
              name="confirmPassword"
              label="Confirm password"
              placeholder="Confirm your password"
              helperText={<ErrorMessage name="confirmPassword" />}
            />
            <Field
              as={MyInput}
              password
              name="verifyPassword"
              label="Verify password"
              placeholder="Verify your old password"
            />
            <MyButton isLoading={isLoading} type="submit" label="Save" />
          </Form>
        )}
      </Formik>
    </BackGround>
  )
}
