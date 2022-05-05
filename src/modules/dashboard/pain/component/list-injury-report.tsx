import { SwipeableDrawer } from '@mui/material'
import dayjs from 'dayjs'
import { useAtom } from 'jotai'
import { Fragment, useState, useEffect } from 'react'
import { useInfiniteQuery } from 'react-query'
import SimpleBar from 'simplebar-react'
import { checkUpdateInjuryAtom, injuryAtom } from 'src/atoms/injuryAtom'
import { COLOR_DIARY } from 'src/constants/mocks/colors.constants'
import { QUERIES_DASHBOARD } from 'src/constants/query-keys/query-keys.constants'
import { InjuryType } from 'src/constants/types/diary.types'
import { ChevronRight } from 'src/icons/chevron-right'
import { SvgAbove, SvgBelow } from 'src/imports/svgs'
import { EditInjuryArea } from 'src/modules/update-diary/player/components/EditInjuryArea'
import { getListInjuryReport } from 'src/service/dashboard/pain.service'
import { ASC, DESC } from 'src/constants/constants'
import { MiniLoading } from 'src/components/mini-loading'
import { useInView } from 'react-intersection-observer'

interface ListInjuryReportProp {}

export const ListInjuryReport = () => {
  const { ref, inView } = useInView()
  const [checkUpdate, setCheckUpdate] = useAtom(checkUpdateInjuryAtom)
  const [_, setInjury] = useAtom(injuryAtom)
  const [isOpenDrawer, setIsOpenDrawer] = useState<boolean>(false)
  const [limit, setLimit] = useState<number>(10)
  const [startAfter, setStartAfter] = useState<number>(null)
  const [sorted, setSorted] = useState<string>(DESC)
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false)
  const [items, setItems] = useState<InjuryType[]>([
    {
      createdAt: 0,
      description: '',
      isFront: false,
      injuryPosition: {
        y: 0,
        x: 0,
      },
      injuryTags: [],
      injuryArea: '',
      painLevel: '',
      updatedAt: 0,
      treatment: '',
      userId: '',
      injuryMedia: [],
      injuryId: '',
      diaryId: '',
    },
  ])
  const [pain, setPain] = useState<InjuryType>({
    createdAt: 0,
    description: '',
    isFront: false,
    injuryPosition: {
      y: 0,
      x: 0,
    },
    injuryTags: [],
    injuryArea: '',
    painLevel: '',
    updatedAt: 0,
    treatment: '',
    userId: '',
    injuryMedia: [],
    injuryId: '',
    diaryId: '',
  })

  const {
    isLoading: loading,
    data: dataInjurys,
    isFetchingNextPage,
    fetchNextPage,
  } = useInfiniteQuery(
    [QUERIES_DASHBOARD.LIST_PAIN, limit, startAfter, sorted],
    async ({ pageParam = startAfter }) => {
      const res = await getListInjuryReport({
        limit: limit,
        startAfter: pageParam,
        sorted: sorted,
      })

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

  const handleOnClick = (item: InjuryType) => {
    setInjury({ ...item, diaryId: item.diaryId })
    setIsOpenDrawer(true)
    checkUpdate && setCheckUpdate(false)
  }

  const displayShow = (str: string, right: boolean): any => {
    if (str === 'N/A' && str) {
      return (
        <p
          className={`col-span-3 ${right ? 'flex justify-between' : ''}`}
          style={{
            color: '#A2A5AD',
          }}
        >
          N/A
          {right && <ChevronRight />}
        </p>
      )
    } else if (str && str !== 'N/A') {
      return (
        <p
          className={`col-span-3 ${right ? 'flex justify-between' : ''}`}
          style={{
            color: COLOR_DIARY[str].color,
          }}
        >
          {COLOR_DIARY[str].label}
          {right && (
            <div className="float-right">
              <ChevronRight />
            </div>
          )}
        </p>
      )
    }
  }

  return (
    <div>
      <div className="bg-[#13161A] text-[#A2A5AD] w-full h-[34px] grid grid-cols-12 items-center">
        <p className="cursor-pointer col-span-2" onClick={handleChangeShow}>
          <span className="ml-[12px] float-left">Date</span>{' '}
          <div className="mt-[3px]">
            {sorted === ASC ? <SvgAbove /> : <SvgBelow />}
          </div>
        </p>
        <p className="col-span-3">Area</p>
        <p className="col-span-3">Pain level</p>
        <p className="col-span-4">Tag</p>
      </div>
      <SwipeableDrawer
        anchor="bottom"
        sx={{ zIndex: 1300 }}
        open={isOpenDrawer}
        onClose={() => setIsOpenDrawer(false)}
        onOpen={() => setIsOpenDrawer(true)}
      >
        <EditInjuryArea onClose={setIsOpenDrawer} />
      </SwipeableDrawer>
      <SimpleBar style={{ maxHeight: 350 }}>
        {(dataInjurys?.pages || []).map((page, indexPain) => (
          <Fragment key={indexPain}>
            {(page || []).map((item, index) => (
              <div
                key={index}
                className="h-[44px] grid grid-cols-12 text-[12px] md:text-[14px] items-center cursor-pointer hover:bg-gray-500"
                onClick={() => handleOnClick(item)}
              >
                <p className="md:pl-[12px] col-span-2">
                  {dayjs(item?.createdAt).format('DD/MM')}
                </p>
                <p className="col-span-3">{item.injuryArea}</p>
                {displayShow(item.painLevel, false)}
                <div className="col-span-4">
                  {item.injuryTags &&
                    item.injuryTags.map((tag, index) => {
                      if (index === 0) {
                        return <span>{tag}</span>
                      } else {
                        return <span>, {tag}</span>
                      }
                    })}
                  <div className="float-right">
                    <ChevronRight />
                  </div>
                </div>
              </div>
            ))}
            <p
              className="flex justify-center py-2 font-semibold text-[16px] h-[12px]"
              ref={ref}
            >
              {isFetchingNextPage ? (
                <MiniLoading color="#09E099" size={18} />
              ) : null}
            </p>
          </Fragment>
        ))}
      </SimpleBar>
    </div>
  )
}
