import clsx from 'clsx'
import { useEffect, useState } from 'react'
import { isMobile } from 'react-device-detect'
import { useQuery } from 'react-query'
import SimpleBar from 'simplebar-react'
import { Loading } from 'src/components'
import { ChervonRightIcon, XIcon } from 'src/components/icons'
import { ArrowDownIcon } from 'src/components/icons/ArrowDownIcon'
import { ModalMui } from 'src/components/ModalMui'
import { COLOR_DIARY } from 'src/constants/mocks/colors.constants'
import { QUERIES_DASHBOARD } from 'src/constants/query-keys/query-keys.constants'
import { flexingFormatDate } from 'src/hooks/functionCommon'
import DiaryUpdate from 'src/modules/update-diary'
import { fetchWellnessUpdate } from 'src/service/dashboard/wellness.service'

type DashboardDiaryUpdateType = {
  eatAndDrink: string
  energyLevel: string
  sleep: string
  painLevel: string
  createdAt: number
  diaryId: string
  typeOfDiary: string
}

export const DashboardDiaryUpdate = () => {
  const [sort, setSort] = useState<boolean>(false)
  const [initial, setInitial] = useState<DashboardDiaryUpdateType[]>([])
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false)
  const [selectedUpdates, setSelectedUpdates] = useState(undefined)

  const { isLoading: isGettingUpdates, data: responseUpdates } = useQuery(
    [QUERIES_DASHBOARD.WELLNESS_DATA, sort],
    () =>
      fetchWellnessUpdate({
        limit: 10,
        sorted: sort ? 'asc' : 'desc',
      })
  )

  const handleChooseUpdates = (value: any) => {
    setSelectedUpdates(value)
    setIsOpenModal(true)
  }

  useEffect(() => {
    responseUpdates && setInitial(responseUpdates.data)
  }, [JSON.stringify(responseUpdates)])

  return (
    <Loading
      isLoading={isGettingUpdates}
      className="bg-defaultBackGround laptopM:p-8 mobileM:p-2 rounded-lg"
    >
      <div>
        <ModalMui
          sx={{
            padding: 0,
            top: '50%',
            width: isMobile ? '100%' : 800,
            overflow: 'auto',
          }}
          isOpen={isOpenModal}
          onClose={setIsOpenModal}
        >
          <div className="h-[850px] overflow-y-auto">
            <div className="relative">
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
                isWellness={true}
              />
            </div>
          </div>
        </ModalMui>
        <p className="text-[18px] laptopM:text-left mobileM:text-center font-bold laptopM:mb-0 mobileM:mb-4 laptopM:pb-4">
          Diary Updates
        </p>
        <div className="grid grid-cols-6 text-left bg-[#13161A] text-[#A2A5AD] laptopM:text-[16px] mobileM:text-[13px] font-medium  px-4 py-2">
          <p>
            <button
              onClick={() => setSort(!sort)}
              className="flex items-center laptopM:space-x-4"
            >
              <p>Date</p>
              <span
                className={clsx('scale-150 duration-150', sort && 'rotate-180')}
              >
                <ArrowDownIcon />
              </span>
            </button>
          </p>
          <p>Energy</p>
          <p>Sleep</p>
          <p>Eat</p>
          <p>Pain</p>
          <p className="invisible">Action</p>
        </div>
        <div className="h-[350px] overflow-y-auto">
          {initial.map((it: DashboardDiaryUpdateType) => (
            <button
              key={it.diaryId}
              onClick={() => handleChooseUpdates(it)}
              className="grid w-full grid-cols-6 text-left laptopM:text-[16px] mobileM:text-[13px] font-normal mobileM:pl-4 laptopM:px-4 py-2.5 hover:bg-gray-500 duration-150"
            >
              <p>{flexingFormatDate(it.createdAt, 'DD/MM')}</p>
              <p style={{ color: COLOR_DIARY[it.energyLevel].color }}>
                {COLOR_DIARY[it.energyLevel].label}
              </p>
              <p style={{ color: COLOR_DIARY[it.sleep].color }}>
                {COLOR_DIARY[it.sleep].label}
              </p>
              <p style={{ color: COLOR_DIARY[it.eatAndDrink].color }}>
                {COLOR_DIARY[it.eatAndDrink].label}
              </p>
              <p
                style={{
                  color:
                    it.painLevel === 'No'
                      ? 'white'
                      : COLOR_DIARY[it.painLevel].color,
                }}
              >
                {it.painLevel === 'No' ? 'No' : COLOR_DIARY[it.painLevel].label}
              </p>
              <span>
                <ChervonRightIcon className="w-[25px] h-[25px]" />
              </span>
            </button>
          ))}
        </div>
      </div>
    </Loading>
  )
}
