import { requireAuth } from 'config/firebase-admin'
import { GetServerSideProps, NextApiRequest, NextApiResponse } from 'next'
import { Layout } from 'components/Layout'

const Contact = () => {
  return (
    <Layout title="Zporter">
      <div className="text-white ">Contact</div>
    </Layout>
  )
}

export default Contact

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  await requireAuth(req as NextApiRequest, res as NextApiResponse)
  return { props: {} }
}
