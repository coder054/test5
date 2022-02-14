import { Layout } from 'components/Layout'
import { requireAuth } from 'config/firebase-admin'
import { GetServerSideProps, NextApiRequest, NextApiResponse } from 'next'
import { AccountSettings } from 'module/account-settings'

const AccountAndSettings = () => {
  return (
    <Layout title="Zporter">
      <AccountSettings />
    </Layout>
  )
}

export default AccountAndSettings

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  await requireAuth(req as NextApiRequest, res as NextApiResponse)
  return { props: {} }
}
