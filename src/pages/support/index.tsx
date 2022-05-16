import type { NextPage } from 'next'
import { DashboardLayout } from '../../components/dashboard/dashboard-layout'

const SupportPage: NextPage = () => {
  return <div>Support</div>
}

SupportPage.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>

export default SupportPage
