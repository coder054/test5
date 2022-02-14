import { Form, notification } from 'antd'
import { settingsAtom } from 'atoms/accountAndSettings'
import { MyCustomSelect } from 'components/MyCustomSelect'
import { MySelectCountry } from 'components/MySelectCountry'
import { CountryType } from 'constants/types/settingsType.type'
import { useAtom } from 'jotai'
import { useEffect, useState } from 'react'
import { Cookies } from 'react-cookie'
import { axios } from 'utils/axios'
import { BackGround } from '../../common-components/Background'

type FormValuesType = {
  country?: CountryType
  language?: string
  privacy?: string
}

export const Language = () => {
  const cookies = new Cookies()
  const roleId = cookies.get('roleId')
  const role = cookies.get('roleName')
  const [account] = useAtom(settingsAtom)
  console.log(account)

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

  useEffect(() => {
    const handleSubmit = async () => {
      const res = await axios.patch(
        `users/${role.toLowerCase()}/settings`,
        {
          settings: {
            ...account.settings,
            country: formValues.country,
            language: formValues.language,
            public: formValues.privacy === 'Public' ? true : false,
          },
        },
        {
          headers: {
            roleId: roleId,
          },
        }
      )
      if (res.status !== 200) {
        notification['error']({
          message: res.data,
          description: '',
        })
      }
    }
    handleSubmit()
  }, [formValues])

  useEffect(() => {
    account &&
      setFormValues((prev) => ({
        ...prev,
        country: account.settings?.country,
        language: account.settings?.language,
        privacy: account.settings?.public ? 'Public' : 'Private',
      }))
  }, [JSON.stringify(account)])

  return (
    <BackGround
      label="Language"
      form={
        <div className="space-y-7">
          <Form.Item name="language">
            <MyCustomSelect
              label="Language"
              val={formValues.language}
              onChange={(_, value) => handleChangeForm('language', value)}
              arrOptions={['English']}
            />
          </Form.Item>
          <Form.Item name="country">
            <MySelectCountry
              label="Country"
              val={formValues.country}
              onChange={(_, value) => handleChangeForm('country', value)}
            />
          </Form.Item>
          <Form.Item name="privacy">
            <MyCustomSelect
              label="Privacy"
              val={formValues.privacy}
              onChange={(_, value) => handleChangeForm('privacy', value)}
              arrOptions={['Public', 'Private']}
            />
          </Form.Item>
        </div>
      }
    />
  )
}
