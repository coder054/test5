import { requireNotAuth } from 'src/config/firebase-admin'
import Landing from '../module/landing'
// import { Landing } from 'src/module/landing-page/LandingPage'

const LandingPage = () => {
  return <Landing />
}

export default LandingPage

export const getServerSideProps: any = async ({ req, res }) => {
  await requireNotAuth(req as any, res as any)
  return { props: {} }
}
