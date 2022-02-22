import type { NextPage } from 'next'
import News from 'src/module/news'
import { DashboardLayout } from '../../components/dashboard/dashboard-layout'

const NewsPage: NextPage = () => {
  return (
    <div className="lg:p-7">
      <News />
    </div>
  )
}

NewsPage.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>

export default NewsPage
