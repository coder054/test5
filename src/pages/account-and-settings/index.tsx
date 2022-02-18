import { Layout } from 'src/components/Layout'
import { requireAuth } from 'src/config/firebase-admin'

import { AccountSettings } from 'src/module/account-settings'

const AccountAndSettings = () => {
  return (
    <Layout title="Zporter">
      <AccountSettings />
    </Layout>
  )
}

export default AccountAndSettings

export const getServerSideProps: any = async ({ req, res }) => {
  await requireAuth(req as any, res as any)
  return { props: {} }
}
