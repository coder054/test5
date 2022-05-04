import { notification } from 'antd'
import { useState } from 'react'
import { MyButton } from 'src/components/MyButton'
import { ProfileType } from 'src/constants/types/settingsType.type'
import { useAuth } from 'src/modules/authentication/auth/AuthContext'
import { axios } from 'src/utils/axios'
import { BasicProfile } from './components/BasicProfile'
import { DetailProfile } from './components/DetailProfile'
import { useAtom } from 'jotai'
import { settingsAtom } from 'src/atoms/accountAndSettings'
import toast from 'react-hot-toast'
import { useMutation, useQueryClient } from 'react-query'
import { QUERIES_SETTINGS } from 'src/constants/query-keys/query-keys.constants'
import { updateSettings } from 'src/service/users/settings.service'
import _ from 'lodash'

export const Profile = () => {
  const queryClient = useQueryClient()
  const { currentRoleName } = useAuth()
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

  console.log(submitForm)

  const handleFormChange = (data: ProfileType) => {
    setSubmitForm((prev) => ({ ...prev, ...data }))
  }

  const { mutate: mutateUpdate, isLoading } = useMutation(updateSettings, {
    onSuccess: () => {
      queryClient.invalidateQueries(QUERIES_SETTINGS.SETTINGS)
      toast.success('Successfully updated')
    },
    onError: () => {
      toast.error('Something went wrong')
    },
  })

  const handleSubmit = async () => {
    mutateUpdate({
      data: {
        profile: submitForm,
      },
      currentRoleName,
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
