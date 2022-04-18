import { useState } from 'react'
import { useQuery } from 'react-query'
import SimpleBar from 'simplebar-react'
import { MySlider } from 'src/components/MySlider'
import { DashboardGoalUpdateType } from 'src/constants/types'
import { SvgClockGoal } from 'src/imports/svgs'
import { getGoal } from 'src/service/dashboard/development.service'

export const ListGoal = () => {
  const [limit, setLimit] = useState<number>(10)
  const [startAfter, setStartAfter] = useState<number>(1)
  const [sorted, setSorted] = useState<string>('asc')
  const [goals, setGoals] = useState<DashboardGoalUpdateType[]>([
    {
      typeOfPost: '',
      userType: '',
      updatedAt: 0,
      description: '',
      createdAt: 0,
      headline: '',
      deadline: '',
      mediaLinks: [''],
      category: '',
      userId: '',
      personalGoalId: '',
      deadlineUnix: 0,
      progress: 0,
    },
  ])

  const { isLoading: loading, data: DataGoals } = useQuery(
    [],
    () => getGoal(limit, startAfter, sorted),
    {
      onSuccess: (res) => {
        console.log('res:', res)
        if (res.status === 200) {
          setGoals(res.data)
        }
      },
    }
  )

  return (
    <div>
      {goals &&
        (goals || []).map((item) => (
          <div className="max-h-[184px] w-full mt-[24px] bg-[#13161A] rounded-[8px] p-[24px]">
            <div className="flex justify-between">
              <span className="text-[16px]">{item.headline}</span>
              <SvgClockGoal />
            </div>

            <p className="text-[16px] text-[#A2A5AD] mt-[8px]">
              {item.description}
            </p>
            <MySlider goal readOnly label="" step={25} className="mt-[24px]" />
          </div>
        ))}
    </div>
  )
}
