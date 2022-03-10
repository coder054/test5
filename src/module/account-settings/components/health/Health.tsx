import { InputAdornment } from '@mui/material'
import { notification } from 'antd'
import { useAtom } from 'jotai'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { settingsAtom } from 'src/atoms/accountAndSettings'
import { MyButton } from 'src/components/MyButton'
import { MyInput } from 'src/components/MyInput'
import { useAuth } from 'src/module/authen/auth/AuthContext'
import { axios } from 'src/utils/axios'
import { BackGround } from '../common-components/Background'

type HealthTypes = {
  weight: string
  height: string
  leftFootLength: string
  rightFootLength: string
}

export const Health = () => {
  const [account, setAccount] = useAtom(settingsAtom)
  const { currentRoleName, currentRoleId } = useAuth()

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [formValues, setFormValues] = useState<HealthTypes>()
  const handleChange = (type: keyof HealthTypes, value: string) => {
    setFormValues((prev) => ({ ...prev, [type]: value }))
  }

  const handleSubmit = async () => {
    setIsLoading(true)
    const submitForm = {
      rightFootLength: +formValues.rightFootLength,
      leftFootLength: +formValues.leftFootLength,
      height: {
        value: +formValues.height,
        updateAt: new Date(),
      },
      weight: {
        value: +formValues.weight,
        updateAt: new Date(),
      },
    }
    await axios
      .patch(`users/${currentRoleName}/settings`, {
        health: submitForm,
      })
      .then(() => {
        setAccount({ ...account, health: submitForm })
        setIsLoading(false)
        toast.success('Successfully updated')
      })
      .catch(() => {
        setIsLoading(false)
        toast.error('An error has occurred')
      })
  }

  useEffect(() => {
    account &&
      setFormValues({
        rightFootLength: account.health.rightFootLength.toString(),
        leftFootLength: account.health.leftFootLength.toString(),
        weight: account.health.weight.value.toString(),
        height: account.health.height.value.toString(),
      })
  }, [account])

  return (
    <div className="space-y-6">
      <BackGround
        label="Health"
        form={
          <div className="space-y-7">
            <MyInput
              label="Weight"
              value={formValues?.weight}
              onChange={(e) => handleChange('weight', e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">cm</InputAdornment>
                ),
              }}
            />
            <MyInput
              label="Height"
              value={formValues?.height}
              onChange={(e) => handleChange('height', e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">cm</InputAdornment>
                ),
              }}
            />
            <div className="grid grid-cols-2 gap-x-6">
              <MyInput
                label="Left foot"
                value={formValues?.leftFootLength}
                onChange={(e) => handleChange('leftFootLength', e.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">cm</InputAdornment>
                  ),
                }}
              />
              <MyInput
                label="Right foot"
                value={formValues?.rightFootLength}
                onChange={(e) =>
                  handleChange('rightFootLength', e.target.value)
                }
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">cm</InputAdornment>
                  ),
                }}
              />
            </div>
          </div>
        }
      />
      <MyButton
        onClick={handleSubmit}
        isLoading={isLoading}
        type="submit"
        label="Save"
      />
    </div>
  )
}
