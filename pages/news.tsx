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
