import clsx from 'clsx'
import dayjs from 'dayjs'
import { useAtom } from 'jotai'
import { upperFirst as _upperFirst } from 'lodash'
import React, { Fragment, useMemo } from 'react'
import { COACH_DIARY_ATOM } from 'src/atoms/diaryAtoms'
import { ParticipateType, TypeOfDiaries } from 'src/constants/types/diary.types'
import { upperFirst } from 'src/hooks/functionCommon'
import { safeHttpImage } from 'src/utils/utils'
import DonutChart from './DonutChart'

interface ItemProps {
  value?: ParticipateType
}

const TrainingPariticapte = ({ value }: ItemProps) => {
  const [selectedParticipate, setSelectedParticipate] =
    useAtom(COACH_DIARY_ATOM)

  const TRAINING_RESPONSE = useMemo(() => {
    const { mental, physics, tactics, technics } = value.training
    const obj = { mental, physics, tactics, technics }
    return Object.keys(obj).map((key) => ({
      key: _upperFirst(key),
      value: obj[key],
    }))
  }, [JSON.stringify(value.training)])

  return (
    <div
      /* @ts-ignore */
      onClick={() => setSelectedParticipate(value)}
      className={clsx(
        'flex items-center  border-2  hover:border-gray-500 duration-150 cursor-pointer active:bg-gray-800 pt-2 px-4 rounded-lg justify-between',
        selectedParticipate?.originalDiaryId === value.originalDiaryId
          ? 'border-gray-500 bg-gray-800'
          : 'border-transparent bg-black'
      )}
    >
      <DonutChart value={TRAINING_RESPONSE} />
      <div className="mb-2 text-xl w-full text-left tracking-wide">
        <p>{upperFirst(value.training.typeOfTraining)}</p>
        <p className="text-gray-400 font-medium text-base">
          {dayjs(value.createdAt).format('YYYY/MM/DD')}
        </p>
      </div>
      <p className="px-2 w-40 text-center py-6 bg-slate-900 text-gray-400 font-base font-semibold mb-2 rounded-lg border-2 border-gray-500">
        {value.training.hoursOfPractice}h
      </p>
    </div>
  )
}

const MatchParticipate = ({ value }: ItemProps) => {
  return (
    <button
      // onClick={() => setSelectedParticipate(value)}
      className="bg-white w-full active:bg-gray-300 rounded-lg py-2 flex items-center justify-between text-black font-medium text-lg"
    >
      <p className="w-32 text-right">{value.match.club.clubName}</p>
      <div className="flex items-center space-x-4 justify-between">
        <img
          src={safeHttpImage(value?.match.club.logoUrl)}
          className="w-7 h-7 rounded-full object-cover object-center"
        />

        <p className="bg-[#4654EA] w-28 py-4 rounded-lg text-center text-white font-medium text-lg tracking-wider">
          {`${value.match.result.yourTeam} : ${value.match.result.opponents}`}
        </p>
        <img
          src={safeHttpImage(value?.match.opponentClub.logoUrl)}
          className="w-7 h-7 rounded-full object-cover object-center"
        />
      </div>
      <p className="w-32 text-left">{value.match.opponentClub.clubName}</p>
    </button>
  )
}

interface ParticipateItemProps {
  value: ParticipateType
  diaryType: TypeOfDiaries | string
}

export default function ParticipateItem({
  value,
  diaryType,
}: ParticipateItemProps) {
  return (
    <Fragment>
      {diaryType === 'TEAM_TRAINING' && <TrainingPariticapte value={value} />}
      {diaryType === 'MATCH' && <MatchParticipate value={value} />}
    </Fragment>
  )
}
