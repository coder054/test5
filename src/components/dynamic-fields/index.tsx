import { Form, Space } from 'antd'
import { MyInput } from 'src/components/MyInput'
import { MySelect } from 'src/components/MySelect'
import { SvgAddSmall, SvgSubSmall } from 'src/imports/svgs'
import { OptionCoach, OptionPlayer } from 'src/modules/authentication/types'

interface AddInputProps {
  name: string
  message?: string
  label: string
  maxField: number
  type?: string
  profile?: string
  className?: string
}

export const DynamicFields = ({
  name,
  message,
  label,
  maxField,
  profile,
  type,
  className,
}: AddInputProps) => {
  return (
    <Form.List name={name}>
      {(fields, { add, remove }) => {
        return (
          <>
            <div className=" h-[100px] "></div>
            <div className="relative ">
              <div
                onClick={() => {
                  if (fields.length >= maxField - 1) return
                  add()
                }}
                className="w-[24px] absolute right-[4px] top-[-36px] cursor-pointer ml-[12px]"
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
                        className="w-[270px] md:w-[430px]"
                        label={'Favorite Role(s)'}
                        // value={yourClub}
                        onChange={(e) => {
                          // setYourClub(e.target.value)
                        }}
                        arrOption={
                          profile
                            ? profile === 'player'
                              ? OptionPlayer
                              : OptionCoach
                            : [
                                { value: '1', label: '1' },
                                { value: '2', label: '2' },
                              ]
                        }
                      />
                    ) : (
                      <MyInput
                        label={label}
                        name={name}
                        className="w-[270px] md:w-[430px]"
                      />
                    )}
                  </Form.Item>

                  {fields.length > 0 ? (
                    <div
                      onClick={() => remove(field.name)}
                      className="ml-[5px] -mt-[22px] cursor-pointer"
                    >
                      <SvgSubSmall />
                    </div>
                  ) : null}
                </Space>
              ))}
            </div>
          </>
        )
      }}
    </Form.List>
  )
}
