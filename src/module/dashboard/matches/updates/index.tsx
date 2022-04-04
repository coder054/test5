import clsx from 'clsx'
import { useCallback, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useQuery } from 'react-query'
import { Loading } from 'src/components'
import { ChervonRightIcon } from 'src/components/icons'
import { ArrowDownIcon } from 'src/components/icons/ArrowDownIcon'
import { QUERIES_DASHBOARD } from 'src/constants/query-keys/query-keys.constants'
import { MatchUpdatesType } from 'src/constants/types/match.types'
import { flexingFormatDate } from 'src/hooks/functionCommon'
import { fetchUpdates } from 'src/service/dashboard-training'

type MatchUpdatesProps = {
  range: string
}

const MatchUpdates = ({ range }: MatchUpdatesProps) => {
  const [sort, setSort] = useState<boolean>(false)
  const [formValues, setFormValues] = useState<MatchUpdatesType[]>([])
  const {
    isLoading: isGettingUpdates,
    data: responseUpdates,
    isError,
  } = useQuery([QUERIES_DASHBOARD.MATCHES_DATA, range, sort], () =>
    fetchUpdates({
      range: range,
      tab: 'MATCH',
      limit: 10,
      sorted: 'desc',
    })
  )

  const countGoal = useCallback(
    (value: { event: string; minutes: number }[]) => {
      let goals = 0
      let assists = 0
      if (value)
        for (let i = 0; i <= value.length; i++) {
          if (value[i]?.event === 'GOAL') {
            goals++
          } else if (value[i]?.event === 'ASSIST') {
            assists++
          }
        }
      return `${goals}/${assists}`
    },
    [JSON.stringify(formValues)]
  )

  useEffect(() => {
    isError && toast.error('An error has occurred')
    responseUpdates && setFormValues(responseUpdates.data)
  }, [JSON.stringify(responseUpdates)])

  return (
    <Loading isLoading={isGettingUpdates} className="p-8 bg-defaultBackGround">
      <div className=" space-y-6">
        <p className="text-[18px] font-bold">Match Updates</p>
        <div>
          <div className="grid grid-cols-12 bg-[#13161A] text-[#A2A5AD] text-[16px] font-medium  px-4 py-2">
            <p className="col-span-2">
              <button
                onClick={() => setSort(!sort)}
                className="flex items-center space-x-4"
              >
                <p>Date</p>
                <span
                  className={clsx(
                    'scale-150 duration-150',
                    sort && 'rotate-180'
                  )}
                >
                  <ArrowDownIcon />
                </span>
              </button>
            </p>
            <p className="col-span-3">Opponent</p>
            <p className="col-span-2">Score</p>
            <p className="col-span-2">Goal/Ass</p>
            <p className="col-span-2">Min.</p>
            <p className="col-span-1 invisible">Action</p>
          </div>
          {formValues.map((it) => (
            <div className="grid grid-cols-12  text-[16px] font-normal px-4 py-2.5 cursor-pointer hover:bg-gray-500 duration-150">
              <p className="col-span-2">
                {flexingFormatDate(it.createdAt, 'DD/MM')}
              </p>
              <p className="col-span-3 flex items-center space-x-4">
                <img
                  className="rounded-full w-[25px] h-[25px] object-cover"
                  src={it.match.opponentClub.logoUrl}
                />
                <span>{it.match.opponentClub.clubName}</span>
              </p>
              <p className="col-span-2">{`${it.match.result.yourTeam}-${it.match.result.opponents}`}</p>
              <p className="col-span-2">{countGoal(it.match.events)}</p>
              <p className="col-span-2">{it.match.length}</p>
              <p className="col-span-1 invisible">
                <ChervonRightIcon />
              </p>
            </div>
          ))}
        </div>
      </div>
    </Loading>
  )
}
export default MatchUpdates
