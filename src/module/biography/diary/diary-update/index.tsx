import { MenuItem } from '@mui/material'
import dayjs from 'dayjs'
import { useAtom } from 'jotai'
import _ from 'lodash'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'
import { diaryAtom, diaryResponseAtom } from 'src/atoms/diaryAtoms'
import { MyDatePicker, MyInput, MyLoading } from 'src/components'
import { MyButton } from 'src/components/MyButton'
import { MySlider } from 'src/components/MySlider'
import { API_DIARY, API_GET_DIARY } from 'src/constants/api.constants'
import { DiaryType } from 'src/constants/types/diary.types'
import {
  formatUnixDate,
  generateRateByNumber,
  generateRateByString,
  getStartOfDate,
  getToday,
} from 'src/hooks/functionCommon'
import { BackGround } from 'src/module/account-settings/common-components/Background'
import { useAuth } from 'src/module/authen/auth/AuthContext'
import { axios } from 'src/utils/axios'
import { toQueryString } from 'src/utils/common.utils'
import { StringParam, useQueryParam, withDefault } from 'use-query-params'
import { BooleanOption } from './components/BooleanOption'
import { InjuryReport } from './components/InjuryReport'
import { Tabs } from './components/Tabs'
import { Training } from './components/Training'

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
  const [currentTab, setCurrentTab] = useQueryParam(
    'training',
    withDefault(StringParam, 'TEAM_TRAINING')
  )

  const { currentRoleName } = useAuth()
  const [diary, setDiary] = useAtom(diaryAtom)
  const [date, setDate] = useState<string | Date>(getToday())
  const [diaryUpdate, setDiaryUpdate] = useAtom(diaryResponseAtom)
  const [isHaveInjury, setIsHaveInjury] = useState<boolean>(false)

  console.log(diary)

  const fetchDiary = async (date?: string | Date) => {
    return axios
      .get(
        toQueryString(
          `${API_DIARY}/${currentRoleName.toLowerCase()}/${API_GET_DIARY}`,
          { createdAt: getStartOfDate(date) }
        )
      )
      .then((res) => setDiaryUpdate(res.data))
      .catch(() => {
        toast.error('An error has occurred')
      })
  }

  const { isLoading } = useQuery(['diary', date], () => fetchDiary(date))

  useEffect(() => {
    return () => {
      setCurrentTab(undefined)
    }
  }, [])

  return (
    <div className="space-y-5">
      <MyLoading isLoading={isLoading} />
      <BackGround
        label="Diary update"
        className="2xl:w-3/5"
        contentClass="xl:w-[600px]"
      >
        <div className="space-y-9">
          <div className="grid grid-cols-2 gap-x-20">
            <MyInput
              defaultValue="default"
              size="small"
              label="Period"
              select
              fullWidth
            >
              <MenuItem value="default">
                {dayjs(date).isSame(dayjs(new Date()), 'day')
                  ? 'Today'
                  : 'New diary'}
              </MenuItem>
              {(diaryUpdate.data || []).map((it: DiaryType) => (
                <MenuItem
                  key={it.diaryId}
                  value={it.diaryId}
                  onClick={() => setDiary(it)}
                >
                  {`${formatUnixDate(it.createdAt, 'HH:mm')} - ${_.upperFirst(
                    it.typeOfDiary.toLowerCase()
                  )}`}
                </MenuItem>
              ))}
            </MyInput>
            <MyDatePicker
              label="Date"
              size="small"
              isNextable
              maxDate={dayjs(getToday()).toDate()}
              value={date}
              onChange={(val) => setDate(val)}
            />
          </div>
          <MySlider
            label="How is your energy level?"
            onChange={(e) =>
              setDiary((prev) => ({
                ...prev,
                energyLevel: generateRateByNumber(e),
              }))
            }
            isAdjective
            step={25}
            value={generateRateByString(diary.energyLevel)}
            labelClass="text-[#A2A5AD]"
          />
          <MySlider
            label="How did you sleep?"
            onChange={(e) =>
              setDiary((prev) => ({ ...prev, sleep: generateRateByNumber(e) }))
            }
            isAdjective
            step={25}
            value={generateRateByString(diary.sleep)}
            labelClass="text-[#A2A5AD]"
          />
          <MySlider
            label="How did you eat and drink?"
            onChange={(e) =>
              setDiary((prev) => ({
                ...prev,
                eatAndDrink: generateRateByNumber(e),
              }))
            }
            isAdjective
            step={25}
            value={generateRateByString(diary.eatAndDrink)}
            labelClass="text-[#A2A5AD]"
          />
          <Tabs value={ITEMS} onChange={setCurrentTab} current={currentTab} />
          {currentTab === 'TEAM_TRAINING' && <Training />}
          <BooleanOption
            label="Any pains or injurys to report?"
            value={isHaveInjury}
            first="Yes"
            second="No"
            onChange={setIsHaveInjury}
          />

          {isHaveInjury && <InjuryReport />}
        </div>
      </BackGround>
      <MyButton type="submit" label="Save" />
    </div>
  )
}
