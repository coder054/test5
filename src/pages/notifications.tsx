import { AuthGuard } from 'src/components/authentication/auth-guard'
import { DashboardLayout } from 'src/components/dashboard/dashboard-layout'
import { NotificationsList } from 'src/components/noti/NotificationsList'
import { requireAuth } from 'src/config/firebase-admin'

const Notifications = () => {
  return (
    <div className=" ">
      <div className="p-4 ">
        <div className="mx-auto w-full max-w-[500px] ">
          <div className="font-bold mb-[20px] ">Notifications</div>
          <NotificationsList></NotificationsList>
        </div>
      </div>
    </div>
  )
}

Notifications.getLayout = (page) => (
  <AuthGuard>
    <DashboardLayout>{page}</DashboardLayout>
  </AuthGuard>
)

export default Notifications
