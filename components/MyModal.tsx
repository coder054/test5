import { Modal } from 'antd'
import { Children, Dispatch, ReactChild, SetStateAction } from 'react'
import { Text } from './Text'

export const MyModal = ({
  show,
  setShow,
  width,
  children,
}: {
  show: boolean
  setShow: Dispatch<SetStateAction<boolean>>
  width: number
  children: ReactChild
}) => {
  return (
    <Modal
      width={width}
      footer={null}
      title={null}
      visible={show}
      maskClosable={false}
      closable={false}
      centered
      onOk={() => {
        setShow(false)
      }}
      onCancel={() => {
        setShow(false)
      }}
    >
      {children}
    </Modal>
  )
}
