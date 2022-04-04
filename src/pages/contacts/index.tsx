import { Box, Container, Divider, Tab, Tabs } from '@mui/material'
import type { NextPage } from 'next'
import { ChangeEvent, useState } from 'react'
import { requireAuth } from 'src/config/firebase-admin'
import { Friends } from 'src/module/contacts/Friends'
import { Groups } from 'src/module/contacts/Groups'
import { Teams } from 'src/module/contacts/Teams'
import { DashboardLayout } from '../../components/dashboard/dashboard-layout'
const tabs = [
  { label: 'Friends', value: 'friends' },
  // { label: 'Groups', value: 'groups' },
  { label: 'Teams', value: 'teams' },
]

const ContactsPage: NextPage = () => {
  const [currentTab, setCurrentTab] = useState<string>('friends')

  const handleTabsChange = (event: ChangeEvent<{}>, value: string): void => {
    setCurrentTab(value)
  }

  return (
    <>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 1,
          px: 2,
        }}
      >
        <Container
          maxWidth="xl"
          sx={{
            px: 0,
          }}
        >
          <Tabs
            indicatorColor="secondary"
            onChange={handleTabsChange}
            variant="scrollable"
            scrollButtons="auto"
            textColor="secondary"
            value={currentTab}
            sx={{ mt: 3 }}
          >
            {tabs.map((tab) => (
              <Tab key={tab.value} label={tab.label} value={tab.value} />
            ))}
          </Tabs>
          <Divider sx={{ mb: 3, borderBottomWidth: 0 }} />
          {currentTab === 'friends' && <Friends />}
          {currentTab === 'teams' && <Teams />}
          {/* {currentTab === 'groups' && <Groups />} */}
        </Container>
      </Box>
    </>
  )
}

ContactsPage.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>

export const getServerSideProps: any = async ({ req, res }) => {
  await requireAuth(req as any, res as any)
  return { props: {} }
}

export default ContactsPage
