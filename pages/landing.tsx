import { GetServerSideProps, NextApiRequest, NextApiResponse } from 'next'
import { requireNotAuth } from 'config/firebase-admin'
import Landing from 'module/landing'

const LandingPage = () => {
  return <Landing />
}

export default LandingPage

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  await requireNotAuth(req as NextApiRequest, res as NextApiResponse)
  return { props: {} }
}
