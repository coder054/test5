import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { MyButton } from 'src/components/MyButton'
import { MySelect } from 'src/components/MySelect'
import { API_PLAYER_SETTINGS } from 'src/constants/api.constants'
import { HeightAndWeightBody, HeightAndWeightType } from 'src/constants/types'
import { useIncrementNumber } from 'src/hooks/useIncrementNumber'
import { BackGround } from 'src/modules/account-settings/common-components/Background'
import { useAuth } from 'src/modules/authentication/auth/AuthContext'
import { getProfilePlayer } from 'src/service/biography-update'
import { axios } from 'src/utils/axios'

export const HeightAndWeight = () => {
  const { currentRoleName } = useAuth()
  const date = new Date()
  const [loading, setLoading] = useState<boolean>(false)
  const [values, setValues] = useState({
    height: '',
    weight: '',
    leftFootLength: '',
    rightFootLength: '',
  })

  const heightOptions = useIncrementNumber({
    startNumber: 120,
    endNumber: 220,
    meanSure: 'cm',
  })

  const weightOptions = useIncrementNumber({
    startNumber: 30,
    endNumber: 200,
    meanSure: 'kg',
  })
  const leftFootOptions = useIncrementNumber({
    startNumber: 10.0,
    endNumber: 50.0,
    meanSure: 'cm',
    incrementNumber: 0.5,
  })
  const rightFootOptions = useIncrementNumber({
    startNumber: 10.0,
    endNumber: 50.0,
    meanSure: 'cm',
    incrementNumber: 0.5,
  })

  const handleChangeForm = (type: keyof HeightAndWeightType, value: string) => {
    setValues((prev) => ({ ...prev, [type]: value }))
  }

  useEffect(() => {
    if (currentRoleName === 'PLAYER') {
      try {
        const res = getProfilePlayer()
        res.then((data) => {
          setValues({
            height: data.data.health.height.value,
            weight: data.data.health.weight.value,
            leftFootLength: data.data.health.leftFootLength,
            rightFootLength: data.data.health.rightFootLength,
          })
        })
      } catch (error) {}
    }
  }, [currentRoleName])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    const valuesUpdate: HeightAndWeightBody = {
      health: {
        height: {
          value: +values.height,
          updatedAt: date.toISOString(),
        },
        weight: {
          value: +values.weight,
          updatedAt: date.toISOString(),
        },
        leftFootLength: +values.leftFootLength,
        rightFootLength: +values.rightFootLength,
      },
    }

    try {
      const response = await axios.patch(API_PLAYER_SETTINGS, valuesUpdate)

      if (response.status === 200) {
        setLoading(false)
        toast.success(response.data)
        window.scroll(0, 0)
      }
    } catch (error) {
      setTimeout(() => {
        setLoading(false)
      }, 1000)
    }
    setTimeout(() => {
      setLoading(false)
    }, 1000)
  }

  return (
    <div className="space-y-5">
      <BackGround
        label="Height & Weight"
        className="2xl:w-3/5"
        contentClass="xl:w-[600px]"
      >
        <div className="space-y-6">
          <MySelect
            label="Height"
            onChange={(e) => handleChangeForm('height', e.target.value)}
            value={values.height}
            arrOption={heightOptions}
          />
          <MySelect
            label="Weight"
            onChange={(e) => handleChangeForm('weight', e.target.value)}
            value={values.weight}
            arrOption={weightOptions}
          />
          <div className="grid grid-cols-2 gap-x-6">
            <MySelect
              label="Left foot"
              onChange={(e) =>
                handleChangeForm('leftFootLength', e.target.value)
              }
              value={values.leftFootLength}
              arrOption={leftFootOptions}
            />
            <MySelect
              label="Right foot"
              onChange={(e) =>
                handleChangeForm('rightFootLength', e.target.value)
              }
              value={values.rightFootLength}
              arrOption={rightFootOptions}
            />
          </div>
        </div>
      </BackGround>
      <MyButton
        onClick={handleSubmit}
        isLoading={loading}
        type="submit"
        label="Save"
      />
    </div>
  )
}
