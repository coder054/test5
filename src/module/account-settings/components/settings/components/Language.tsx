import { notification } from 'antd'
import { settingsAtom } from 'src/atoms/accountAndSettings'
import { MyCustomSelect } from 'src/components/MyCustomSelect'
import { MySelectCountry } from 'src/components/MySelectCountry'
import { CountryType } from 'src/constants/types/settingsType.type'
import { useAtom } from 'jotai'
import { useEffect, useState } from 'react'
import { Cookies } from 'react-cookie'
import { axios } from 'src/utils/axios'
import { BackGround } from '../../common-components/Background'
import { useAuth } from 'src/module/authen/auth/AuthContext'

type FormValuesType = {
  country?: CountryType
  language?: string
  public?: {
    label: string
    status: boolean
  }
}

export const Language = () => {
  const [account, setAccount] = useAtom(settingsAtom)

  console.log(account)

  const { currentRoleName, currentRoleId } = useAuth()
  const [formValues, setFormValues] = useState<FormValuesType>({
    country: {
      alpha2Code: '',
      alpha3Code: '',
      phoneCode: '',
      flag: '',
      name: '',
      region: '',
    },
    language: '',
    public: null,
  })

  const handleChangeForm = async (
    type: keyof FormValuesType,
    value: any,
    isBoolean?: boolean
  ) => {
    await axios
      .patch(
        `users/${currentRoleName.toLowerCase()}/settings`,
        {
          settings: {
            ...account.settings,
            [type]: type === 'public' ? isBoolean : value,
          },
        },
        {
          headers: {
            roleId: currentRoleId,
          },
        }
      )
      .then(() => {
        setAccount({
          ...account,
          settings: {
            ...account.settings,
            [type]: type === 'public' ? isBoolean : value,
          },
        })
        setFormValues((prev) => ({ ...prev, [type]: value }))
        notification['success']({
          message: 'Change successfully',
        })
      })
      .catch(() => {
        notification['error']({
          message: 'Error',
          description: '',
        })
      })
  }

  useEffect(() => {
    account &&
      setFormValues((prev) => ({
        ...prev,
        country: account.settings?.country,
        language: account.settings?.language,
        public: account.settings?.public
          ? { label: 'Public', status: true }
          : { label: 'Private', status: false },
      }))
  }, [account])

  return (
    <BackGround
      label="Language"
      form={
        <div className="space-y-7">
          <MyCustomSelect
            label="Language"
            val={formValues.language}
            onChange={(_, value) => handleChangeForm('language', value)}
            arrOptions={['English']}
          />
          <MySelectCountry
            label="Country"
            val={formValues.country}
            onChange={(_, value) => handleChangeForm('country', value)}
          />
          <MyCustomSelect
            label="Privacy"
            val={formValues.public}
            onChange={(_, value) =>
              handleChangeForm('public', value, value.status)
            }
            arrOptions={[
              { label: 'Public', status: true },
              { label: 'Private', status: false },
            ]}
          />
        </div>
      }
    />
  )
}
