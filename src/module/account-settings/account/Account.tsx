import clsx from 'clsx'
import { BasicDetail } from './components/BasicDetail'
import { Terms } from './components/Terms'

export const Account = () => {
  return (
    <div className={clsx('space-y-6')}>
      <BasicDetail />
      <Terms />
    </div>
  )
}
