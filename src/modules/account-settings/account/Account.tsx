import clsx from 'clsx'
import { BasicDetail } from './components/BasicDetail'
import { Terms } from './components/Terms'

export const Account = ({ getSettings }) => {
  return (
    <div className={clsx('space-y-6')}>
      <BasicDetail getSettings={getSettings} />
      <Terms />
    </div>
  )
}
