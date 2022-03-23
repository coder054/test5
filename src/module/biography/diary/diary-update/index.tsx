import { useAtom } from 'jotai'
import { useEffect, useState } from 'react'
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'
import { diaryAtom } from 'src/atoms/diaryAtoms'
import { Loading } from 'src/components'
import { MyButton } from 'src/components/MyButton'
import { getToday } from 'src/hooks/functionCommon'
import { BackGround } from 'src/module/account-settings/common-components/Background'
import { useAuth } from 'src/module/authen/auth/AuthContext'
import { fetchDiary } from 'src/service/diary-update'
import { StringParam, useQueryParam, withDefault } from 'use-query-params'
import { BooleanOption } from './components/BooleanOption'
import { DateOptions } from './components/DateOptions'
import { InjuryReport } from './components/InjuryReport'
import { Tabs } from './components/Tabs'
import { Health } from './health'
import { Match } from './match'
import { Training } from './training'
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
})

const ITEMS = [
  { label: 'Team Training', value: 'TEAM_TRAINING' },
  { label: 'Match', value: 'MATCH' },
  { label: 'Group Training', value: 'GROUP_TRAINING' },
  { label: 'Cap', value: 'CAP' },
  { label: 'Personal Training', value: 'PERSONAL_TRAINING' },
  { label: 'Rest day', value: 'REST_DAY' },
]

export const DiaryUpdate = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Component />
    </QueryClientProvider>
  )
}

const Component = () => {
  const { currentRoleName } = useAuth()
  const [diary, setDiary] = useAtom(diaryAtom)
  const [date, setDate] = useState<string | Date>(getToday())
  const [isHaveInjury, setIsHaveInjury] = useState<boolean>(false)
  const [currentTab, setCurrentTab] = useQueryParam(
    'training',
    withDefault(StringParam, 'TEAM_TRAINING')
  )

  const { isLoading, data: diaryUpdate } = useQuery(['diary', date], () =>
    fetchDiary(date, currentRoleName)
  )

  useEffect(() => {
    if (!diary.diaryId) {
      setCurrentTab('TEAM_TRAINING')
    }
    if (diary.diaryId && diary.typeOfDiary === 'TRAINING') {
      setCurrentTab(diary.training.typeOfTraining)
    }
    if (diary.diaryId && diary.typeOfDiary === 'REST') {
      setCurrentTab(diary.training.typeOfTraining)
    }
    if (diary.diaryId && diary.typeOfDiary === 'MATCH') {
      setCurrentTab('MATCH')
    }
    if (diary.diaryId && diary.typeOfDiary === 'CAP') {
      setCurrentTab('CAP')
    }
  }, [JSON.stringify(diary)])

  return (
    <Loading isLoading={isLoading}>
      <div className="space-y-5">
        <BackGround
          label="Diary update"
          className="2xl:w-3/5"
          contentClass="xl:w-[600px]"
        >
          <div className="space-y-9">
            <DateOptions
              diaryUpdate={diaryUpdate?.data}
              onChangeDiary={setDiary}
              onChange={setDate}
              date={date}
            />
            <Health date={date} />
            <Tabs value={ITEMS} onChange={setCurrentTab} current={currentTab} />
            {currentTab === 'TEAM_TRAINING' && (
              <Training currentTab={currentTab} />
            )}
            {currentTab === 'MATCH' && <Match />}
            {currentTab === 'GROUP_TRAINING' && (
              <Training currentTab={currentTab} />
            )}
            {currentTab === 'CAP' && <Match />}
            {currentTab === 'PERSONAL_TRAINING' && (
              <Training currentTab={currentTab} />
            )}
            {currentTab === 'REST_DAY' && <></>}
            <BooleanOption
              label="Any pains or injurys to report?"
              onChange={setIsHaveInjury}
              value={isHaveInjury}
              first="Yes"
              second="No"
            />
            {isHaveInjury && <InjuryReport />}
          </div>
        </BackGround>
        <MyButton type="submit" label="Save" />
      </div>
    </Loading>
  )
}
