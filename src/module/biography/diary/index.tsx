import clsx from 'clsx'
import { useAtom } from 'jotai'
import { useCallback, useEffect, useMemo, useState } from 'react'
import toast from 'react-hot-toast'
import {
  QueryClient,
  QueryClientProvider,
  useMutation,
  useQuery,
} from 'react-query'
import { diaryAtom } from 'src/atoms/diaryAtoms'
import { Loading } from 'src/components'
import { Button } from 'src/components/Button'
import { MyButton } from 'src/components/MyButton'
import { DiaryType, InjuryType } from 'src/constants/types/diary.types'
import { getPreviousDate, getToday } from 'src/hooks/functionCommon'
import { BackGround } from 'src/module/account-settings/common-components/Background'
import { useAuth } from 'src/module/authen/auth/AuthContext'
import {
  createDiary,
  deleteDiary,
  fetchDiary,
  updateDiary,
} from 'src/service/diary-update'
import { StringParam, useQueryParam, withDefault } from 'use-query-params'
import { Cap } from './cap'
import { BooleanOption } from './components/BooleanOption'
import { DateOptions } from './components/DateOptions'
import { InjuryList } from './components/InjuryList'
import { InjuryReport } from './components/InjuryReport'
import { MyModal } from './components/Modal'
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

type TypeofDiary = 'cap' | 'training' | 'match'

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
  const [submitForm, setSubmitForm] = useState<DiaryType>({})
  const [date, setDate] = useState<string | Date>(getToday())
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false)
  const [isHaveInjury, setIsHaveInjury] = useState<boolean>(false)
  const [injuryData, setInjuryData] = useState<InjuryType>(null)

  const injurySubmit = useMemo(() => {
    if (submitForm.injuries?.length === 0) {
      return null
    } else if (injuryData && injuryData?.injuryArea) {
      return injuryData
    } else return submitForm.injuries
  }, [JSON.stringify(injuryData), JSON.stringify(submitForm.injuries)])

  const isUpdate = useMemo(() => {
    return !!diary.diaryId
  }, [JSON.stringify(diary)])

  const [currentTab, setCurrentTab] = useQueryParam(
    'type',
    withDefault(StringParam, 'TEAM_TRAINING')
  )

  const { isLoading: isGettingDiary, data: diaryUpdate } = useQuery(
    ['diary', date],
    () => fetchDiary(date, currentRoleName)
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
        setDiary({
          eatAndDrink: 'NORMAL',
          energyLevel: 'NORMAL',
          sleep: 'NORMAL',
          typeOfDiary: 'TRAINING',
        })
        queryClient.invalidateQueries('diary')
      },
    }
  )

  const { mutate: mutateUpdate, isLoading: isUpdating } = useMutation(
    updateDiary,
    {
      onSuccess: () => {
        if (injuryData.injuryArea) {
          let newArr = [...diary.injuries]
          newArr.push(injuryData)
          setDiary((prev) => ({ ...prev, injuries: newArr }))
        }
        toast.success('Diary successfully updated')
        queryClient.invalidateQueries('diary')
      },
      onError: () => {
        toast.error('An error has occurred')
      },
    }
  )

  const filterType = useCallback(
    (currentTab: string) => {
      if (currentTab.includes('TRAINING') || currentTab === 'REST_DAY') {
        return 'TRAINING'
      } else return currentTab
    },
    [currentTab]
  )

  const handleSubmit = async () => {
    const requestData = {
      ...diary,
      ...submitForm,
      createdAt: getPreviousDate(date),
      injuries: injurySubmit,
    }
    isUpdate && delete requestData.createdAt
    isUpdate
      ? mutateUpdate({
          roleName: currentRoleName,
          data: requestData,
          type: filterType(currentTab).toLowerCase(),
          diaryId: diary.diaryId,
        })
      : mutateCreate({
          roleName: currentRoleName,
          data: requestData,
          type: filterType(currentTab).toLowerCase(),
        })
  }

  const handleDeleteDiary = async () => {
    mutateDelete(diary.diaryId)
  }

  const handleChange = (type: TypeofDiary, value: any) => {
    setSubmitForm({
      userType: type === 'cap' ? currentRoleName : null,
      typeOfDiary: filterType(currentTab),
      [type]: value,
    })
  }

  useEffect(() => {
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

  useEffect(() => {
    !diary.diaryId && setCurrentTab('TEAM_TRAINING')
    !diary.diaryId && setIsHaveInjury(false)
  }, [JSON.stringify(diary.diaryId), JSON.stringify(diaryUpdate)])

  useEffect(() => {
    diary.injuries?.length > 0 ? setIsHaveInjury(true) : setIsHaveInjury(false)
  }, [JSON.stringify(diary.injuries)])

  return (
    <Loading isLoading={isGettingDiary}>
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
              <Training
                onChange={(value) => handleChange('training', value)}
                diaryUpdate={diaryUpdate?.data}
                currentTab={currentTab}
              />
            )}
            {currentTab === 'MATCH' && (
              <Match onChange={(value) => handleChange('match', value)} />
            )}
            {currentTab === 'GROUP_TRAINING' && (
              <Training
                onChange={(value) => handleChange('training', value)}
                diaryUpdate={diaryUpdate?.data}
                currentTab={currentTab}
              />
            )}
            {currentTab === 'CAP' && (
              <Cap onChange={(value) => handleChange('cap', value)} />
            )}
            {currentTab === 'PERSONAL_TRAINING' && (
              <Training
                onChange={(value) => handleChange('training', value)}
                diaryUpdate={diaryUpdate?.data}
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
                <InjuryList />
              </>
            )}

            <MyModal isOpen={isOpenModal} onClose={setIsOpenModal}>
              <div className="flex flex-col items-center">
                <p className="text-[26px] font-medium mb-[25px]">Delete Data</p>
                <p className="text-[16px] font-bold mb-[10px]">
                  Are you sure you want to delete this?
                </p>
                <p className="text-[16px] font-normal mb-[15px]">
                  Your data will forever lost!
                </p>
                <div className="flex justify-between mt-[20px] space-x-8">
                  <MyButton
                    type="button"
                    label="Cancel"
                    onClick={() => setIsOpenModal(false)}
                  />
                  <Button
                    type="button"
                    loadingColor="#09E099"
                    className="border-2 border-[#09E099] px-[61px]  py-[9px] rounded-[8px]"
                    labelClass="text-[#09E099]"
                    onClick={handleDeleteDiary}
                    label="Delete"
                    isLoading={isDeleting}
                  />
                </div>
              </div>
            </MyModal>
          </div>
        </BackGround>
        <div className="mobileL:flex mobileL:space-x-4 mobileL:space-y-0 mobileM:space-y-4 mobileM:px-4 mobileM:pb-4 mobileL:px-0 mobileL:pb-0">
          <MyButton
            isLoading={isCreating || isUpdating}
            onClick={handleSubmit}
            type="submit"
            label={isUpdate ? 'Save & Update' : 'Save'}
          />
          <Button
            type="button"
            label="Delete Diary"
            onClick={() => setIsOpenModal(true)}
            className={clsx(
              'bg-[#D60C0C] px-[45px] py-[11px] rounded-[8px]',
              !isUpdate && 'hidden'
            )}
          />
        </div>
      </div>
    </Loading>
  )
}
