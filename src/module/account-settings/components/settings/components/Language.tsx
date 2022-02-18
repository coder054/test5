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
  privacy?: string
}

export const Language = () => {
  const [account, setAccount] = useAtom(settingsAtom)
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
    privacy: '',
  })

  const handleChangeForm = async (type: keyof FormValuesType, value: any) => {
    setFormValues((prev) => ({ ...prev, [type]: value }))
  }

  const handleSubmit = async () => {
    const data = {
      ...account.settings,
      country: formValues.country,
      language: formValues.language,
      public: formValues.privacy === 'Public' ? true : false,
    }
    const res = await axios.patch(
      `users/${currentRoleName.toLowerCase()}/settings`,
      {
        settings: data,
      },
      {
        headers: {
          roleId: currentRoleId,
        },
      }
    )

    if (res.status !== 200) {
      notification['error']({
        message: res.data,
        description: '',
      })
    }
    // } else {
    //   setAccount({ ...account, settings: data })
    // }
  }

  useEffect(() => {
    handleSubmit()
  }, [handleChangeForm])

  useEffect(() => {
    account &&
      setFormValues((prev) => ({
        ...prev,
        country: account.settings?.country,
        language: account.settings?.language,
        privacy: account.settings?.public ? 'Public' : 'Private',
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
            val={formValues.privacy}
            onChange={(_, value) => handleChangeForm('privacy', value)}
            arrOptions={['Public', 'Private']}
          />
        </div>
      }
    />
  )
}
