import { GuestGuard } from 'src/components/authentication/guest-guard'
import { requireNotAuth } from 'src/config/firebase-admin'
// import Landing from '../module/landing'
import { Landing } from 'src/module/landing-page/LandingPage'

const LandingPage = () => {
  return (
    <GuestGuard>
      <Landing />
    </GuestGuard>
  )
}

export default LandingPage
