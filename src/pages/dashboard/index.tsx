import type { NextPage } from 'next'
import { AuthGuard } from 'src/components/authentication/auth-guard'
import { requireAuth } from 'src/config/firebase-admin'
import { DashboardLayout } from '../../components/dashboard/dashboard-layout'

const Dashboard: NextPage = () => {
  return <h1 className="text-white">Dashboard</h1>
}

Dashboard.getLayout = (page) => {
  return (
    <AuthGuard>
      <DashboardLayout>{page}</DashboardLayout>
    </AuthGuard>
  )
}

export default Dashboard
