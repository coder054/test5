import { requireAuth } from 'config/firebase-admin'
import { GetServerSideProps, NextApiRequest, NextApiResponse } from 'next'
import { Layout } from 'components/Layout'
import News from 'module/news'

const NewsPage = () => {
  return (
    <Layout title="Zporter">
      {/* /// tabs */}
      <News />
    </Layout>
  )
}

export default NewsPage

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  await requireAuth(req as NextApiRequest, res as NextApiResponse)
  return { props: {} }
}
