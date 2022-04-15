import clsx from 'clsx'
import { useEffect, useState } from 'react'
import { isMobile } from 'react-device-detect'
import { useQuery } from 'react-query'
import SimpleBar from 'simplebar-react'
import { Loading } from 'src/components'
import { XIcon } from 'src/components/icons'
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
      className="bg-defaultBackGround p-8 rounded-lg"
    >
      <div className="space-y-6">
        <ModalMui
          customStyle={{
            padding: 0,
            top: '50%',
            width: isMobile ? '100%' : 700,
            overflow: 'auto',
          }}
          isOpen={isOpenModal}
          onClose={setIsOpenModal}
        >
          <SimpleBar style={{ maxHeight: 850 }}>
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
          </SimpleBar>
        </ModalMui>
        <p className="text-[18px] font-bold">Diary Updates</p>
        <div className="grid grid-cols-12 bg-[#13161A] text-[#A2A5AD] text-[16px] font-medium  px-4 py-2">
          <p className="col-span-2">
            <button
              onClick={() => setSort(!sort)}
              className="flex items-center space-x-4"
            >
              <p>Date</p>
              <span
                className={clsx('scale-150 duration-150', sort && 'rotate-180')}
              >
                <ArrowDownIcon />
              </span>
            </button>
          </p>
          <p className="col-span-2">Energy</p>
          <p className="col-span-2">Sleep</p>
          <p className="col-span-2">Eat</p>
          <p className="col-span-2">Pain</p>
          <p className="col-span-2 invisible">Action</p>
        </div>
        <SimpleBar style={{ maxHeight: 350 }}>
          {initial.map((it: DashboardDiaryUpdateType) => (
            <div
              key={it.diaryId}
              onClick={() => handleChooseUpdates(it)}
              className="grid grid-cols-12  text-[16px] font-normal px-4 py-2.5 cursor-pointer hover:bg-gray-500 duration-150"
            >
              <p className="col-span-2">
                {flexingFormatDate(it.createdAt, 'DD/MM')}
              </p>
              <p
                className="col-span-2"
                style={{ color: COLOR_DIARY[it.energyLevel].color }}
              >
                {COLOR_DIARY[it.energyLevel].label}
              </p>
              <p
                className="col-span-2"
                style={{ color: COLOR_DIARY[it.sleep].color }}
              >
                {COLOR_DIARY[it.sleep].label}
              </p>
              <p
                className="col-span-2"
                style={{ color: COLOR_DIARY[it.eatAndDrink].color }}
              >
                {COLOR_DIARY[it.eatAndDrink].label}
              </p>
              <p
                className="col-span-2"
                style={{
                  color:
                    it.painLevel === 'No'
                      ? 'white'
                      : COLOR_DIARY[it.painLevel].color,
                }}
              >
                {it.painLevel === 'No' ? 'No' : COLOR_DIARY[it.painLevel].label}
              </p>
              <p className="col-span-2 invisible">Action</p>
            </div>
          ))}
        </SimpleBar>
      </div>
    </Loading>
  )
}
