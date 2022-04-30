import { NextPage } from 'next'
import { DashboardLayout } from 'src/components/dashboard/dashboard-layout'
import { requireAuth } from 'src/config/firebase-admin'
import { NewsCategory } from 'src/modules/feed/component/news-category.tsx'

const News: NextPage = () => {
  return <NewsCategory />
}

News.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>

export const getServerSideProps: any = async ({ req, res }) => {
  await requireAuth(req as any, res as any)
  return { props: {} }
}

export default News
