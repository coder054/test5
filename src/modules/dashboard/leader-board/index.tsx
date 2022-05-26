import { ClickAwayListener } from '@mui/material'
import { Fragment, useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { useInfiniteQuery } from 'react-query'
import SimpleBar from 'simplebar-react'
import { Loading } from 'src/components'
import { ButtonAdd } from 'src/components/ButtonAdd'
import { LeaderBoard } from 'src/components/leader-board'
import { MiniLoading } from 'src/components/mini-loading'
import { PopupAdd } from 'src/components/popup-add'
import { API_GET_LIST_LEADER_BOARD } from 'src/constants/api.constants'
import { ASC, DESC } from 'src/constants/constants'
import { QUERIES_DASHBOARD } from 'src/constants/query-keys/query-keys.constants'
import { LastRangeDateType } from 'src/constants/types/dashboard/training.types'
import { Country } from 'src/constants/types/diary.types'
import { ClubType } from 'src/constants/types/settingsType.type'
import { SvgAbove, SvgBelow } from 'src/imports/svgs'
import { axios } from 'src/utils/axios'
import {
  handleStringFirstUppperCase,
  toQueryString,
} from 'src/utils/common.utils'
import { FilterLeaderboard } from './filter-leaderboard'
const cls = require('../overview/overview.module.css')

interface FilterForm {
  country?: Country
  ageGroup: string
  clubId: string
  yourTeams: string[]
  role: string
  category: string
  contractedClub: ClubType
  teamId: string
}

export const LeaderBoards = () => {
  const [add, setAdd] = useState<boolean>(true)
  const [range, setRange] = useState<LastRangeDateType>('30')
  const [limit, setLimit] = useState<number>(10)
  const [sorted, setSorted] = useState<string>(DESC)
  const [startAfter, setStartAfter] = useState<number>(1)
  const [count, setCount] = useState<number>(0)

  const [filterForm, setFilterForm] = useState<FilterForm>({
    country: {
      alpha2Code: 'SE',
      alpha3Code: 'SWE',
      flag: 'https://res.cloudinary.com/zporter-media-cloud/image/upload/v1626939466/country-flags/SWE.png',
      name: 'Sweden',
      phoneCode: '+46',
      region: 'Europe',
    },
    ageGroup: 'ALL',
    clubId: '',
    yourTeams: [''],
    role: 'All',
    category: 'HOURS',
    contractedClub: {
      arena: '',
      city: '',
      clubId: '',
      clubName: '',
      country: '',
      logoUrl: '',
      nickName: '',
      websiteUrl: null,
    },
    teamId: '',
  })

  const handleChangeShow = () => {
    if (sorted === ASC) {
      setSorted(DESC)
    } else {
      setSorted(ASC)
    }
  }

  const { ref, inView } = useInView()
  const {
    data,
    isFetching,
    isFetchingNextPage,
    fetchNextPage,
    isLoading: loading,
  } = useInfiniteQuery(
    [
      QUERIES_DASHBOARD.LEADER_BOARD,
      sorted,
      limit,
      startAfter,
      range,
      JSON.stringify(filterForm),
    ],
    async ({ pageParam = 1 }) => {
      const res = await axios.get(
        toQueryString(API_GET_LIST_LEADER_BOARD, {
          limit: limit,
          startAfter: pageParam,
          sorted: sorted,
          lastDateRange: range,
          country: filterForm.country.name,
          ageGroup: filterForm.ageGroup === 'ALL' ? '' : filterForm.ageGroup,
          clubId: filterForm.clubId,
          teamId: filterForm.teamId,
          role: filterForm.role === 'All' ? '' : filterForm.role,
          category: filterForm.category || 'HOURS',
        })
      )

      return res.data
    },
    {
      getNextPageParam: (lastPage, page) => {
        if (
          page.length < Math.ceil(lastPage.count / 10) &&
          lastPage.data.length !== 0
        ) {
          return lastPage.nextPage
        } else {
          return undefined
        }
      },
    }
  )

  useEffect(() => {
    data && setCount(data.pages[0].count)
  }, [JSON.stringify(data)])

  useEffect(() => {
    if (inView) {
      fetchNextPage()
    }
  }, [inView])

  return (
    <Loading isLoading={loading}>
      <>
        <div className="w-full flex flex-row-reverse col-span-12">
          <FilterLeaderboard
            value={range}
            onChange={setRange}
            label="Filter leaderboard"
            setFilterFormLeader={setFilterForm}
            leaderBoard
            category={filterForm?.category}
          />
        </div>

        {data?.pages[0]?.data ? (
          <LeaderBoard
            master
            listMasterLeaderBoard={data?.pages[0]?.data && data?.pages[0]?.data}
            tabLeaderBoard
          />
        ) : null}

        <div className={`${cls.item} p-[32px] mt-[40px] mb-[100px]`}>
          <div className="bg-[#13161A] text-[#A2A5AD] w-full h-[34px] grid grid-cols-12 items-center">
            <p className="cursor-pointer col-span-2" onClick={handleChangeShow}>
              <span className="ml-[12px] float-left">Nr</span>{' '}
              <div className="mt-[3px]">
                {sorted === 'asc' ? <SvgAbove /> : <SvgBelow />}
              </div>
            </p>
            <p className="col-span-4">Name</p>
            <p className="col-span-3">Club</p>
            <p className="col-span-3">
              {handleStringFirstUppperCase(filterForm?.category)}
            </p>
          </div>
          <Fragment>
            <SimpleBar style={{ maxHeight: 420 }}>
              {(data?.pages || []).map((page, indexOrigin) => (
                <Fragment key={indexOrigin}>
                  {page.data.map((item, index) => (
                    <div
                      className="h-[44px] grid grid-cols-12 text-[12px] md:text-[14px] items-center cursor-pointer hover:bg-gray-500"
                      key={index}
                    >
                      <p className="pl-[12px] col-span-2">
                        {indexOrigin * 10 + index + 1}
                      </p>
                      <p className="col-span-4">
                        {item?.userInfo?.firstName} {item?.userInfo?.lastName}
                      </p>
                      <p className="col-span-3">{item?.userInfo?.clubName}</p>
                      <p className="col-span-3">{item?.value}</p>
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
          </Fragment>
        </div>
        {add ? (
          <div
            className=""
            onClick={() => {
              setAdd(false)
            }}
          >
            <ButtonAdd />
          </div>
        ) : (
          <div
            onClick={() => {
              setAdd(true)
            }}
          >
            <PopupAdd>
              <ClickAwayListener onClickAway={() => setAdd(true)}>
                <div className="w-full h-full bg-[#13161A] rounded-[7px]">
                  <div className="w-full h-[36px] cursor-pointer hover:bg-[#64748B] flex justify-between items-center">
                    <p className="ml-[12px]">Share</p>
                  </div>
                  <div className="w-full h-[36px] cursor-pointer hover:bg-[#64748B] flex justify-between items-center ">
                    <p className="ml-[12px]">Add to your Feed</p>
                  </div>
                </div>
              </ClickAwayListener>
            </PopupAdd>
          </div>
        )}
      </>
    </Loading>
  )
}
