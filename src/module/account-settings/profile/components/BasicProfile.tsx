import { settingsAtom } from 'src/atoms/accountAndSettings'
import { MyCustomSelect } from 'src/components/MyCustomSelect'
import { MyDatePicker } from 'src/components/MyDatePicker'
import { MyInput } from 'src/components/MyInput'
import { useAtom } from 'jotai'
import { useEffect, useState } from 'react'
import { BackGround } from '../../common-components/Background'

type FormValuesType = {
  firstName?: string
  lastName?: string
  gender?: string
  birthDay?: Date | string | null
}

type BasicProfileProps = {
  onFormChange: (data: FormValuesType) => void
}

export const BasicProfile = ({ onFormChange }: BasicProfileProps) => {
  const [account] = useAtom(settingsAtom)

  const [formValues, setFormValues] = useState<FormValuesType>({
    firstName: '',
    lastName: '',
    gender: '',
    birthDay: '',
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
        firstName: account.profile?.firstName,
        lastName: account.profile?.lastName,
        gender: account.profile?.gender,
        birthDay: account.profile?.birthDay,
      }))
  }, [JSON.stringify(account)])

  return (
    <BackGround label="Basic Profile" contentClass="xl:w-[400px]">
      <div className="space-y-7">
        <div className="grid grid-cols-2 gap-x-4">
          <MyInput
            onChange={(e) => handleChangeForm('firstName', e.target.value)}
            value={formValues.firstName}
            label="First name"
          />
          <MyInput
            onChange={(e) => handleChangeForm('lastName', e.target.value)}
            value={formValues.lastName}
            label="Last name"
          />
        </div>
        <MyCustomSelect
          val={formValues.gender}
          label="Gender"
          onChange={(_, value) => handleChangeForm('gender', value)}
          arrOptions={['MALE', 'FEMALE']}
        />
        <MyDatePicker
          onChange={(e) => handleChangeForm('birthDay', e)}
          val={formValues.birthDay}
          label="Birth day"
        />
      </div>
    </BackGround>
  )
}
