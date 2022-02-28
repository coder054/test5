import type { NextPage } from 'next'
import { AuthGuard } from 'src/components/authentication/auth-guard'
import { requireAuth } from 'src/config/firebase-admin'
import { DashboardLayout } from '../../components/dashboard/dashboard-layout'

const Overview: NextPage = () => {
  return <h1 className="text-white">bbb</h1>
}

Overview.getLayout = (page) => {
  return <DashboardLayout>{page}</DashboardLayout>
}

export const getServerSideProps: any = async ({ req, res }) => {
  await requireAuth(req as any, res as any)
  return { props: {} }
}

export default Overview
