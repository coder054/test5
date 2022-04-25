import clsx from 'clsx'
import { useCallback, useEffect, useState } from 'react'
import { isMobile } from 'react-device-detect'
import toast from 'react-hot-toast'
import { useQuery } from 'react-query'
import SimpleBar from 'simplebar-react'
import { Loading } from 'src/components'
import { ChervonRightIcon, XIcon } from 'src/components/icons'
import { ArrowDownIcon } from 'src/components/icons/ArrowDownIcon'
import { ModalMui } from 'src/components/ModalMui'
import { QUERIES_DASHBOARD } from 'src/constants/query-keys/query-keys.constants'
import { MatchUpdatesType } from 'src/constants/types/match.types'
import { flexingFormatDate } from 'src/hooks/functionCommon'
import DiaryUpdate from 'src/modules/update-diary'
import { fetchUpdates } from 'src/service/dashboard/training.service'
import { safeHttpImage } from 'src/utils/utils'

type MatchUpdatesProps = {
  range: string
}

const MatchUpdates = ({ range }: MatchUpdatesProps) => {
  const [sort, setSort] = useState<boolean>(false)
  const [formValues, setFormValues] = useState<MatchUpdatesType[]>([])
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false)
  const [selectedUpdates, setSelectedUpdates] = useState(undefined)
  const {
    isLoading: isGettingUpdates,
    data: responseUpdates,
    isError,
  } = useQuery([QUERIES_DASHBOARD.MATCHES_DATA, range, sort], () =>
    fetchUpdates({
      range: range,
      tab: 'MATCH',
      limit: 100,
      sorted: sort ? 'asc' : 'desc',
    })
  )

  const handleChooseUpdates = (value: any) => {
    setSelectedUpdates(value)
    setIsOpenModal(true)
  }

  useEffect(() => {
    !isOpenModal && setSelectedUpdates(undefined)
  }, [isOpenModal])

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
    isError && toast.error('Something went wrong')
    responseUpdates && setFormValues(responseUpdates.data)
  }, [JSON.stringify(responseUpdates)])

  return (
    <Loading
      isLoading={isGettingUpdates}
      className="laptopM:p-8 mobileM:p-2 bg-defaultBackGround rounded-lg"
    >
      <div className="space-y-6">
        <p className="text-[18px] font-bold mobileM:text-center laptopM:text-left">
          Match Updates
        </p>
        <div>
          <ModalMui
            sx={{
              padding: 0,
              top: '50%',
              width: isMobile ? '100%' : 700,
              overflow: 'auto',
            }}
            isOpen={isOpenModal}
            onClose={setIsOpenModal}
          >
            <div className="relative h-[850px] overflow-y-auto">
              <button
                type="button"
                onClick={() => setIsOpenModal(false)}
                className="absolute z-50 right-6 top-5"
              >
                <XIcon />
              </button>
              <DiaryUpdate
                selected={selectedUpdates}
                onClose={setIsOpenModal}
              />
            </div>
          </ModalMui>
          <div className="bg-[#13161A] text-[#A2A5AD] laptopM:text-[16px] mobileM:text-[13px] font-medium grid grid-cols-12 laptopM:p-4 mobileM:py-2 mobileM:pl-2">
            <p className="col-span-2">
              <button
                onClick={() => setSort(!sort)}
                className="flex items-center laptopM:space-x-4"
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
          <div className="h-[400px] overflow-y-auto">
            {formValues.map((it) => (
              <button
                key={it.diaryId}
                onClick={() => handleChooseUpdates(it)}
                className="w-full grid grid-cols-12 items-center laptopM:py-3 text-left laptopM:text-[16px] mobileM:text-[13px] font-normal laptopM:px-4 mobileM:pl-2 mobileM:py-2 hover:bg-gray-500 duration-150"
              >
                <p className="col-span-2">
                  {flexingFormatDate(it.createdAt, 'DD/MM')}
                </p>
                <p className="col-span-3 flex items-center mobileM:pl-4 laptopM:pl-0 space-x-4">
                  <img
                    className="rounded-full w-[25px] h-[25px] object-cover"
                    src={safeHttpImage(it.match.opponentClub.logoUrl)}
                  />
                  <span className="mobileM:hidden laptopM:block">
                    {it.match.opponentClub.clubName}
                  </span>
                </p>
                <p className="col-span-2">{`${it.match.result.yourTeam}-${it.match.result.opponents}`}</p>
                <p className="col-span-2">{countGoal(it.match.events)}</p>
                <p className="col-span-2">{it.match.length}</p>
                <p className="col-span-1">
                  <ChervonRightIcon className="w-[25px] h-[25px]" />
                </p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </Loading>
  )
}
export default MatchUpdates
