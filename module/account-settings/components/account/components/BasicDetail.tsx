import { Form, notification } from 'antd'
import { settingsAtom } from 'atoms/accountAndSettings'
import { MyButton } from 'components/MyButton'
import { MyInput } from 'components/MyInput'
import { MySelect } from 'components/MySelect'
import { auth } from 'config'
import * as firebase from 'firebase/auth'
import { signInWithEmailAndPassword, User } from 'firebase/auth'
import { getRulePassword } from 'hooks/functionCommon'
import { useAtom } from 'jotai'
import { useAuth } from 'module/authen/auth/AuthContext'
import { useEffect, useState } from 'react'
import { BackGround } from '../../common-components/Background'

type FormValuesType = {
  username: string
  newPassword: string
  confirmPassword: string
  verifyPassword: string
}

export const BasicDetail = () => {
  const [form] = Form.useForm()
  const [account] = useAtom(settingsAtom)
  const { currentUser } = useAuth()

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [formValues, setFormValues] = useState<FormValuesType>({
    username: '',
    newPassword: '',
    confirmPassword: '',
    verifyPassword: '',
  })

  const handleChangeForm = (type: keyof FormValuesType, value: string) => {
    setFormValues((prev) => ({ ...prev, [type]: value }))
  }

  const handleSubmit = async () => {
    setIsLoading(true)
    await signInWithEmailAndPassword(
      auth,
      formValues.username,
      formValues.verifyPassword
    )
      .then(() => {
        setIsLoading(false)
        notification['success']({
          message: 'Change password successfully',
        })
        firebase.updatePassword(currentUser as User, formValues.newPassword)
      })
      .catch(() => {
        setIsLoading(false)
        notification['error']({
          message: 'Wrong password',
        })
      })
  }

  useEffect(() => {
    account.account?.email &&
      setFormValues((prev) => ({
        ...prev,
        username: account.account ? account.account.email : '',
      }))
  }, [account])

  return (
    <BackGround
      label="Basic detail"
      form={
        <Form form={form} className="space-y-7">
          <MySelect
            value={'Coach'}
            label={'Select Role'}
            arrOption={[
              { value: 'Coach', label: 'Coach' },
              { value: 'Player', label: 'Player' },
            ]}
          />
          <MyInput
            label="Username"
            value={formValues.username}
            onChange={(e) => handleChangeForm('username', e.target.value)}
          />
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
                  console.log(val)
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
          <MyInput
            password
            label="Verify with old password"
            value={formValues.verifyPassword}
            onChange={(e) => handleChangeForm('verifyPassword', e.target.value)}
          />
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
