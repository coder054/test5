import type { NextPage } from 'next'
import { AuthGuard } from 'src/components/authentication/auth-guard'
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

NewsPage.getLayout = (page) => (
  <AuthGuard>
    <DashboardLayout> {page}</DashboardLayout>
  </AuthGuard>
)

export default NewsPage
