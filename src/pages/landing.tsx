import { GuestGuard } from 'src/components/authentication/guest-guard'
import { requireNotAuth } from 'src/config/firebase-admin'
import Landing from 'src/module/landing'

const LandingPage = () => {
  return (
    <GuestGuard>
      <Landing />
    </GuestGuard>
  )
}

export default LandingPage
