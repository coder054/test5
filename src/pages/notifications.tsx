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

Notifications.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>

export const getServerSideProps: any = async ({ req, res }) => {
  await requireAuth(req as any, res as any)
  return { props: {} }
}

export default Notifications
