import { MyCheckbox } from './MyCheckbox'
import { Text } from 'src/components/Text'

export const Checklist = ({
  list,
  values,
  onChange,
}: {
  list: { label: string; value: string | number }[]
  values: (string | number)[]
  onChange: any
}) => {
  return (
    <div
      style={{
        boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
        backdropFilter: 'blur(68px)',
      }}
      className="rounded-[8px] bg-[#202128cc] w-[188px] max-h-[172px] overflow-y-auto
      
      "
    >
      {list.map((o, index) => (
        <div
          key={index}
          className="border-b border-Stroke 
        
          mr-[8px]
        "
        >
          <MyCheckbox
            label={o.label}
            checked={values.includes(o.label)}
            onChange={(e) => {
              onChange(e, o.label)
            }}
          />
          <Text name="body1" className="text-white  inline-block">
            {o.label}
          </Text>
        </div>
      ))}
    </div>
  )
}
