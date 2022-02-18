import type { NextPage } from 'next'
import { DashboardLayout } from '../../components/dashboard/dashboard-layout'

const Overview: NextPage = () => {
  return <h1 className="text-white">Dashboard</h1>
}

Overview.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>

export default Overview
