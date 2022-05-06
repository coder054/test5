import type { NextPage } from 'next'
import Contacts from 'src/modules/contacts/'
import { DashboardLayout } from '../../components/dashboard/dashboard-layout'

const ContactsPage: NextPage = () => {
  return <Contacts />
}

ContactsPage.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>

export default ContactsPage
