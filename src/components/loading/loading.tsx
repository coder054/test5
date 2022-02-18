import { Spin } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'

interface LoadingProps {
  size?: number
  color?: string
}

export const Loading = ({ size, color }: LoadingProps) => {
  const antIcon = (
    <LoadingOutlined
      style={{ fontSize: size || 20, color: color || '#fff' }}
      spin
    />
  )

  return <Spin indicator={antIcon}></Spin>
}
