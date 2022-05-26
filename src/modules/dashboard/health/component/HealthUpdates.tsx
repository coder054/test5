import dayjs from 'dayjs'
import { Fragment, useEffect, useState } from 'react'
import { isMobile } from 'react-device-detect'
import { useInView } from 'react-intersection-observer'
import { useInfiniteQuery } from 'react-query'
import SimpleBar from 'simplebar-react'
import { Loading } from 'src/components'
import { MiniLoading } from 'src/components/mini-loading'
import { ModalMui } from 'src/components/ModalMui'
import { API_GET_LIST_HEALTHS } from 'src/constants/api.constants'
import { ASC, DESC } from 'src/constants/constants'
import { QUERIES_DASHBOARD } from 'src/constants/query-keys/query-keys.constants'
import { DashboardHealthUpdateType } from 'src/constants/types'
import { ChevronRight } from 'src/icons/chevron-right'
import { SvgAbove, SvgBelow } from 'src/imports/svgs'
import { axios } from 'src/utils/axios'
import { toQueryString } from 'src/utils/common.utils'
import { ModalHealthUpdate } from './ModalHealthUpdate'

export const HealthUpdates = () => {
  const [limit, setLimit] = useState<number>(10)
  const [startAfter, setStartAfter] = useState<number>(null)
  const [sorted, setSorted] = useState<string>(DESC)
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false)
  const [checkUpdate, setCheckUpdate] = useState<boolean>(false)
  const { ref, inView } = useInView()

  const [item, setItem] = useState<DashboardHealthUpdateType>({
    healthId: '',
    userId: '',
    weight: 0,
    waistSkinsThickness: 0,
    height: 0,
    updatedAt: 0,
    systolicBloodPressure: 0,
    diastolicBloodPressure: 0,
    date: '',
    breastSkinThickness: 0,
    media: [''],
    thighSkinThickness: 0,
    otherDescription: '',
    restingPulse: 0,
    createdAt: 0,
    maxPulse: 0,
    bmi: 0,
    fat: 0,
  })

  const {
    isLoading: loading,
    data: dataHealth,
    isFetchingNextPage,
    fetchNextPage,
  } = useInfiniteQuery(
    [QUERIES_DASHBOARD.LIST_HEALTH_DATA, limit, startAfter, sorted],
    async ({ pageParam = startAfter }) => {
      const res = await axios.get(
        toQueryString(API_GET_LIST_HEALTHS, {
          limit: limit,
          startAfter: pageParam,
          sorted: sorted,
        })
      )

      return res.data
    },
    {
      getNextPageParam: (lastPage) => {
        if (lastPage.length !== 0) {
          return lastPage[lastPage.length - 1].createdAt
        } else {
          return undefined
        }
      },
    }
  )

  useEffect(() => {
    if (inView) {
      fetchNextPage()
    }
  }, [inView])

  const handleChangeShow = () => {
    if (sorted === ASC) {
      setSorted(DESC)
    } else {
      setSorted(ASC)
    }
  }

  const handleOnClick = (item: DashboardHealthUpdateType) => {
    setItem(item)
    setIsOpenModal(true)
    if (checkUpdate) {
      setCheckUpdate(false)
    }
  }

  return (
    <div className="w-full p-[6px] text-[12px] md:text-[14px]">
      <p className="text-[16px] font-bold mb-[24px]">Health updates</p>
      <div className="bg-[#13161A] text-[#A2A5AD] w-full h-[34px] grid grid-cols-12 items-center">
        <p className="cursor-pointer col-span-2" onClick={handleChangeShow}>
          <span className="ml-[12px] float-left">Date</span>{' '}
          <div className="mt-[3px]">
            {sorted === ASC ? <SvgAbove /> : <SvgBelow />}
          </div>
        </p>
        <p className="col-span-3">Height</p>
        <p className="col-span-3">Weight</p>
        <p className="col-span-2">BMI</p>
        <p className="col-span-2">Fat</p>
      </div>
      <Loading isLoading={loading}>
        <SimpleBar style={{ maxHeight: 350 }}>
          {dataHealth?.pages &&
            (dataHealth.pages || []).map((page, indexPage) => (
              <Fragment key={indexPage}>
                {page.map((item, index) => (
                  <div
                    className="h-[44px] grid grid-cols-12 text-[12px] md:text-[14px] items-center cursor-pointer hover:bg-gray-500"
                    onClick={() => handleOnClick(item)}
                    key={index}
                  >
                    <p className="md:pl-[12px] col-span-2">
                      {dayjs(item?.date).format('DD/MM')}
                    </p>
                    <p className="col-span-3">{item.height}cm</p>
                    <p className="col-span-3">{item.weight}kg</p>
                    <p
                      className={`${index % 5 === 0 ? 'text-[#4654EA]' : ''}
                      ${index % 5 === 1 ? 'text-[#07E1FF]' : ''}
                      ${index % 5 === 2 ? 'text-[#09E099]' : ''}
                      ${index % 5 === 3 ? 'text-[#E85CFF]' : ''}
                      ${index % 5 === 4 ? 'text-[#D60C0C]' : ''} col-span-2`}
                    >
                      {item.bmi}
                    </p>
                    <p
                      className={`flex justify-between items-center mt-[8px] ${
                        index % 5 === 0 ? 'text-[#4654EA]' : ''
                      }
                      ${index % 5 === 1 ? 'text-[#07E1FF]' : ''}
                      ${index % 5 === 2 ? 'text-[#09E099]' : ''}
                      ${index % 5 === 3 ? 'text-[#E85CFF]' : ''}
                      ${index % 5 === 4 ? 'text-[#D60C0C]' : ''} col-span-2`}
                    >
                      {item.fat}%
                      <ChevronRight />
                    </p>
                  </div>
                ))}
              </Fragment>
            ))}
          <p
            className="flex justify-center py-2 font-semibold text-[16px] h-[12px]"
            ref={ref}
          >
            {isFetchingNextPage ? (
              <MiniLoading color="#09E099" size={18} />
            ) : null}
          </p>
        </SimpleBar>
      </Loading>

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
        <SimpleBar style={{ height: 850 }}>
          <ModalHealthUpdate
            setIsOpenModal={setIsOpenModal}
            item={item && item}
            setCheckUpdate={setCheckUpdate}
          />
        </SimpleBar>
      </ModalMui>
    </div>
  )
}
