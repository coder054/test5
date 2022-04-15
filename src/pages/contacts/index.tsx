import type { NextPage } from 'next'
import { requireAuth } from 'src/config/firebase-admin'
import { DashboardLayout } from '../../components/dashboard/dashboard-layout'
import Contacts from 'src/modules/contacts/'

const ContactsPage: NextPage = () => {
  return <Contacts />
}

ContactsPage.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>

export const getServerSideProps: any = async ({ req, res }) => {
  await requireAuth(req as any, res as any)
  return { props: {} }
}

export default ContactsPage
