import { MenuItem } from '@mui/material'
import clsx from 'clsx'
import { ReactElement, useCallback, useEffect, useState } from 'react'
import { MyInput } from 'src/components'
import { Button } from 'src/components/Button'
import { PeriodFilterIcon, XIcon } from 'src/components/icons'
import { ModalMui } from 'src/components/ModalMui'
import { MySlider } from 'src/components/MySlider'
import { LastRangeDateType } from 'src/constants/types/dashboard/training.types'
import { SvgFilter } from 'src/imports/svgs'

type PeriodFilterProps = {
  label: string
  value?: string
  onChange?: (value: LastRangeDateType) => void
  className?: string
  children?: ReactElement
  option?: string
  options?: { value: string; label: string }[]
  optionLabel?: string
  healthType?: string
  health?: boolean
  optionChange?: (value: string) => void
  setCheckFilter?: (filter: boolean) => void
  setFilterForm?: Function
  setHealthChartType?: Function
}

export const PeriodFilter = ({
  value,
  label,
  className,
  onChange,
  option,
  options,
  optionLabel,
  health,
  optionChange,
  setCheckFilter,
  children,
  setFilterForm,
  healthType,
  setHealthChartType,
}: PeriodFilterProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [current, setCurrent] = useState<number>(0)
  const [lastValue, setLastValue] = useState<number>(0)
  const [currentOption, setCurrentOption] = useState<string>('')
  const date = new Date()

  const generateInput = (value: string) => {
    if (health) {
      switch (value) {
        case '1':
          return 0
        case '3':
          return 10
        case '6':
          return 20
        case '12':
          return 30
        case '18':
          return 40
        case '24':
          return 50
        case '36':
          return 60
      }
    } else {
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
  }

  const generateOutput = useCallback(
    (value: number) => {
      if (health) {
        switch (value) {
          case 0:
            return { query: '1', display: '1 months' }
          case 10:
            return { query: '3', display: '3 months' }
          case 20:
            return { query: '6', display: '6 months' }
          case 30:
            return { query: '12', display: '1 years' }
          case 40:
            return { query: '18', display: '1.5 year' }
          case 50:
            return { query: '24', display: '2 years' }
          case 60:
            return { query: '36', display: '3 years' }
        }
      } else {
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
      }
    },
    [current]
  )

  const submit = () => {
    setLastValue(current)
    onChange && onChange(generateOutput(current).query)
    optionChange && optionChange(currentOption)
    setCheckFilter && setCheckFilter(true)
    setIsOpen(false)
  }

  const reset = () => {
    setCurrent(0)
    options && setCurrentOption(options[0].value)
    setCheckFilter && setCheckFilter(false)
    setHealthChartType && setHealthChartType('BMI')
    setFilterForm &&
      setFilterForm({
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
  }

  useEffect(() => {
    setCurrent(generateInput(value))
    setLastValue(generateInput(value))
    setCurrentOption(option)
  }, [value, isOpen, option])

  return (
    <div className={clsx('flex w-full justify-end', className)}>
      <button
        onClick={() => setIsOpen(true)}
        type="button"
        className="flex items-center space-x-4"
      >
        {!health ? (
          <p className="text-[#09E099]">
            {lastValue !== 60 ? 'Last' : ''}{' '}
            {generateOutput(lastValue)?.display}
          </p>
        ) : null}
        {health ? (
          <p className="text-[#09E099]">
            {date.getFullYear()} - {healthType}{' '}
            {lastValue !== 60 ? 'Development last' : ''}{' '}
            {generateOutput(lastValue)?.display}
          </p>
        ) : null}
        <SvgFilter />
      </button>
      <ModalMui
        customStyle={{ width: 550, top: '50%' }}
        isOpen={isOpen}
        onClose={setIsOpen}
      >
        <div className="flex flex-col items-center space-y-4 p-2 relative">
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
              health={health}
            />
          </div>
          {optionLabel && (
            <MyInput
              select
              className="py-3"
              value={currentOption}
              label={optionLabel}
              onChange={(_, e) => setCurrentOption(e.props.value)}
            >
              {options.map((option: { value: string; label: string }) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </MyInput>
          )}
          {children && children}
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
