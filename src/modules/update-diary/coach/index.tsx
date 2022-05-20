import { MenuItem, TextField } from '@mui/material'
import dayjs from 'dayjs'
import { useAtom } from 'jotai'
import React, { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { COACH_DIARY_ATOM } from 'src/atoms/diaryAtoms'
import { Loading, MyDatePicker } from 'src/components'
import { DiaryUpdateIcon } from 'src/components/icons/DiaryUpdateIcon'
import { QUERIES_DIARY } from 'src/constants/query-keys/query-keys.constants'
import {
  CoachDiaryType,
  ParticipateType,
  TypeOfDiaries,
} from 'src/constants/types/diary.types'
import {
  flexingFormatDate,
  getDefaultDay,
  getToday,
  upperFirst,
} from 'src/hooks/functionCommon'
import { useAuth } from 'src/modules/authentication/auth/AuthContext'
import { fetchDiary } from 'src/service/diary-update'
import { Tabs } from '../player/components/Tabs'
import ParticipateButton from './components/ParticipateButton'
import ParticipateList from './components/ParticipateList'
import Training from './training'

const ITEMS = [
  { label: 'Team Training', value: 'TEAM_TRAINING' },
  { label: 'Match', value: 'MATCH' },
  { label: 'Cap', value: 'CAP' },
]

export default function CoachDiary() {
  const { currentRoleName } = useAuth()

  const [period, setPeriod] = useState<string>('default')
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false)
  const [currentTab, setCurrentTab] = useState<TypeOfDiaries | string>(
    'TEAM_TRAINING'
  )

  const [participate, setParticipate] = useAtom(COACH_DIARY_ATOM)
  const [initialDate, setInitialDate] = useState<string | Date>(getToday())
  const [initialValues, setInitialValues] = useState<ParticipateType>(undefined)

  const { isLoading: isGettingDiary, data } = useQuery(
    [QUERIES_DIARY.COACH_DIARY, initialDate],
    () => fetchDiary(initialDate, currentRoleName)
  )

  useEffect(() => {
    setIsOpenModal(false)
  }, [JSON.stringify(participate?.diaryId)])

  useEffect(() => {
    return () => {
      /* @ts-ignore */
      setParticipate(undefined)
    }
  }, [])

  return (
    <Loading
      isLoading={isGettingDiary}
      className="tabletM:h-[850px] overflow-y-auto  mobileM:py-2 mobileM:pb-24 tabletM:pb-0 tabletM:py-0"
    >
      <div className="space-y-5 p-9">
        <div className="w-full flex flex-col items-center space-y-2 pb-3">
          <DiaryUpdateIcon />
          <p className="text-[24px] font-medium text-white">Diary Update</p>
        </div>
        <div className="mobileL:grid mobileL:grid-cols-2 mobileL:gap-x-20 mobileM:flex mobileM:flex-col-reverse mobileM:gap-y-4">
          <TextField
            select
            fullWidth
            size="small"
            label="Period"
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
          >
            <MenuItem value="default">{getDefaultDay(initialDate)}</MenuItem>
            {(data?.data || []).map((item: CoachDiaryType) => (
              <MenuItem key={item.diaryId} value={item.diaryId}>
                {`${flexingFormatDate(item.createdAt, 'HH:mm')} - ${upperFirst(
                  item.typeOfDiary
                )}`}
              </MenuItem>
            ))}
          </TextField>
          <MyDatePicker
            isNextable
            label="Date"
            size="small"
            value={initialDate}
            onChange={setInitialDate}
            maxDate={dayjs(getToday()).toDate()}
            minDate={dayjs(new Date()).add(-7, 'day').toDate()}
          />
        </div>
        <ParticipateList
          date={initialDate}
          isOpen={isOpenModal}
          diaryType={currentTab}
          onClose={setIsOpenModal}
        />
        <p className="text-base text-gray-400 font-medium">
          Any football or other training?
        </p>
        <Tabs value={ITEMS} onChange={setCurrentTab} current={currentTab} />
        <ParticipateButton isOpen={setIsOpenModal} />
        <Training />
      </div>
    </Loading>
  )
}
