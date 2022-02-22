import { Form, notification } from 'antd'
import * as firebase from 'firebase/auth'
import { signInWithEmailAndPassword, User } from 'firebase/auth'
import { useAtom } from 'jotai'
import { useEffect, useState } from 'react'
import { settingsAtom } from 'src/atoms/accountAndSettings'
import { MyButton } from 'src/components/MyButton'
import { MyCustomSelect } from 'src/components/MyCustomSelect'
import { MyInput } from 'src/components/MyInput'
import { auth } from 'src/config/firebase-client'
import { getRulePassword } from 'src/hooks/functionCommon'
import { useAuth } from 'src/module/authen/auth/AuthContext'
import { BackGround } from '../../common-components/Background'

type FormValuesType = {
  userName?: string
  newPassword: string
  confirmPassword: string
  verifyPassword: string
}

export const BasicDetail = () => {
  const { currentUser } = useAuth()

  const [form] = Form.useForm()
  const [account] = useAtom(settingsAtom)
  const [email, setEmail] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [formValues, setFormValues] = useState<FormValuesType>({
    userName: '',
    newPassword: '',
    confirmPassword: '',
    verifyPassword: '',
  })

  const handleChangeForm = (type: keyof FormValuesType, value: string) => {
    setFormValues((prev) => ({ ...prev, [type]: value }))
  }

  const handleSubmit = async () => {
    console.log(email, formValues.verifyPassword)
    setIsLoading(true)
    await signInWithEmailAndPassword(auth, email, formValues.verifyPassword)
      .then(async () => {
        await firebase
          .updatePassword(currentUser as User, formValues.newPassword)
          .then(() => {
            setIsLoading(false)
            notification['success']({
              message: 'Change password successfully',
              placement: 'bottomLeft',
            })
            form.resetFields()
          })
          .catch(() => {
            setIsLoading(false)
            notification['error']({
              message: 'Change password failed!',
            })
          })
      })
      .catch(() => {
        setIsLoading(false)
        notification['error']({
          message: 'Wrong password',
        })
      })
  }

  useEffect(() => {
    currentUser !== null ? setEmail(currentUser.email) : setEmail('')
    account &&
      setFormValues((prev) => ({ ...prev, userName: account?.username }))
  }, [currentUser, account])

  return (
    <BackGround
      label="Basic detail"
      form={
        <Form form={form} className="space-y-7">
          <MyCustomSelect
            label="User profile"
            val="Coach"
            arrOptions={['Coach', 'Player']}
          />
          <MyInput label="Username" value={formValues.userName} />
          <Form.Item name="newPassword" rules={[getRulePassword()]}>
            <MyInput
              password
              label="New password"
              value={formValues.newPassword}
              onChange={(e) => handleChangeForm('newPassword', e.target.value)}
            />
          </Form.Item>
          <Form.Item
            name="confirmPassword"
            dependencies={['newPassword']}
            rules={[
              ({ getFieldValue }) => ({
                validator(_, val) {
                  if (!val || getFieldValue('newPassword') === val) {
                    return Promise.resolve()
                  }
                  return Promise.reject(
                    new Error(
                      'The two passwords that you entered do not match!'
                    )
                  )
                },
              }),
            ]}
          >
            <MyInput
              password
              label="Confirm password"
              value={formValues.confirmPassword}
              onChange={(e) =>
                handleChangeForm('confirmPassword', e.target.value)
              }
            />
          </Form.Item>
          <Form.Item name="oldPassword">
            <MyInput
              password
              label="Verify with old password"
              value={formValues.verifyPassword}
              onChange={(e) =>
                handleChangeForm('verifyPassword', e.target.value)
              }
            />
          </Form.Item>
          <MyButton
            isLoading={isLoading}
            type="submit"
            onClick={handleSubmit}
            label="Save"
          />
        </Form>
      }
    />
  )
}
