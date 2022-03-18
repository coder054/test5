import { notification } from 'antd'
import { useState } from 'react'
import { MyButton } from 'src/components/MyButton'
import { ProfileType } from 'src/constants/types/settingsType.type'
import { useAuth } from 'src/module/authen/auth/AuthContext'
import { axios } from 'src/utils/axios'
import { BasicProfile } from './components/BasicProfile'
import { DetailProfile } from './components/DetailProfile'
import { useAtom } from 'jotai'
import { settingsAtom } from 'src/atoms/accountAndSettings'
import toast from 'react-hot-toast'

export const Profile = ({ getSettings }) => {
  const { currentRoleName, currentRoleId, updateUserRoles } = useAuth()
  const [account, setAccount] = useAtom(settingsAtom)
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
      .patch(`users/${currentRoleName}/settings`, {
        profile: {
          ...submitForm,
        },
      })
      .then(() => {
        setAccount({ ...account, profile: { ...submitForm } })
        setIsLoading(false)
        toast.success('Successfully updated')
        updateUserRoles()
        getSettings()
      })
      .catch(() => {
        setIsLoading(false)
        toast.error('An error has occurred')
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
