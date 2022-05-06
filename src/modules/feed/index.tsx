import { Tab, Tabs } from '@mui/material'
import { ButtonAddFeed } from 'src/components/button-add-popup/button-add-feed'
import { StringParam, useQueryParam, withDefault } from 'use-query-params'
import { TabAll } from './component/all'
import { TabFriends } from './component/friends'
import { TabNews } from './component/news'
import { TabYours } from './component/yours'

const tabs = [
  { label: 'All', value: 'all' },
  { label: 'News', value: 'news' },
  { label: 'Friends', value: 'friends' },
  { label: 'Teammates', value: 'teammates' },
  { label: 'Yours', value: 'yours' },
  { label: 'Family', value: 'family' },
  { label: 'Saved', value: 'saved' },
]

const News = () => {
  const [currentTab, setCurrentTab] = useQueryParam(
    't',
    withDefault(StringParam, 'all')
  )

  const handleTabsChange = (_, value: string): void => {
    setCurrentTab(value)
  }

  return (
    <div className="w-full space-y-7 mb-[108px]">
      <Tabs
        sx={{ mb: 3 }}
        value={currentTab}
        onChange={handleTabsChange}
        indicatorColor="secondary"
        variant="scrollable"
        scrollButtons="auto"
        textColor="secondary"
      >
        {tabs.map((tab) => (
          <Tab key={tab.value} label={tab.label} value={tab.value}></Tab>
        ))}
      </Tabs>

      {currentTab === 'all' && <TabAll />}
      {currentTab === 'news' && <TabNews />}
      {currentTab === 'friends' && <TabFriends />}
      {currentTab === 'yours' && <TabYours />}

      <ButtonAddFeed />
    </div>
  )
}

export default News
