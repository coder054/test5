import { requireAuth } from 'src/config/firebase-admin'

import { Layout } from 'src/components/Layout'
import News from 'src/module/news'

const NewsPage = () => {
  return (
    <Layout title="Zporter">
      <News />
    </Layout>
  )
}

export default NewsPage

export const getServerSideProps: any = async ({ req, res }) => {
  await requireAuth(req as any, res as any)
  return { props: {} }
}
