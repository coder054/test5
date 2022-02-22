import { Form } from 'antd'
import { ReactElement } from 'react'
import { MyInput } from 'src/components/MyInput'
import { BackGround } from '../common-components/Background'

export const Football = () => {
  const [form] = Form.useForm()
  const test = () => {
    console.log(form.getFieldsValue(true))
  }

  return (
    <BackGround
      label="Health"
      form={
        <Form form={form}>
          <Form.List name="health">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <Form.Item
                    {...restField}
                    name={[name, 'yourTeam']}
                    className="mb-5"
                  >
                    <MyInput label="Your team(s)" />
                  </Form.Item>
                ))}
                <button onClick={() => add()}>Add</button>
              </>
            )}
          </Form.List>
          <button onClick={test}>Submit</button>
        </Form>
      }
    />
  )
}
