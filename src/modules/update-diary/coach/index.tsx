import { MenuItem, TextField } from '@mui/material'
import clsx from 'clsx'
import dayjs from 'dayjs'
import { useAtom } from 'jotai'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import toast from 'react-hot-toast'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { COACH_DIARY_ATOM, PlAYER_REVIEWS } from 'src/atoms/diaryAtoms'
import { Loading, MyDatePicker } from 'src/components'
import { Button } from 'src/components/Button'
import { DiaryUpdateIcon } from 'src/components/icons/DiaryUpdateIcon'
import {
  QUERIES_DIARY,
  QUERIES_SETTINGS,
} from 'src/constants/query-keys/query-keys.constants'
import { ParticipateType, TypeOfDiaries } from 'src/constants/types/diary.types'
import { TeamType } from 'src/constants/types/settingsType.type'
import {
  flexingFormatDate,
  formatDate,
  getDefaultDay,
  getPreviousDate,
  getToday,
  upperFirst,
} from 'src/hooks/functionCommon'
import { useAuth } from 'src/modules/authentication/auth/AuthContext'
import {
  createDiary,
  fetchDiary,
  fetchSettings,
  updateDiary,
  deleteDiary,
} from 'src/service/diary-update'
import { Tabs } from '../player/components/Tabs'
import ParticipateButton from './components/ParticipateButton'
import {
  MatchParticipate,
  TrainingPariticapte,
} from './components/ParticipateItem'
import ParticipateList from './components/ParticipateList'
import Match from './match'
import Training from './training'
import ConfirmModalProps from '../components/ConfirmModal'

const ITEMS = [
  { label: 'Team Training', value: 'TEAM_TRAINING' },
  { label: 'Match', value: 'MATCH' },
  { label: 'Cap', value: 'CAP' },
]

export default function CoachDiary() {
  const queryClient = useQueryClient()
  const { currentRoleName } = useAuth()

  const [period, setPeriod] = useState<string>('default')

  const [isOpenList, setIsOpenList] = useState<boolean>(false)
  const [isHasError, setIsHasError] = useState<string>(undefined)
  const [currentTab, setCurrentTab] = useState<TypeOfDiaries | string>(
    'TEAM_TRAINING'
  )

  const [isOpenModal, setIsOpenModal] = useState<boolean>(false)
  const [participate, setParticipate] = useAtom(COACH_DIARY_ATOM)
  const [currentTeam, setCurrentTeam] = useState<TeamType>(undefined)
  const [initialDate, setInitialDate] = useState<string | Date>(getToday())
  const [requestData, setRequestData] = useState<ParticipateType>(undefined)

  console.log('Request: ', requestData)

  const { isLoading: isGettingDiary, data: diaries } = useQuery(
    [QUERIES_DIARY.COACH_DIARY, initialDate],
    () => fetchDiary(initialDate, currentRoleName)
  )

  const { isLoading: isGettingUserProfile, data: user } = useQuery(
    [QUERIES_SETTINGS.SETTINGS],
    () => fetchSettings(currentRoleName)
  )

  const { mutate: mutateCreate, isLoading: isCreating } = useMutation(
    createDiary,
    {
      onSuccess: () => {
        toast.success('Diary successfully created')
        queryClient.invalidateQueries(QUERIES_DIARY.COACH_DIARY)
        /* @ts-ignore */
        setParticipate(undefined)
      },
      onError: () => {
        toast.error('Something went wrong')
      },
    }
  )

  const { mutate: mutateUpdate, isLoading: isUpdating } = useMutation(
    updateDiary,
    {
      onSuccess: () => {
        toast.success('Diary successfully updated')
        queryClient.invalidateQueries(QUERIES_DIARY.COACH_DIARY)
      },
      onError: () => {
        toast.error('Something went wrong')
      },
    }
  )

  const { mutate: mutateDelete, isLoading: isDeleting } = useMutation(
    deleteDiary,
    {
      onSuccess: () => {
        toast.success('Diary successfully deleted')
        queryClient.invalidateQueries(QUERIES_DIARY.COACH_DIARY)
        /* @ts-ignore */
        setParticipate(undefined)
        setIsOpenModal(false)
      },
    }
  )

  const TEAMS = useMemo(() => {
    return user?.coachCareer?.currentTeams
  }, [JSON.stringify(user)])

  const IS_UPDATE = useMemo(() => {
    return participate?.isPeriod
  }, [JSON.stringify(participate)])

  const IS_TRAINING_PARTICIPATE = useMemo(() => {
    return (
      participate?.originalDiaryId &&
      participate.typeOfDiary === 'TRAINING' &&
      !participate?.isPeriod
    )
  }, [JSON.stringify(participate)])

  const IS_MATCH_PARTICIPATE = useMemo(() => {
    return (
      participate?.originalDiaryId &&
      participate.typeOfDiary === 'MATCH' &&
      !participate?.isPeriod
    )
  }, [JSON.stringify(participate)])

  const handleSubmit = useCallback(async () => {
    const data = {
      type: ['TEAM_TRAINING'].includes(currentTab)
        ? 'TRAINING'.toLowerCase()
        : currentTab.toLowerCase(),
      roleName: currentRoleName,
      data: {
        ...requestData,
        isPeriod: undefined,
        teamInfo: undefined,
        isParticipate: undefined,
        teamId: currentTeam?.teamId,
        createdAt: requestData?.createdAt
          ? formatDate(requestData?.createdAt)
          : getPreviousDate(initialDate),
        typeOfDiary: ['TEAM_TRAINING'].includes(currentTab)
          ? 'TRAINING'
          : currentTab,
      },
    }
    if (isHasError) {
      toast.error(isHasError)
      return
    } else if (!currentTeam) {
      toast.error('Please choose your Team Training')
      return
    } else if (IS_UPDATE) {
      mutateUpdate({
        ...data,
        diaryId: participate.diaryId,
      })
    } else mutateCreate({ ...data })
  }, [JSON.stringify(requestData), currentTeam, isHasError])

  const handleDeleteDiary = useCallback(async () => {
    mutateDelete(participate.diaryId)
  }, [JSON.stringify(participate?.diaryId)])

  const handleChangeTeam = useCallback(
    (teamId: string) => {
      setCurrentTeam(TEAMS.find((team: TeamType) => team.teamId === teamId))
    },
    [TEAMS]
  )

  const handleChangeDiary = useCallback(
    (item: ParticipateType) => {
      setCurrentTab(
        item.typeOfDiary === 'TRAINING' ? 'TEAM_TRAINING' : item.typeOfDiary
      )
      /* @ts-ignore */
      setParticipate({ ...item, isPeriod: true })
      setCurrentTeam(item.teamInfo)
    },
    [JSON.stringify(currentTab)]
  )

  useEffect(() => {
    setIsOpenList(false)
    if (!participate?.isPeriod || !participate?.diaryId) {
      setPeriod('default')
    }
  }, [JSON.stringify(participate)])

  useEffect(() => {
    setIsHasError(undefined)
    if (!participate?.isPeriod) {
      /* @ts-ignore */
      setParticipate(undefined)
      setPeriod('default')
    }
  }, [initialDate, currentTab])

  useEffect(() => {
    return () => {
      /* @ts-ignore */
      setParticipate(undefined)
    }
  }, [])

  return (
    <Loading
      isLoading={isGettingDiary || isGettingUserProfile}
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
            {/* @ts-ignore */}
            <MenuItem onClick={() => setParticipate(undefined)} value="default">
              {getDefaultDay(initialDate)}
            </MenuItem>
            {(diaries?.data || []).map((item: ParticipateType) => (
              <MenuItem
                key={item.diaryId}
                value={item.diaryId}
                onClick={() => handleChangeDiary(item)}
              >
                {`${flexingFormatDate(item.createdAt, 'HH:mm')} - ${upperFirst(
                  item.typeOfDiary
                )}`}
              </MenuItem>
            ))}
          </TextField>
          <MyDatePicker
            adjustable
            label="Date"
            size="small"
            value={initialDate}
            onChange={setInitialDate}
            maxDate={dayjs(getToday()).toDate()}
            minDate={dayjs(new Date()).add(-7, 'day').toDate()}
          />
        </div>
        <ConfirmModalProps
          isOpen={isOpenModal}
          onClose={setIsOpenModal}
          onConfirm={handleDeleteDiary}
          isLoading={isDeleting}
        />
        <TextField
          select
          fullWidth
          defaultValue=""
          key={currentTeam?.teamId}
          value={currentTeam?.teamId}
          onChange={(e) => handleChangeTeam(e.target.value)}
          label="Choose your Team Training"
        >
          {(TEAMS || []).map((team: TeamType) => (
            <MenuItem key={team.teamId} value={team.teamId} id={team.teamId}>
              {team.teamName}
            </MenuItem>
          ))}
        </TextField>
        <p className="text-base text-gray-400 font-medium">
          Any football or other training?
        </p>
        <Tabs value={ITEMS} onChange={setCurrentTab} current={currentTab} />
        <ParticipateButton
          isOpen={setIsOpenList}
          currentTab={currentTab}
          matches={diaries?.unregisteredMatch}
          teamTrainings={diaries?.unregisteredTeamTraining}
        />
        <ParticipateList
          date={initialDate}
          isOpen={isOpenList}
          currentTab={currentTab}
          onClose={setIsOpenList}
        />
        <div className="pb-2">
          {IS_TRAINING_PARTICIPATE && (
            <TrainingPariticapte value={participate} disabled />
          )}
          {IS_MATCH_PARTICIPATE && (
            <MatchParticipate value={participate} disabled />
          )}
        </div>
        {currentTab === 'TEAM_TRAINING' && (
          <Training
            currentTab={currentTab}
            onChange={setRequestData}
            isHasError={setIsHasError}
          />
        )}
        {currentTab === 'MATCH' && (
          <Match
            userProfile={user}
            team={currentTeam}
            onChange={setRequestData}
          />
        )}
        <div className="mobileM:flex mobileM:flex-col tabletM:grid tabletM:grid-cols-3 mobileM:space-y-4 tabletM:space-y-0 gap-x-4 pt-3">
          <Button
            type="submit"
            isLoading={IS_UPDATE ? isUpdating : isCreating}
            onClick={handleSubmit}
            label={IS_UPDATE ? 'Save & Update' : 'Save'}
            className="bg-[#4654EA] w-full py-3 rounded-[8px]"
          />
          <Button
            type="button"
            label="Delete Diary"
            onClick={() => setIsOpenModal(true)}
            className={clsx(
              'bg-[#D60C0C] w-full py-3 rounded-[8px]',
              !IS_UPDATE && 'hidden'
            )}
          />
        </div>
      </div>
    </Loading>
  )
}
