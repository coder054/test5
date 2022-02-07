import { requireAuth } from 'config/firebase-admin'
import { GetServerSideProps, NextApiRequest, NextApiResponse } from 'next'
import { Layout } from 'components/Layout'

const Biography = () => {
  return (
    <Layout title="Zporter">
      <div className="text-white ">Biography</div>
    </Layout>
  )
}

export default Biography

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  await requireAuth(req as NextApiRequest, res as NextApiResponse)
  return { props: {} }
}
