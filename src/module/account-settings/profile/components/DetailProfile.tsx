import { settingsAtom } from 'src/atoms/accountAndSettings'
import { MyCustomSelect } from 'src/components/MyCustomSelect'
import { MyDatePicker } from 'src/components/MyDatePicker'
import { MyInput } from 'src/components/MyInput'
import { MySelectCountry } from 'src/components/MySelectCountry'
import { CountryType } from 'src/constants/types/settingsType.type'
import { useAtom } from 'jotai'
import { useEffect, useState } from 'react'
import { BackGround } from '../../common-components/Background'

type FormValuesType = {
  email?: string
  phone?: string
  postNumber?: string
  region?: string
  birthCountry?: CountryType
  city?: string
  homeAddress?: string
}

type DetailProfileProps = {
  onFormChange: (data: FormValuesType) => void
}

export const DetailProfile = ({ onFormChange }: DetailProfileProps) => {
  const [account] = useAtom(settingsAtom)

  const [formValues, setFormValues] = useState<FormValuesType>({
    email: '',
    phone: '',
    postNumber: '',
    region: '',
    birthCountry: {
      alpha2Code: '',
      alpha3Code: '',
      phoneCode: '',
      flag: '',
      name: '',
      region: '',
    },
    city: '',
    homeAddress: '',
  })

  const handleChangeForm = (type: keyof FormValuesType, value: any) => {
    setFormValues((prev) => ({ ...prev, [type]: value }))
  }

  useEffect(() => {
    onFormChange && onFormChange(formValues)
  }, [formValues])

  useEffect(() => {
    account &&
      setFormValues((prev) => ({
        ...prev,
        email: account.profile?.email,
        phone: account.profile?.phone,
        postNumber: account.profile?.postNumber,
        region: account.profile?.region,
        birthCountry: account.profile?.birthCountry,
        city: account.profile?.city,
        homeAddress: account.profile?.homeAddress,
      }))
  }, [account])

  return (
    <BackGround label="Detail Profile" contentClass="xl:w-[400px]">
      <div className="space-y-7">
        <MyInput
          onChange={(e) => handleChangeForm('email', e.target.value)}
          value={formValues.email}
          label="Email"
        />
        <MyInput
          onChange={(e) => handleChangeForm('phone', e.target.value)}
          value={formValues.phone}
          label="Mobile phone"
        />
        <MyInput
          onChange={(e) => handleChangeForm('homeAddress', e.target.value)}
          value={formValues.homeAddress}
          label="Home address"
        />
        <MyInput
          onChange={(e) => handleChangeForm('postNumber', e.target.value)}
          value={formValues.postNumber}
          label="Post number"
        />
        <MyInput
          onChange={(e) => handleChangeForm('city', e.target.value)}
          value={formValues.city}
          label="City"
        />
        <MyInput
          onChange={(e) => handleChangeForm('region', e.target.value)}
          value={formValues.region}
          label="Region"
        />
        <MySelectCountry
          label="Birthcountry"
          val={formValues.birthCountry}
          onChange={(_, value) => handleChangeForm('birthCountry', value)}
        />
      </div>
    </BackGround>
  )
}
