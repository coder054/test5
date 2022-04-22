import { useState } from 'react'
import { ButtonAddPopup } from 'src/components'
import { LastRangeDateType } from 'src/constants/types/dashboard/training.types'
import { PeriodFilter } from '../components/PeriodFilter'
import { InjuryChart } from './component/injury-chart'
import { ListInjuryReport } from './component/list-injury-report'
const cls = require('../overview/overview.module.css')
const style = require('./pain.module.css')

export const Pain = () => {
  const [range, setRange] = useState<LastRangeDateType>('180')
  const [limit, setLimit] = useState<number>(10)
  const [sorted, setSorted] = useState<string>('desc')
  const [items, setItems] = useState([])
  const [startAfter, setStartAfter] = useState<number>(1)
  const [checkFilter, setCheckFilter] = useState<boolean>(false)
  const [message, setMessage] = useState<boolean>(true)

  const handleMessage = () => {
    if (message) {
      setMessage(false)
    } else {
      setMessage(true)
    }
  }

  return (
    <div className="grid grid-cols-12 space-y-7 mb-[66px]">
      <div className="col-span-12">
        <PeriodFilter
          value={range}
          onChange={setRange}
          label="Filter pain"
          setCheckFilter={setCheckFilter}
        ></PeriodFilter>
      </div>

      <div className={`${cls.item} col-span-12 p-[16px] md:p-[32px]`}>
        <InjuryChart lastDateRange={range} />
      </div>

      <div className={`${cls.item} col-span-12 p-[16px] md:p-[32px]`}>
        <p className="mb-[24px]">Injury reports</p>
        <ListInjuryReport />
      </div>

      <div className="fixed bottom-[52px] h-[64px] max-w-[440px]">
        <div className="mb-4 flex items-end">
          <div
            className={`${style.avatar} mt-[24px] cursor-pointer`}
            onClick={handleMessage}
          ></div>
          {message ? (
            <div
              style={{ borderRadius: '8px 8px 8px 0px' }}
              className="bg-[#2C2A8D] text-[14px] h-[64px] max-w-[380px] p-[10px] ml-[18px]"
            >
              <span className="text-[#09E099]">Track your pain! </span>
              <span>
                Limit your injurys! Track and compare your injurys with your
                peers. To avoid feature injurys.
              </span>
            </div>
          ) : null}
        </div>
      </div>

      <ButtonAddPopup />
    </div>
  )
}
