import { isEmpty } from 'lodash'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useQuery } from 'react-query'
import { Loading, LoadingCustom } from 'src/components'
import { ButtonAdd } from 'src/components/ButtonAdd'
import { LeaderBoard } from 'src/components/leader-board'
import { MySelect } from 'src/components/MySelect'
import { MySelectCountry } from 'src/components/MySelectCountry'
import { PopupAdd } from 'src/components/popup-add'
import { API_GET_LIST_LEADER_BOARD } from 'src/constants/api.constants'
import { QUERIES_DASHBOARD } from 'src/constants/query-keys/query-keys.constants'
import { LastRangeDateType } from 'src/constants/types/dashboard/training.types'
import { ClubType } from 'src/constants/types/settingsType.type'
import { SvgAbove, SvgBelow } from 'src/imports/svgs'
import { InfiniteScrollClub } from 'src/module/account-settings/football/components/InfiniteScrollClub'
import { InfiniteScrollTeam } from 'src/module/account-settings/football/components/InfiniteScrollTeam'
import { GetListLeaderBoard } from 'src/service/dashboard/dashboard-overview'
import { axios } from 'src/utils/axios'
import { toQueryString } from 'src/utils/common.utils'
import { PeriodFilter } from '../components/PeriodFilter'
import { AgeOfGroup, CategoryFilter, RoleFilter } from '../constants'
const cls = require('../overview/overview.module.css')

interface FilterForm {
  country: string
  ageGroup: string
  clubId: string
  yourTeams: string[]
  role: string
  category: string
  contractedClub: ClubType
}

export const LeaderBoards = () => {
  const [add, setAdd] = useState<boolean>(true)
  const [range, setRange] = useState<LastRangeDateType>('30')
  const [limit, setLimit] = useState<number>(10)
  const [sorted, setSorted] = useState<string>('desc')
  const [items, setItems] = useState([])
  const [startAfter, setStartAfter] = useState<number>(1)
  const [count, setCount] = useState<Number>(0)
  const [hasMore, setHasMore] = useState<boolean>(true)
  const [checkFilter, setCheckFilter] = useState<boolean>(false)
  const [teamId, setTeamId] = useState<string>('')

  const [filterForm, setFilterForm] = useState<FilterForm>({
    country: '',
    ageGroup: '',
    clubId: '',
    yourTeams: [''],
    role: '',
    category: '',
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
  })

  const handleChangeForm = (type: keyof FilterForm, value: string) => {
    setFilterForm((prev) => ({ ...prev, [type]: value }))
    setCheckFilter(false)
  }

  const setSelectedClub = (value: ClubType) => {
    setFilterForm((prev) => ({
      ...prev,
      contractedClub: value,
      clubId: value.clubId,
      yourClub: value.clubName,
    }))
    setCheckFilter(false)
  }

  const setSelectedTeam = (value: string, index?: string) => {
    let newArr = [...(filterForm.yourTeams || [])]
    /* @ts-ignore */
    newArr[+index] = value.teamName
    setFilterForm((prev) => ({ ...prev, yourTeams: newArr }))
    setCheckFilter(false)
  }

  const getListLeaderBoard = async (startAfter: number) => {
    const res = await axios.get(
      toQueryString(API_GET_LIST_LEADER_BOARD, {
        limit: limit,
        startAfter: startAfter,
        sorted: sorted,
        lastDateRange: range,
        country: filterForm.country,
        ageGroup: filterForm.ageGroup,
        clubId: filterForm.clubId,
        teamId: teamId,
        role: filterForm.role,
        category: filterForm.category || 'HOURS',
      })
    )
    if (res.status === 200) {
      setItems(res.data)
    }
  }

  const handleChangeShow = () => {
    if (sorted === 'asc') {
      setSorted('desc')
    } else {
      setSorted('asc')
    }
  }

  useEffect(() => {
    getListLeaderBoard(startAfter)
  }, [sorted])

  // useEffect(() => {
  //   getListLeaderBoard(startAfter)
  // }, [startAfter])

  useEffect(() => {
    checkFilter && getListLeaderBoard(1)
  }, [sorted, range, checkFilter])

  // console.log('item:', items)
  // const fetchMoreData = async () => {
  //   if (items.length % 10 !== 0) {
  //     setHasMore(false)
  //     return
  //   }
  //   setHasMore(true)
  //   setStartAfter((startAfter) => startAfter + 1)
  //   // await getListLeaderBoard(startAfter)
  // }

  return (
    <Loading isLoading={false}>
      <>
        <div className="w-full flex flex-row-reverse col-span-12">
          <PeriodFilter
            value={range}
            onChange={setRange}
            label="Filter leaderboard"
            setFilterForm={setFilterForm}
            setCheckFilter={setCheckFilter}
          >
            <div className="w-full pb-[12px] space-y-[24px]">
              <MySelectCountry
                label="Country"
                value={filterForm.country}
                onChange={(_, value) => handleChangeForm('country', value)}
              />
              <MySelect
                label="Age of group"
                arrOption={AgeOfGroup}
                value={filterForm.ageGroup}
                onChange={(e) => handleChangeForm('ageGroup', e.target.value)}
              />
              <InfiniteScrollClub
                label="Club"
                value={filterForm.contractedClub}
                handleSetClub={setSelectedClub}
              />
              <InfiniteScrollTeam
                label="Team"
                /* @ts-ignore */
                handleSetTeam={(value) => setSelectedTeam(value, 0)}
                idClub={filterForm.contractedClub.clubId}
                setTeamId={setTeamId}
              />
              <MySelect
                label="Role"
                arrOption={RoleFilter}
                value={filterForm.role}
                onChange={(e) => handleChangeForm('role', e.target.value)}
              />
              <MySelect
                label="Category"
                arrOption={CategoryFilter}
                value={filterForm.category}
                onChange={(e) => handleChangeForm('category', e.target.value)}
              />
            </div>
          </PeriodFilter>
        </div>

        {!isEmpty(items) ? (
          <LeaderBoard
            master
            /* @ts-ignore */
            listMasterLeaderBoard={items.data}
            tabLeaderBoard
          />
        ) : null}

        <div className={`${cls.item} p-[32px] mt-[40px] mb-[100px]`}>
          <table className="w-full p-[6px] text-[12px] md:text-[14px]">
            <tr className="bg-[#13161A] text-[#A2A5AD] w-full h-[34px]">
              <td className="w-[15%] cursor-pointer" onClick={handleChangeShow}>
                <span className="float-left ml-[14px]">Nr</span>{' '}
                <div className="mt-[3px]">
                  {sorted === 'asc' ? <SvgAbove /> : <SvgBelow />}
                </div>
              </td>
              <td className="w-[40%]">Name</td>
              <td className="w-[35%]">Team</td>
              <td className="w-[10%]">Index</td>
            </tr>
            {/* <InfiniteScroll
              dataLength={items.length}
              hasMore={hasMore}
              loader={<LoadingCustom />}
              next={fetchMoreData}
              className="w-full"
            > */}
            {!isEmpty(items) ? (
              /* @ts-ignore */
              items.data?.map((item, index) => (
                <tr className="h-[40px] w-full hover:bg-[#474747]">
                  <td className="pl-[14px]">{index + 1}</td>
                  <td>{item?.userInfo?.fullName}</td>
                  <td>{item?.userInfo?.clubName}</td>
                  <td>{item?.value}</td>
                </tr>
              ))
            ) : (
              <div className="text-center w-full">
                <p>no data</p>
              </div>
            )}
            {/* </InfiniteScroll> */}
          </table>
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
              <div className="w-full h-full bg-[#13161A] rounded-[7px]">
                <div className="w-full h-[36px] cursor-pointer hover:bg-[#64748B] flex justify-between items-center">
                  <p className="ml-[12px]">Share</p>
                </div>
                <div className="w-full h-[36px] cursor-pointer hover:bg-[#64748B] flex justify-between items-center ">
                  <p className="ml-[12px]">Add to your Feed</p>
                </div>
              </div>
            </PopupAdd>
          </div>
        )}
      </>
    </Loading>
  )
}
