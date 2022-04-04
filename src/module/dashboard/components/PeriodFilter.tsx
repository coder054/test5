import clsx from 'clsx'
import { useCallback, useEffect, useState } from 'react'
import { Button } from 'src/components/Button'
import { PeriodFilterIcon, XIcon } from 'src/components/icons'
import { ModalMui } from 'src/components/ModalMui'
import { MySlider } from 'src/components/MySlider'
import { LastRangeDateType } from 'src/constants/types/dashboard-training.types'
import { SvgFilter } from 'src/imports/svgs'

type PeriodFilterProps = {
  label: string
  value?: string
  onChange?: (value: LastRangeDateType) => void
  className?: string
}

export const PeriodFilter = ({
  value,
  label,
  className,
  onChange,
}: PeriodFilterProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [current, setCurrent] = useState<number>(0)
  const [lastValue, setLastValue] = useState<number>(0)

  const generateInput = (value: string) => {
    switch (value) {
      case '7':
        return 0
      case '30':
        return 10
      case '90':
        return 20
      case '180':
        return 30
      case '365':
        return 40
      case '1095':
        return 50
      case 'All':
        return 60
    }
  }

  const generateOutput = useCallback(
    (value: number) => {
      switch (value) {
        case 0:
          return { query: '7', display: '7 days' }
        case 10:
          return { query: '30', display: '30 days' }
        case 20:
          return { query: '90', display: '90 days' }
        case 30:
          return { query: '180', display: '180 days' }
        case 40:
          return { query: '365', display: '1 year' }
        case 50:
          return { query: '1095', display: '3 years' }
        case 60:
          return { query: 'All', display: 'All' }
      }
    },
    [current]
  )

  const submit = () => {
    setLastValue(current)
    onChange && onChange(generateOutput(current).query)
    setIsOpen(false)
  }

  const reset = () => {
    setCurrent(0)
  }

  useEffect(() => {
    setLastValue(generateInput(value))
    setCurrent(generateInput(value))
  }, [value, isOpen])

  return (
    <div className={clsx('flex w-full justify-end', className)}>
      <button
        onClick={() => setIsOpen(true)}
        type="button"
        className="flex items-center space-x-4"
      >
        <p className="text-[#09E099]">
          {lastValue !== 60 ? 'Last' : ''} {generateOutput(lastValue)?.display}
        </p>
        <SvgFilter />
      </button>
      <ModalMui
        customStyle={{ width: 550 }}
        isOpen={isOpen}
        onClose={setIsOpen}
      >
        <div className="flex flex-col items-center space-y-3 p-2 relative">
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="absolute right-0 top-0"
          >
            <XIcon />
          </button>
          <span>
            <PeriodFilterIcon />
          </span>
          <p className="text-[24px] font-medium">{label}</p>
          <div className="w-full py-2">
            <MySlider
              label={`${current !== 60 ? 'Last:' : ''} ${
                generateOutput(current)?.display
              }`}
              isFilter
              step={10}
              max={60}
              value={current}
              onChange={(e) => setCurrent(e)}
              labelClass="text-[#A2A5AD]"
            />
          </div>
          <div className="grid grid-cols-2 w-full gap-x-6">
            <Button
              type="submit"
              label="Filter"
              onClick={submit}
              className="bg-[#4654EA] border-2 border-[#4654EA] py-[9px] rounded-[8px] w-full"
            />
            <Button
              type="button"
              onClick={reset}
              loadingColor="#09E099"
              className="border-2 border-[#09E099] py-[9px] rounded-[8px] w-full"
              labelClass="text-[#09E099]"
              label="Reset"
            />
          </div>
        </div>
      </ModalMui>
    </div>
  )
}
