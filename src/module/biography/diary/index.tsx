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
import { DiaryType } from 'src/constants/types/diary.types'
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
        queryClient.invalidateQueries('diary')
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
        toast.success('Diary successfully updated')
        queryClient.invalidateQueries('diary')
      },
    }
  )

  const filterType = (currentTab: string) => {
    if (currentTab.includes('TRAINING') || currentTab === 'REST_DAY') {
      return 'TRAINING'
    } else return currentTab
  }

  const handleSubmit = async () => {
    const requestData = {
      ...submitForm,
      createdAt: getPreviousDate(date),
      injuries: submitForm.injuries?.length === 0 ? null : submitForm.injuries,
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

  const isUpdate = useMemo(() => {
    return !!diary.diaryId
  }, [JSON.stringify(diary)])

  const handleChange = useCallback(
    (type: TypeofDiary, value: any) => {
      setSubmitForm({
        ...diary,
        userType: type === 'cap' ? currentRoleName : null,
        typeOfDiary: filterType(currentTab),
        [type]: value,
      })
    },
    [JSON.stringify(diary), currentTab]
  )

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
  }, [JSON.stringify(diary.diaryId), JSON.stringify(diaryUpdate)])

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
                currentTab={currentTab}
              />
            )}
            {currentTab === 'MATCH' && (
              <Match onChange={(value) => handleChange('match', value)} />
            )}
            {currentTab === 'GROUP_TRAINING' && (
              <Training
                onChange={(value) => handleChange('training', value)}
                currentTab={currentTab}
              />
            )}
            {currentTab === 'CAP' && (
              <Cap onChange={(value) => handleChange('cap', value)} />
            )}
            {currentTab === 'PERSONAL_TRAINING' && (
              <Training
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
            {isHaveInjury && <InjuryReport />}
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
        <div className="laptopM:flex laptopM:space-x-4 mobileM:pb-5 mobileM:px-2 mobileM:space-y-4">
          <MyButton
            isLoading={isCreating || isUpdating}
            onClick={handleSubmit}
            type="submit"
            label={isUpdate ? 'Update' : 'Save'}
          />
          {isUpdate && (
            <Button
              type="button"
              label="Delete Diary"
              onClick={() => setIsOpenModal(true)}
              className="bg-[#D60C0C] px-[45px] py-[11px] rounded-[8px]"
            />
          )}
        </div>
      </div>
    </Loading>
  )
}
