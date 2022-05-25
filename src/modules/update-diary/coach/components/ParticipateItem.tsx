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
import { motion } from 'framer-motion'

interface ItemProps {
  value?: ParticipateType
  disabled?: boolean
}

export const TrainingPariticapte = React.memo(
  ({ value, disabled }: ItemProps) => {
    const [selectedParticipate, setSelectedParticipate] =
      useAtom(COACH_DIARY_ATOM)

    const TRAINING_RESPONSE = useMemo(() => {
      const { mental, physics, tactics, technics } = value?.training
      const obj = { mental, physics, tactics, technics }
      return Object.keys(obj).map((key) => ({
        key: _upperFirst(key),
        value: obj[key],
      }))
    }, [JSON.stringify(value?.training)])

    return (
      <motion.button
        exit={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.15 }}
        disabled={disabled}
        /* @ts-ignore */
        onClick={() =>
          /* @ts-ignore */
          setSelectedParticipate({ ...value, isParticipate: true })
        }
        className={clsx(
          'flex items-center w-full border-2  hover:border-gray-500 duration-150 cursor-pointer active:bg-gray-800 pt-2 px-4 rounded-lg justify-between',
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
      </motion.button>
    )
  }
)

export const MatchParticipate = ({ value, disabled }: ItemProps) => {
  const [, setSelectedParticipate] = useAtom(COACH_DIARY_ATOM)
  return (
    <motion.button
      exit={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      initial={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.17 }}
      whileHover={{ scale: disabled ? 1 : 1.03 }}
      disabled={disabled}
      onClick={() =>
        /* @ts-ignore */
        setSelectedParticipate({ ...value, isParticipate: true })
      }
      className={clsx(
        'bg-white w-full rounded-lg p-2 flex items-center justify-between text-black font-medium text-lg',
        !disabled && 'active:bg-gray-300'
      )}
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
    </motion.button>
  )
}

interface ParticipateItemProps {
  value: ParticipateType
  currentTab: TypeOfDiaries | string
}

export default function ParticipateItem({
  value,
  currentTab,
}: ParticipateItemProps) {
  return (
    <Fragment>
      {currentTab === 'TEAM_TRAINING' && <TrainingPariticapte value={value} />}
      {currentTab === 'MATCH' && <MatchParticipate value={value} />}
    </Fragment>
  )
}
