import { useMemo } from 'react'

const PERSONAL_BARS =
  'bg-[#4654EA] w-[48px] flex justify-center items-center mt-[4px] rounded-[4px] cursor-pointer text-[15px] font-semibold'
const AVG_BARS =
  'bg-avgBar w-[48px] flex justify-center items-center  mt-[4px]  rounded-[4px] cursor-pointer'
const BARS = 'flex flex-col items-center justify-end text-[16px] h-[300px]'

type BarsChartType = {
  unit?: string
  personal: { group: number; personal: number; team: number }
  average: { group: number; personal: number; team: number }
}

const BarsChart = ({ unit, personal, average }: BarsChartType) => {
  const PERSONAL_TOTAL = useMemo(() => {
    if (personal) {
      return personal?.group + personal?.team + personal?.personal
    }
    return 0
  }, [personal])

  const AVERAGE_TOTAL = useMemo(() => {
    if (average) {
      return average?.group + average?.team + average?.personal
    }
    return 0
  }, [average])

  const PERSONAL_HEIGHT = useMemo(() => {
    return Math.round(
      (PERSONAL_TOTAL / (PERSONAL_TOTAL + AVERAGE_TOTAL)) * 100 * 2
    )
  }, [PERSONAL_TOTAL, AVERAGE_TOTAL])

  const AVERAGE_HEIGHT = useMemo(() => {
    return Math.round(
      (AVERAGE_TOTAL / (PERSONAL_TOTAL + AVERAGE_TOTAL)) * 100 * 2
    )
  }, [PERSONAL_TOTAL, AVERAGE_TOTAL])

  const calculateStack = (stack: number, bar: number) => {
    const total = Math.round((stack / bar) * 100)
    if (total < 20) {
      return 20 + stack
    }
    if (total > 200) {
      return 200
    }
    return total
  }

  const mainHeight = useMemo(() => {
    if (PERSONAL_HEIGHT > AVERAGE_HEIGHT) {
      return PERSONAL_HEIGHT
    }
    return AVERAGE_HEIGHT
  }, [])

  return (
    <div className="flex flex-col items-center space-y-6">
      <div className="flex space-x-2">
        <div className={BARS}>
          <span className="text-[12px]">
            {PERSONAL_TOTAL}
            {unit && unit}
          </span>
          {personal?.team ? (
            <span
              style={{
                height: calculateStack(personal?.team, mainHeight),
              }}
              className={PERSONAL_BARS}
            >
              T
            </span>
          ) : (
            <></>
          )}
          {personal?.group ? (
            <span
              style={{
                height: calculateStack(personal?.group, mainHeight),
              }}
              className={PERSONAL_BARS}
            >
              G
            </span>
          ) : (
            <></>
          )}
          {personal?.personal ? (
            <span
              style={{
                height: calculateStack(personal?.personal, mainHeight),
              }}
              className={PERSONAL_BARS}
            >
              P
            </span>
          ) : (
            <></>
          )}

          <span className="text-[#4654EA] mt-2">YOU</span>
        </div>
        <div className={BARS}>
          <span className="text-[12px] text-[#A2A5AD]">
            {AVERAGE_TOTAL}
            {unit && unit}
          </span>
          {average?.team ? (
            <span
              style={{
                height: calculateStack(average?.team, mainHeight),
              }}
              className={AVG_BARS}
            >
              T
            </span>
          ) : (
            <></>
          )}
          {average?.group ? (
            <span
              style={{
                height: calculateStack(average?.group, mainHeight),
              }}
              className={AVG_BARS + 'my-[2px]'}
            >
              G
            </span>
          ) : (
            <></>
          )}
          {average?.personal ? (
            <span
              style={{
                height: calculateStack(average?.personal, mainHeight),
              }}
              className={AVG_BARS}
            >
              P
            </span>
          ) : (
            <></>
          )}
          <span className="text-[#A2A5AD] mt-2">AVG</span>
        </div>
      </div>
    </div>
  )
}

export default BarsChart
