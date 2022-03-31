import type { NextPage } from 'next'
import { AuthGuard } from 'src/components/authentication/auth-guard'
import DiaryUpdate from 'src/module/biography/diary'
import { DashboardLayout } from '../../components/dashboard/dashboard-layout'

const DiaryUpdatePage: NextPage = () => {
  return (
    <div className="laptopM:p-11">
      <DiaryUpdate />
    </div>
  )
}

DiaryUpdatePage.getLayout = (page) => (
  <AuthGuard>
    <DashboardLayout>{page}</DashboardLayout>
  </AuthGuard>
)

export default DiaryUpdatePage
