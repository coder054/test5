import { requireAuth } from 'config/firebase-admin'
import { GetServerSideProps, NextApiRequest, NextApiResponse } from 'next'
import { Layout } from 'components/Layout'

const Challenges = () => {
  return (
    <Layout title="Zporter">
      <div className="text-white ">Challenges</div>
    </Layout>
  )
}

export default Challenges

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  await requireAuth(req as NextApiRequest, res as NextApiResponse)
  return { props: {} }
}
