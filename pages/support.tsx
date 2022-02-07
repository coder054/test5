import { requireAuth } from 'config/firebase-admin'
import { GetServerSideProps, NextApiRequest, NextApiResponse } from 'next'
import { Layout } from 'components/Layout'
import { getCookieFromReq } from 'hooks/functionCommon'

const Support = () => {
  return (
    <Layout title="Zporter">
      <div className="text-white ">Support</div>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  await requireAuth(req as NextApiRequest, res as NextApiResponse)
  return { props: {} }
}

export default Support
