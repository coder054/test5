import { Form, Space } from 'antd'
import { MyInput } from 'components/MyInput'
import { MySelect } from 'components/MySelect'
import { OptionType } from 'constants/types'
import { SvgAddSmall, SvgSubSmall } from 'imports/svgs'
import { useState } from 'react'

interface AddInputProps {
  name: string
  message?: string
  label: string
  maxField: number
  type?: string
}

export const DynamicFields = ({
  name,
  message,
  label,
  maxField,
  type,
}: AddInputProps) => {
  return (
    <Form.List name="fields">
      {(fields, { add, remove }) => {
        return (
          <div className="h-56px">
            <div
              onClick={() => {
                if (fields.length >= maxField - 1) return
                add()
              }}
              className="w-[24px] float-left ml-[12px] cursor-pointer mt-[16px]"
            >
              <SvgAddSmall />
            </div>
            {fields.map((field, index) => (
              <Space key={field.key}>
                <Form.Item
                  name={[index, 'name']}
                  rules={[{ required: true, message: message }]}
                >
                  {type === 'select' ? (
                    <MySelect
                      signupForm
                      className="w-[430px]"
                      label={'Favorite Role(s)'}
                      // value={yourClub}
                      onChange={(e) => {
                        // setYourClub(e.target.value)
                      }}
                      arrOption={[
                        { value: '1', label: '1' },
                        { value: '2', label: '2' },
                      ]}
                    />
                  ) : (
                    <MyInput label={label} name={name} className="w-[430px]" />
                  )}
                </Form.Item>

                {fields.length > 0 ? (
                  <div
                    onClick={() => remove(field.name)}
                    className="ml-[5px] h-[56px] mt-[10px] cursor-pointer"
                  >
                    <SvgSubSmall />
                  </div>
                ) : null}
              </Space>
            ))}
          </div>
        )
      }}
    </Form.List>
  )
}
