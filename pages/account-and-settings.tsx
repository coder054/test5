import { Layout } from 'components/Layout'
import { requireAuth } from 'config/firebase-admin'
import { GetServerSideProps, NextApiRequest, NextApiResponse } from 'next'

const AccountAndSettings = () => {
  return (
    <Layout title="Zporter">
      <div className="text-white ">Account & Settings</div>
    </Layout>
  )
}

export default AccountAndSettings

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  await requireAuth(req as NextApiRequest, res as NextApiResponse)
  return { props: {} }
}
