import { ButtonAdd } from 'components/ButtonAdd'
import { Comments } from 'components/Comments'
import { FootballersSlider } from 'components/Feed/FootballersSlider/FootballersSlider'
import { GreenSlider } from 'components/GreenSlider'
// import { MyInput } from 'components/MyInput'
import { RainbowSlider } from 'components/RainbowSlider'
import { TagCloud } from 'components/TagCloud'
import { useState } from 'react'
import { TextField } from '@mui/material'
import { MyInput } from 'components/MyInput'
import { Layout } from 'components/Layout'
import { ItemEventHeadlines } from 'constants/item-event-headline'
import { ItemEventHeadline } from 'components/item-event-headline'
import { TabPanel, Tabs } from 'components/Tabs'

enum Tab {
  Friends = 'Friends',
  News = 'News',
  Diary = 'Diary',
}

const tabs = [{ text: Tab.Friends }, { text: Tab.News }, { text: Tab.Diary }]

const Components = () => {
  const [value, setValue] = useState(7)
  const [valueInput, setValueInput] = useState('')
  const [tab, setTab] = useState()

  return (
    <Layout>
      <div className=" w-full min-h-screen bg-[#111115] ">
        <Tabs tab={tab} setTab={setTab} tabs={tabs} />
        <TabPanel visible={tab === Tab.Friends}>
          <div className="text-white ">Friends</div>
        </TabPanel>
        <TabPanel visible={tab === Tab.News}>
          <div className="text-white ">News</div>
        </TabPanel>
        <TabPanel visible={tab === Tab.Diary}>
          <div className="text-white ">Diary</div>
        </TabPanel>

        <div className="h-[60px] "></div>

        <FootballersSlider />

        <div className="h-[60px] "></div>

        <div className="flex space-x-3 items-end ">
          <span className="font-semibold text-Green text-[24px] leading-[138%] ">
            Positive list
          </span>
          <span className="text-Grey font-medium text-[16px] leading-[175%] ">
            65 Results
          </span>
        </div>

        <div className="h-[60px] "></div>

        <div className="w-[507px] ">
          <TagCloud
            tags={[
              { label: 'HOME', link: '#' },
              { label: 'STAKE', link: '#' },
              { label: 'MARKETPLACE', link: '#' },
              { label: 'tsraw', link: '#' },
              { label: 'wzzf', link: '#' },
              { label: 'mgpnx', link: '#' },
              { label: 'w{}zx', link: '#' },
              { label: '5wrw', link: '#' },
            ]}
          />
        </div>

        <div className="h-[60px] "></div>
        <div className="w-[384px]">
          <Comments />
        </div>

        <div className="h-[60px] "></div>

        <ButtonAdd />

        <div className=" w-[439px] ">
          <GreenSlider />
        </div>

        <div className="h-[60px] "></div>
        <div className=" w-[439px] ">
          <RainbowSlider min={0} max={10} value={value} setValue={setValue} />
        </div>

        <div className="h-[60px] "></div>

        <div className="my-6 w-[439px] ">
          <MyInput
            placeholder={'Username'}
            value={valueInput}
            handleChange={(e) => {
              setValueInput(e.target.value)
            }}
          />
        </div>

        <div className="h-[60px] "></div>

        <ItemEventHeadline className="w-full" item={ItemEventHeadlines} />

        <div className="h-[60px] "></div>
      </div>
    </Layout>
  )
}

export default Components
