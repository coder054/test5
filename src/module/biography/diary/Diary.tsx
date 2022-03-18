import { Divider, Tab, Tabs } from '@mui/material'
import React, { useEffect } from 'react'
import { StringParam, useQueryParam, withDefault } from 'use-query-params'
import { DiaryUpdate } from './diary-update'

const tabs = [
  { label: 'Diary', value: 'diary' },
  { label: 'Training', value: 'training' },
  { label: 'Match', value: 'match' },
  { label: 'Caps', value: 'caps' },
]

export const Diary = () => {
  const [currentTab, setCurrentTab] = useQueryParam(
    'child',
    withDefault(StringParam, 'diary')
  )

  const handleChangeTab = (_: any, value: string): void => {
    setCurrentTab(value)
  }

  useEffect(() => {
    return () => {
      setCurrentTab(undefined)
    }
  }, [])

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
      {currentTab === 'diary' && <DiaryUpdate />}
      {currentTab === 'training' && <></>}
      {currentTab === 'match' && <></>}
      {currentTab === 'caps' && <></>}
    </>
  )
}
