import { useState } from 'react'
import { BasicProfile } from './components/BasicProfile'
import { DetailProfile } from './components/DetailProfile'
import { ProfileType } from 'constants/types/settingsType.type'
import { MyButton } from 'components/MyButton'
import { axios } from 'utils/axios'
import { Cookies } from 'react-cookie'
import { notification } from 'antd'

export const Profile = () => {
  const cookies = new Cookies()
  const roleId = cookies.get('roleId')
  const role = cookies.get('roleName')

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [submitForm, setSubmitForm] = useState<ProfileType>({
    birthCountry: {
      alpha2Code: '',
      alpha3Code: '',
      phoneCode: '',
      flag: '',
      name: '',
      region: '',
    },
    birthDay: '',
    city: '',
    email: '',
    firstName: '',
    gender: '',
    homeAddress: '',
    lastName: '',
    phone: '',
    postNumber: '',
    region: '',
  })

  const handleFormChange = (data: ProfileType) => {
    setSubmitForm((prev) => ({ ...prev, ...data }))
  }

  const handleSubmit = async () => {
    setIsLoading(true)
    await axios
      .patch(
        `users/${role.toLowerCase()}/settings`,
        {
          profile: {
            ...submitForm,
          },
        },
        {
          headers: {
            roleId: roleId,
          },
        }
      )
      .then(() => {
        setIsLoading(false)
      })
      .catch(() => {
        setIsLoading(false)
        notification['error']({
          message: 'Error',
        })
      })
  }

  return (
    <div className="space-y-6">
      <BasicProfile onFormChange={handleFormChange} />
      <DetailProfile onFormChange={handleFormChange} />
      <MyButton
        isLoading={isLoading}
        type="submit"
        onClick={handleSubmit}
        label="Save"
      />
    </div>
  )
}
