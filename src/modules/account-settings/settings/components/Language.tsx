import { MenuItem, TextField } from '@mui/material'
import { useAtom } from 'jotai'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { settingsAtom } from 'src/atoms/accountAndSettings'
import { MyInput } from 'src/components'
import { MyCustomSelect } from 'src/components/MyCustomSelect'
import { MySelectCountry } from 'src/components/MySelectCountry'
import { CountryType } from 'src/constants/types/settingsType.type'
import { useAuth } from 'src/modules/authentication/auth/AuthContext'
import { axios } from 'src/utils/axios'
import { BackGround } from '../../common-components/Background'

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

  const { currentRoleName } = useAuth()
  const [formValues, setFormValues] = useState<FormValuesType>({
    country: {
      alpha2Code: '',
      alpha3Code: '',
      phoneCode: '',
      flag: '',
      name: '',
      region: '',
    },
    language: 'english',
    public: null,
  })

  const handleChangeForm = async (
    type: keyof FormValuesType,
    value: any,
    isBoolean?: boolean
  ) => {
    await axios
      .patch(`users/${currentRoleName.toLowerCase()}/settings`, {
        settings: {
          ...account.settings,
          [type]: type === 'public' ? isBoolean : value,
        },
      })
      .then(() => {
        setAccount({
          ...account,
          settings: {
            ...account.settings,
            [type]: type === 'public' ? isBoolean : value,
          },
        })
        setFormValues((prev) => ({ ...prev, [type]: value }))
      })
      .catch(() => {
        toast.error('Something went wrong')
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
    <BackGround label="Language" contentClass="xl:w-[400px]">
      <div className="space-y-7">
        <TextField select fullWidth label="Languague" defaultValue="english">
          <MenuItem value="english">English</MenuItem>
        </TextField>
        <MySelectCountry
          label="Country"
          value={formValues.country}
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
    </BackGround>
  )
}
