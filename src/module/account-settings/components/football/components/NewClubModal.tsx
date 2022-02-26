import { notification } from 'antd'
import { useState } from 'react'
import { MyButton } from 'src/components/MyButton'
import { MyInput } from 'src/components/MyInput'
import { MySelectCountry } from 'src/components/MySelectCountry'
import { API_GET_LIST_CLUB } from 'src/constants/api.constants'
import { ClubType } from 'src/constants/types/settingsType.type'
import { useAuth } from 'src/module/authen/auth/AuthContext'
import { axios } from 'src/utils/axios'

type NewClubModal = {
  handleClose: () => void
}

export const NewClubModal = ({ handleClose }: NewClubModal) => {
  const { currentRoleId } = useAuth()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [formValues, setFormValues] = useState<ClubType>({
    arena: '',
    city: '',
    clubId: '',
    clubName: '',
    country: {
      alpha2Code: '',
      alpha3Code: '',
      phoneCode: '',
      flag: '',
      name: '',
      region: '',
    },
    logoUrl: '',
    nickName: '',
    websiteUrl: '',
  })

  const handleChangeForm = (type: keyof ClubType, value: string) => {
    setFormValues((prev) => ({ ...prev, [type]: value }))
  }

  const handleSubmit = async () => {
    setIsLoading(true)
    const res = await axios.post(
      API_GET_LIST_CLUB,
      /* @ts-ignore */
      { ...formValues, country: formValues.country.name },
      {
        headers: {
          roleId: currentRoleId,
        },
      }
    )
    if (res.status === 201) {
      notification['success']({
        message: 'Add new Club successfully',
      })
      setIsLoading(false)
      setTimeout(() => {
        handleClose && handleClose()
      }, 1000)
    } else {
      notification['error']({
        message: 'Add new Club failed',
      })
    }
  }

  return (
    <div className="space-y-7">
      <MyInput
        onChange={(e) => handleChangeForm('clubName', e.target.value)}
        value={formValues.clubName}
        label="Club name"
      />
      <MyInput
        onChange={(e) => handleChangeForm('logoUrl', e.target.value)}
        value={formValues.logoUrl}
        label="Logo url"
      />
      <MyInput
        onChange={(e) => handleChangeForm('nickName', e.target.value)}
        value={formValues.nickName}
        label="Nick name"
      />
      <MyInput
        onChange={(e) => handleChangeForm('city', e.target.value)}
        value={formValues.city}
        label="City"
      />
      <MySelectCountry
        onChange={(_, value) => handleChangeForm('country', value)}
        val={formValues.country}
        label="Country"
      />
      <MyInput
        onChange={(e) => handleChangeForm('arena', e.target.value)}
        value={formValues.arena}
        label="Arena"
      />
      <MyInput
        onChange={(e) => handleChangeForm('websiteUrl', e.target.value)}
        value={formValues.websiteUrl}
        label="Website url"
      />
      <MyButton
        onClick={handleSubmit}
        isLoading={isLoading}
        type="submit"
        label="Save"
        className="w-full mt-6"
      />
    </div>
  )
}
