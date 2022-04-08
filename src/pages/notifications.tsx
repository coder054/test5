import { AuthGuard } from 'src/components/authentication/auth-guard'
import { DashboardLayout } from 'src/components/dashboard/dashboard-layout'
import { NotificationsList } from 'src/components/noti/NotificationsList'
import { requireAuth } from 'src/config/firebase-admin'

const Notifications = () => {
  return (
    <div className=" ">
      <NotificationsList></NotificationsList>
    </div>
  )
}

Notifications.getLayout = (page) => (
  <AuthGuard>
    <DashboardLayout>{page}</DashboardLayout>
  </AuthGuard>
)

export default Notifications
