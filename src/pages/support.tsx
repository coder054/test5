import { requireAuth } from 'src/config/firebase-admin'

import { Layout } from 'src/components/Layout'
import { getCookieFromReq } from 'src/hooks/functionCommon'

const Support = () => {
  return (
    <Layout title="Zporter">
      <div className="text-white ">Support</div>
    </Layout>
  )
}

export const getServerSideProps: any = async ({ req, res }) => {
  await requireAuth(req as any, res as any)
  return { props: {} }
}

export default Support
