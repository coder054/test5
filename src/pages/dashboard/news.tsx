import type { NextPage } from 'next'
import { requireAuth } from 'src/config/firebase-admin'
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

export const getServerSideProps: any = async ({ req, res }) => {
  await requireAuth(req as any, res as any)
  return { props: {} }
}

export default NewsPage
