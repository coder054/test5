import { requireAuth } from 'config/firebase-admin'
import { GetServerSideProps, NextApiRequest, NextApiResponse } from 'next'
import { Layout } from 'components/Layout'

const Programs = () => {
  return (
    <Layout title="Zporter">
      <div className="text-white ">Programs</div>
    </Layout>
  )
}

export default Programs

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  await requireAuth(req as NextApiRequest, res as NextApiResponse)
  return { props: {} }
}
