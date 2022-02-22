import type { NextPage } from 'next'
import { AuthGuard } from 'src/components/authentication/auth-guard'
import { DashboardLayout } from '../../components/dashboard/dashboard-layout'

const Overview: NextPage = () => {
  return <h1 className="text-white">aaa</h1>
}

Overview.getLayout = (page) => {
  return (
    <AuthGuard>
      <DashboardLayout>{page}</DashboardLayout>
    </AuthGuard>
  )
}

export default Overview
