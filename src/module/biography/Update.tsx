import { Divider, Tab, Tabs } from '@mui/material'
import React from 'react'
import { StringParam, useQueryParam, withDefault } from 'use-query-params'
import { BackGround } from '../account-settings/common-components/Background'
import { Skills } from './skills'

const tabs = [
  { label: 'Skills', value: 'skills' },
  { label: 'Development', value: 'development' },
  { label: 'Height & Weight', value: 'height' },
  { label: 'Trophies & Awards', value: 'trophies' },
  { label: 'Future Career', value: 'future ' },
  { label: 'Historic Career Data', value: 'historic' },
]

export const UpdateBiography = () => {
  const [currentTab, setCurrentTab] = useQueryParam(
    'child',
    withDefault(StringParam, 'skills')
  )

  const handleChangeTab = (_: any, value: string): void => {
    setCurrentTab(value)
  }

  return (
    <>
      <Tabs
        indicatorColor="secondary"
        onChange={handleChangeTab}
        variant="scrollable"
        scrollButtons="auto"
        textColor="secondary"
        value={currentTab}
      >
        {tabs.map((tab) => (
          <Tab key={tab.value} label={tab.label} value={tab.value} />
        ))}
      </Tabs>
      <Divider sx={{ mb: 3, borderBottomWidth: 0 }} />
      <>
        {currentTab === 'skills' && (
          <BackGround
            label="Player Skill update"
            className="2xl:w-3/5"
            contentClass="xl:w-[600px]"
          >
            <Skills />
          </BackGround>
        )}
      </>
    </>
  )
}
