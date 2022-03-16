import { Divider, Tab, Tabs } from '@mui/material'
import React from 'react'
import { StringParam, useQueryParam, withDefault } from 'use-query-params'
import { Skills } from './skills'
import { Development } from './development'
import { HeightAndWeight } from './height-and-weight'
import { Trophies } from './trophies'

const tabs = [
  { label: 'Skills', value: 'skills' },
  { label: 'Development', value: 'development' },
  { label: 'Height & Weight', value: 'heightAndWeight' },
  { label: 'Trophies & Awards', value: 'trophies' },
  { label: 'Future Career', value: 'future ' },
  { label: 'Historic Career Data', value: 'historic' },
]
interface UpdateBiographyProps {
  playerId?: string
}

export const UpdateBiography = ({ playerId }: UpdateBiographyProps) => {
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
      {currentTab === 'skills' && <Skills playerId={playerId} />}
      {currentTab === 'development' && <Development />}
      {currentTab === 'heightAndWeight' && <HeightAndWeight />}
      {currentTab === 'trophies' && <Trophies />}
    </>
  )
}
