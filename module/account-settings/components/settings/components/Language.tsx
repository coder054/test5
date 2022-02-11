import { Form } from 'antd'
import { settingsAtom } from 'atoms/accountAndSettings'
import { MySelect } from 'components/MySelect'
import { MySelectCountry } from 'components/MySelectCountry'
import { useAtom } from 'jotai'
import { BackGround } from '../../common-components/Background'

export const Language = () => {
  const [account] = useAtom(settingsAtom)

  const countries =
    typeof window !== 'undefined'
      ? JSON.parse(localStorage.getItem('countries') || '[]')
      : null
  const handleChangeCountry = (_, value: { name: string; code: string }) => {
    console.log(value)
  }

  return (
    <BackGround
      label="Language"
      form={
        <div className="space-y-7">
          <Form.Item name="language">
            <MySelect
              label="Language"
              arrOption={[
                { value: 'English', label: 'English' },
                { value: 'Tieng Viet', label: 'Tieng Viet' },
              ]}
            />
          </Form.Item>
          <Form.Item name="country">
            <MySelectCountry
              onChange={handleChangeCountry}
              label="Country"
              arrOption={countries}
              value={{ name: 'Viet Nam' }}
            />
          </Form.Item>
          <Form.Item name="privacy">
            <MySelect
              label="Privacy"
              arrOption={[
                { value: 'Private', label: 'Private' },
                { value: 'Public', label: 'Public' },
              ]}
            />
          </Form.Item>
        </div>
      }
    />
  )
}
