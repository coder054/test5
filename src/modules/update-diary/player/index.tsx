import clsx from 'clsx'
import { useAtom } from 'jotai'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useMemo, useState } from 'react'
import toast from 'react-hot-toast'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { dateAtom, diaryAtom } from 'src/atoms/diaryAtoms'
import { Loading } from 'src/components'
import { Button } from 'src/components/Button'
import { DiaryUpdateIcon } from 'src/components/icons/DiaryUpdateIcon'
import { QUERIES_DASHBOARD } from 'src/constants/query-keys/query-keys.constants'
import { DashboardUpdatesType } from 'src/constants/types/dashboard/training.types'
import { DiaryType, InjuryType } from 'src/constants/types/diary.types'
import {
  getPreviousDate,
  getStartOfDate,
  getToday,
} from 'src/hooks/functionCommon'
import { useAuth } from 'src/modules/authentication/auth/AuthContext'
import {
  createDiary,
  deleteDiary,
  fetchDiary,
  updateDiary,
} from 'src/service/diary-update'
import ConfirmModalProps from '../components/ConfirmModal'
import { Cap } from './cap'
import { BooleanOption } from './components/BooleanOption'
import { DateOptions } from './components/DateOptions'
import { InjuryList } from './components/InjuryList'
import { InjuryReport } from './components/InjuryReport'
import { Tabs } from './components/Tabs'
import { Health } from './health'
import { Match } from './match'
import { Training } from './training'

const ITEMS = [
  { label: 'Team Training', value: 'TEAM_TRAINING' },
  { label: 'Match', value: 'MATCH' },
  { label: 'Group Training', value: 'GROUP_TRAINING' },
  { label: 'Cap', value: 'CAP' },
  { label: 'Personal Training', value: 'PERSONAL_TRAINING' },
  { label: 'Rest day', value: 'REST_DAY' },
]

type TypeofDiary = 'cap' | 'training' | 'match'

type DiaryUpdateProps = {
  selected?: DashboardUpdatesType
  isWellness?: boolean
  onClose?: (value: boolean) => void
}

const PlayerDiary = ({ selected, onClose, isWellness }: DiaryUpdateProps) => {
  const router = useRouter()
  const queryClient = useQueryClient()
  const { currentRoleName } = useAuth()
  const [date, setDate] = useAtom(dateAtom)
  const [diary, setDiary] = useAtom(diaryAtom)
  const [submitForm, setSubmitForm] = useState<DiaryType>({})

  const [isOpenModal, setIsOpenModal] = useState<boolean>(false)
  const [isHaveInjury, setIsHaveInjury] = useState<boolean>(false)
  const [injuryData, setInjuryData] = useState<InjuryType>(null)

  const [currentTab, setCurrentTab] = useState('TEAM_TRAINING')
  const [error, setError] = useState<string>('')

  const { isLoading: isGettingDiary, data: diaryUpdate } = useQuery(
    ['diary', date],
    () => fetchDiary(date, currentRoleName)
  )

  const { mutate: mutateCreateInjury, isLoading: isAddingInjury } = useMutation(
    createDiary,
    {
      onSuccess: (data) => {
        toast.success('Add injury successfully')
        if (injuryData.injuryArea) {
          setDiary((prev) => ({
            ...prev,
            diaryId: data.data.diaryId,
            injuries: data.data.injuries,
          }))
        }
      },
    }
  )

  const { mutate: mutateCreate, isLoading: isCreating } = useMutation(
    createDiary,
    {
      onSuccess: () => {
        toast.success('Diary successfully created')
        setDiary({
          eatAndDrink: 'NORMAL',
          energyLevel: 'NORMAL',
          sleep: 'NORMAL',
          typeOfDiary: 'TRAINING',
        })
        queryClient.invalidateQueries('diary')
        queryClient.invalidateQueries(QUERIES_DASHBOARD.TRAINING_DATA)
        queryClient.invalidateQueries(QUERIES_DASHBOARD.MATCHES_DATA)
        queryClient.invalidateQueries(QUERIES_DASHBOARD.WELLNESS_DATA)
        onClose(false)
        router.push({
          pathname: '/dashboard',
          query: { d: handleNavigate(currentTab) },
        })
      },
      onError: () => {
        toast.error('Please complete all fields')
      },
    }
  )

  const { mutate: mutateDelete, isLoading: isDeleting } = useMutation(
    deleteDiary,
    {
      onSuccess: () => {
        toast.success('Diary successfully deleted')
        setIsOpenModal(false)
        onClose(false)
        setDiary({
          eatAndDrink: 'NORMAL',
          energyLevel: 'NORMAL',
          sleep: 'NORMAL',
          typeOfDiary: 'TRAINING',
        })
        queryClient.invalidateQueries('diary')
        queryClient.invalidateQueries(QUERIES_DASHBOARD.TRAINING_DATA)
        queryClient.invalidateQueries(QUERIES_DASHBOARD.MATCHES_DATA)
        queryClient.invalidateQueries(QUERIES_DASHBOARD.WELLNESS_DATA)
        router.push({
          pathname: '/dashboard',
          query: { d: handleNavigate(currentTab) },
        })
      },
    }
  )

  const { mutate: mutateUpdate, isLoading: isUpdating } = useMutation(
    updateDiary,
    {
      onSuccess: (data) => {
        toast.success('Diary successfully updated')
        if (injuryData.injuryArea) {
          setDiary((prev) => ({ ...prev, injuries: data.data }))
        }
        queryClient.invalidateQueries(QUERIES_DASHBOARD.TRAINING_DATA)
        queryClient.invalidateQueries(QUERIES_DASHBOARD.MATCHES_DATA)
        queryClient.invalidateQueries(QUERIES_DASHBOARD.WELLNESS_DATA)
      },
    }
  )

  const injurySubmit = useMemo(() => {
    if (submitForm.injuries?.length === 0) {
      return null
    } else if (injuryData && injuryData?.injuryArea) {
      return injuryData
    } else return submitForm.injuries
  }, [JSON.stringify(injuryData), JSON.stringify(submitForm.injuries)])

  const isUpdate = useMemo(() => {
    return !!diary?.diaryId
  }, [JSON.stringify(diary)])

  const filterType = useCallback(
    (currentTab: string) => {
      if (currentTab?.includes('TRAINING') || currentTab === 'REST_DAY') {
        return 'TRAINING'
      } else return currentTab
    },
    [currentTab]
  )

  const handleNavigate = (type: string) => {
    if (type.includes('TRAINING')) {
      return 'training'
    } else if (type === 'CAP' || type === 'MATCH') {
      return 'matches'
    }
    return 'overview'
  }

  const requestData = useMemo(() => {
    return {
      ...diary,
      ...submitForm,
      createdAt: getPreviousDate(date),
      injuries: injurySubmit,
      typeOfDiary: currentTab === 'REST_DAY' ? 'REST' : submitForm.typeOfDiary,
    }
  }, [
    JSON.stringify(diary),
    JSON.stringify(submitForm),
    JSON.stringify(injurySubmit),
  ])

  const handleAddInjury = async () => {
    if (isUpdate) {
      handleSubmit()
    } else
      mutateCreateInjury({
        roleName: currentRoleName,
        data: requestData,
        type: filterType(currentTab).toLowerCase(),
      })
  }

  const handleSubmit = useCallback(async () => {
    if (error) {
      toast.error(error)
    } else {
      isUpdate && delete requestData.createdAt
      isUpdate
        ? mutateUpdate({
            roleName: currentRoleName,
            data: requestData,
            type: filterType(currentTab)?.toLowerCase(),
            diaryId: diary.diaryId,
          })
        : mutateCreate({
            roleName: currentRoleName,
            data: requestData,
            type: filterType(currentTab)?.toLowerCase(),
          })
    }
  }, [
    currentTab,
    JSON.stringify(diary),
    JSON.stringify(submitForm),
    JSON.stringify(injurySubmit),
  ])

  const handleDeleteDiary = useCallback(async () => {
    mutateDelete(diary.diaryId)
  }, [JSON.stringify(diary?.diaryId)])

  const handleChange = (type: TypeofDiary, value: any) => {
    setSubmitForm({
      userType: type === 'cap' ? currentRoleName : null,
      typeOfDiary: filterType(currentTab),
      [type]: value,
    })
  }

  useEffect(() => {
    if (diary?.diaryId && diary.typeOfDiary === 'TRAINING') {
      setCurrentTab(diary.training?.typeOfTraining)
    }
    if (diary?.diaryId && diary.typeOfDiary === 'REST') {
      setCurrentTab(diary.training?.typeOfTraining)
    }
    if (diary?.diaryId && diary.typeOfDiary === 'MATCH') {
      setCurrentTab('MATCH')
    }
    if (diary?.diaryId && diary.typeOfDiary === 'CAP') {
      setCurrentTab('CAP')
    }
  }, [JSON.stringify(diary?.typeOfDiary)])

  useEffect(() => {
    selected ? setDate(getStartOfDate(selected.createdAt)) : setDate(getToday())
  }, [selected])

  useEffect(() => {
    !diary?.diaryId && setCurrentTab('TEAM_TRAINING')
    !diary?.diaryId && setIsHaveInjury(false)
  }, [JSON.stringify(diary?.diaryId), JSON.stringify(diaryUpdate)])

  useEffect(() => {
    diary?.injuries?.length > 0 ? setIsHaveInjury(true) : setIsHaveInjury(false)
  }, [JSON.stringify(diary?.injuries)])

  useEffect(() => {
    setError('')
  }, [currentTab])

  return (
    <Loading
      isLoading={isGettingDiary}
      className="tabletM:h-[850px] overflow-y-auto  mobileM:py-2 mobileM:pb-24 tabletM:pb-0 tabletM:py-0"
    >
      <div className="space-y-5 mobileM:p-4 tabletM:p-9">
        <div className="w-full flex tabletM:flex-col tabletM:items-center space-y-2 pb-3">
          <span className="mobileM:hidden tabletM:block">
            <DiaryUpdateIcon />
          </span>
          <p className="text-[24px] font-medium text-white">Diary Update</p>
        </div>
        <div className="space-y-9">
          <DateOptions
            diaryUpdate={diaryUpdate?.data}
            onChangeDiary={setDiary}
            isSelected={selected}
            onChange={setDate}
            date={date}
          />
          {(isWellness || !selected) && <Health date={date} />}
          <Tabs value={ITEMS} onChange={setCurrentTab} current={currentTab} />
          {currentTab === 'TEAM_TRAINING' && (
            <Training
              error={setError}
              onChange={(value) => handleChange('training', value)}
              currentTab={currentTab}
            />
          )}
          {currentTab === 'MATCH' && (
            <Match
              error={setError}
              onChange={(value) => handleChange('match', value)}
            />
          )}
          {currentTab === 'GROUP_TRAINING' && (
            <Training
              error={setError}
              onChange={(value) => handleChange('training', value)}
              currentTab={currentTab}
            />
          )}
          {currentTab === 'CAP' && (
            <Cap onChange={(value) => handleChange('cap', value)} />
          )}
          {currentTab === 'PERSONAL_TRAINING' && (
            <Training
              error={setError}
              onChange={(value) => handleChange('training', value)}
              currentTab={currentTab}
            />
          )}
          {currentTab === 'REST_DAY' && <></>}
          <BooleanOption
            label="Any pains or injurys to report?"
            onChange={setIsHaveInjury}
            value={isHaveInjury}
            first="Yes"
            second="No"
          />
          {isHaveInjury && (
            <>
              <InjuryReport
                diaryUpdate={diaryUpdate}
                onChange={setInjuryData}
              />
              <InjuryList diaryUpdate={diaryUpdate?.data} />
            </>
          )}
          <ConfirmModalProps
            isOpen={isOpenModal}
            onClose={setIsOpenModal}
            onConfirm={handleDeleteDiary}
            isLoading={isDeleting}
          />
        </div>
        <div className="mobileM:flex mobileM:flex-col tabletM:grid tabletM:grid-cols-3 mobileM:space-y-4 tabletM:space-y-0 gap-x-4 pt-3">
          <Button
            type="submit"
            isLoading={isCreating || isUpdating}
            label={isUpdate ? 'Save & Update' : 'Save'}
            onClick={handleSubmit}
            className={clsx('bg-[#4654EA] w-full py-3 rounded-[8px]')}
          />
          {isHaveInjury && injuryData?.injuryArea && (
            <Button
              type="button"
              isLoading={isAddingInjury || isUpdating}
              label="Save & Add another injury"
              onClick={handleAddInjury}
              labelClass="text-[#09E099]"
              className="border-2 border-[#09E099] w-full py-[9px] px-2 rounded-[8px]"
            />
          )}
          <Button
            type="button"
            label="Delete Diary"
            onClick={() => setIsOpenModal(true)}
            className={clsx(
              'bg-[#D60C0C] w-full py-3 rounded-[8px]',
              !isUpdate && 'hidden'
            )}
          />
        </div>
      </div>
    </Loading>
  )
}

export default PlayerDiary
