import type { NextPage } from 'next'
import { AuthGuard } from 'src/components/authentication/auth-guard'
import { AccountSettings } from 'src/modules/account-settings'
import { DashboardLayout } from '../../components/dashboard/dashboard-layout'

const AccountSettingsPage: NextPage = () => {
  return <AccountSettings />
}

AccountSettingsPage.getLayout = (page) => (
  <AuthGuard>
    <DashboardLayout>{page}</DashboardLayout>
  </AuthGuard>
)

export default AccountSettingsPage
