import { Language } from './components/Language'
import { Notifications } from './components/Notifications'

export const Settings = () => {
  return (
    <div className="space-y-6">
      <Language />
      <Notifications />
    </div>
  )
}
