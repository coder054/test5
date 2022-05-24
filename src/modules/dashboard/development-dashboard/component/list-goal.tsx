import { Fragment, useEffect, useState } from 'react'
import SimpleBar from 'simplebar-react'
import { MySlider } from 'src/components/MySlider'
import { DashboardGoalUpdateType } from 'src/constants/types'
import { SvgClockGoal } from 'src/imports/svgs'
import { getGoal } from 'src/service/dashboard/development.service'
import dayjs from 'dayjs'
import { Loading, TooltipCustom } from 'src/components'
import { ModalMui } from 'src/components/ModalMui'
import { isMobile } from 'react-device-detect'
import { GoalModal } from './modal/goal-modal'
import { useInfiniteQuery } from 'react-query'
import { QUERIES_DASHBOARD } from 'src/constants/query-keys/query-keys.constants'
import { ASC } from 'src/constants/constants'
import { toQueryString } from 'src/utils/common.utils'
import { API_GET_PLAYER_GOAL_UPDATE } from 'src/constants/api.constants'
import { axios } from 'src/utils/axios'
import { MiniLoading } from 'src/components/mini-loading'
import { useInView } from 'react-intersection-observer'

const cls = require('./component.module.css')

interface ListGoalProps {}

export const ListGoal = () => {
  const { inView, ref } = useInView()
  const [limit, setLimit] = useState<number>(2)
  const [startAfter, setStartAfter] = useState<number>(null)
  const [sorted, setSorted] = useState<string>(ASC)
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false)
  const [checkUpdate, setCheckUpdate] = useState<boolean>(false)

  const [goals, setGoals] = useState<DashboardGoalUpdateType[]>([
    {
      typeOfPost: '',
      userType: '',
      updatedAt: 0,
      description: '',
      createdAt: 0,
      headline: '',
      deadline: '',
      mediaLinks: [],
      category: '',
      userId: '',
      personalGoalId: '',
      deadlineUnix: 0,
      progress: 0,
    },
  ])
  const [goal, setGoal] = useState<DashboardGoalUpdateType>({
    typeOfPost: '',
    userType: '',
    updatedAt: 0,
    description: '',
    createdAt: 0,
    headline: '',
    deadline: '',
    mediaLinks: [
      {
        type: '',
        url: '',
      },
    ],
    category: '',
    userId: '',
    personalGoalId: '',
    deadlineUnix: 0,
    progress: 0,
  })

  const {
    isLoading: loading,
    data: DataGoals,
    isFetchingNextPage,
    fetchNextPage,
  } = useInfiniteQuery(
    [QUERIES_DASHBOARD.LIST_PERSONAL_GOAL],
    async ({ pageParam = startAfter }) => {
      const res = await axios.get(
        toQueryString(API_GET_PLAYER_GOAL_UPDATE, {
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
    getGoal(limit, startAfter, sorted).then((res) => {
      setGoals(res.data)
    })
  }, [limit, startAfter, sorted, checkUpdate])

  useEffect(() => {
    if (inView) {
      fetchNextPage()
    }
  }, [inView])

  const handleTime = (
    createAt: number,
    deadline: number,
    today: number,
    progress: number
  ) => {
    let result = 0
    let totalPercent = 0

    if (today >= deadline) {
      totalPercent = 100
      result = 100 - progress
    } else {
      totalPercent = Math.round(
        ((today - createAt) * 100) / (deadline - createAt)
      )
      result = Math.abs(totalPercent - progress)
    }

    if (result < 1) {
      return <SvgClockGoal color="#09E099" />
    } else if (result >= 1 && result <= 24) {
      return <SvgClockGoal color="#FF9607" />
    } else if (result > 24) {
      return <SvgClockGoal color="#D60C0C" />
    }

    return null
  }

  const handleTimeRemain = (
    createAt: number,
    deadline: number,
    today: number
  ) => {
    let totalPercent = 0

    if (today >= deadline) {
      totalPercent = 0
    } else {
      totalPercent =
        100 - Math.round(((today - createAt) * 100) / (deadline - createAt))
    }
    return `${totalPercent}%`
  }

  const handleOnClick = (item: DashboardGoalUpdateType) => {
    setGoal(item)
    setIsOpenModal(true)
  }

  return (
    <div>
      {DataGoals &&
        (DataGoals.pages || []).map((page, indexGoal) => (
          <Loading isLoading={loading}>
            <Fragment key={indexGoal}>
              {page &&
                (page || []).map((item, index) => (
                  <div
                    key={index}
                    className="max-h-[184px] w-full mt-[24px] bg-[#13161A] rounded-[8px] p-[24px] cursor-pointer"
                    onClick={() => handleOnClick(item)}
                  >
                    <div className="flex justify-between">
                      <span className="text-[16px]">{item.headline}</span>

                      <TooltipCustom
                        title={`Time remaining: ${handleTimeRemain(
                          item?.createdAt,
                          item?.deadlineUnix,
                          dayjs(new Date()).unix() * 1000
                        )}`}
                        placement="top"
                      >
                        <div>
                          {handleTime(
                            item?.createdAt,
                            item?.deadlineUnix,
                            dayjs(new Date()).unix() * 1000,
                            item?.progress
                          )}
                        </div>
                      </TooltipCustom>
                    </div>
                    <div title="Update goal">
                      <div className={`${cls.truncate}`}>
                        <p className="text-[16px] text-[#A2A5AD] mt-[8px]">
                          {item.description}
                        </p>
                      </div>
                      <MySlider
                        goal
                        readOnly
                        label=""
                        step={25}
                        className="mt-[24px]"
                        value={item?.progress}
                      />
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
          </Loading>
        ))}
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
        <SimpleBar style={{ maxHeight: 850 }}>
          <GoalModal
            setIsOpenModal={setIsOpenModal}
            item={goal && goal}
            update
          />
        </SimpleBar>
      </ModalMui>
    </div>
  )
}
