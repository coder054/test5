import { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import SimpleBar from 'simplebar-react'
import { MySlider } from 'src/components/MySlider'
import { DashboardGoalUpdateType } from 'src/constants/types'
import { SvgClockGoal } from 'src/imports/svgs'
import { getGoal } from 'src/service/dashboard/development.service'
import dayjs from 'dayjs'
import { TooltipCustom } from 'src/components'
import { ModalMui } from 'src/components/ModalMui'
import { isMobile } from 'react-device-detect'
import { setItem } from 'localforage'
import { GoalModal } from './modal/goal-modal'
const cls = require('./component.module.css')

interface ListGoalProps {}

export const ListGoal = () => {
  const [limit, setLimit] = useState<number>(10)
  const [startAfter, setStartAfter] = useState<number>(null)
  const [sorted, setSorted] = useState<string>('desc')
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

  // const { isLoading: loading, data: DataGoals } = useQuery(
  //   [],
  //   () => getGoal(limit, startAfter, sorted),
  //   {
  //     onSuccess: (res) => {
  //       // console.log('res:', res)
  //       if (res.status === 200) {
  //         setGoals(res.data)
  //       }
  //     },
  //   }
  // )

  useEffect(() => {
    getGoal(limit, startAfter, sorted).then((res) => {
      setGoals(res.data)
    })
  }, [limit, startAfter, sorted, checkUpdate])

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
      totalPercent = 100
    } else {
      totalPercent = Math.round(
        ((today - createAt) * 100) / (deadline - createAt)
      )
    }
    return totalPercent
  }

  const handleOnClick = (item: DashboardGoalUpdateType) => {
    setGoal(item)
    setIsOpenModal(true)
    if (checkUpdate) {
      setCheckUpdate(false)
    }
  }

  return (
    <div>
      {goals &&
        (goals || []).map((item) => (
          <div
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
            setCheckUpdate={setCheckUpdate}
          />
        </SimpleBar>
      </ModalMui>
    </div>
  )
}
