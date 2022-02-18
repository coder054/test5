
import { requireNotAuth } from 'src/config/firebase-admin'
import Landing from 'src/module/landing'

const LandingPage = () => {
  return <Landing />
}

export default LandingPage

export const getServerSideProps: any = async ({ req, res }) => {
  await requireNotAuth(req as any, res as any)
  return { props: {} }
}
