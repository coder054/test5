import { Spin } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'

interface LoadingProps {
  size?: number
}

export const Loading = ({ size }: LoadingProps) => {
  const antIcon = (
    <LoadingOutlined style={{ fontSize: size || 20, color: '#FFFFFF' }} spin />
  )

  return <Spin indicator={antIcon}></Spin>
}
