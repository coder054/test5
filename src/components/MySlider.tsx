import StarIcon from '@mui/icons-material/Star'
import { Rating, Slider, Tooltip, SliderProps } from '@mui/material'
import clsx from 'clsx'
import { styled } from '@mui/material/styles'

type MySliderProps = SliderProps & {
  step: number
  unit?: string
  value?: number
  label: string
  isFilter?: boolean
  head2headfilter?: boolean
  isStar?: boolean
  isPoint?: boolean
  isNumber?: boolean
  isScale?: boolean
  goal?: boolean
  readOnly?: boolean
  labelClass?: string
  isAdjective?: boolean
  health?: boolean
  onChange?: (value: number) => void
}

const CustomSlider = styled(Slider)(({ theme }) => ({
  '& .MuiSlider-thumb': {
    backgroundColor: '#09E099',
    height: 12,
    width: 12,
  },
  '& .MuiSlider-rail': {
    color: '#A2A5AD',
  },
}))

export const MySlider = ({
  step,
  unit,
  value,
  label,
  isStar,
  isScale,
  isPoint,
  isFilter,
  head2headfilter,
  isNumber,
  readOnly,
  health,
  goal,
  onChange,
  labelClass,
  isAdjective,
  ...rest
}: MySliderProps) => {
  const ValueLabelComponent = (props: any) => {
    const { children, value } = props
    return (
      <Tooltip enterTouchDelay={0} placement="top" title={value}>
        {children}
      </Tooltip>
    )
  }

  const handleRange = (num: number) => {
    if (value === num) {
      return 'text-[#09E099]'
    }
    return
  }

  const handleChange = (_: any, newValue: number | number[]) => {
    onChange && onChange(newValue as number)
  }

  return (
    <div className="tabletM:text-[15px] mobileM:text-[12px] ">
      <p className={clsx('font-normal', labelClass)}>{label}</p>
      <CustomSlider
        step={step}
        value={value}
        size="small"
        onChange={handleChange}
        valueLabelDisplay="auto"
        sx={{
          color: '#09E099',
          paddingBottom: 1,
          paddingTop: 0,
          '& .MuiSlider-rail': { backgroundColor: '#A2A5AD' },
        }}
        components={{
          ValueLabel: ValueLabelComponent,
        }}
        {...rest}
      />
      {isStar && (
        <div className="flex justify-end">
          <Rating
            readOnly={readOnly}
            precision={0.5}
            value={value / 20}
            emptyIcon={<StarIcon style={{ color: '#D1D5DB' }} />}
          />
        </div>
      )}
      {isPoint && (
        <div className="flex justify-end">
          <p className="text-[#A2A5AD]">
            {value}
            {unit}
          </p>
        </div>
      )}
      {isNumber && (
        <div className="flex justify-end">
          <p className="text-[#A2A5AD]">{value}</p>
        </div>
      )}
      {isAdjective && (
        <div className="flex justify-between text-[#A2A5AD] font-normal">
          <span className={clsx(handleRange(0))}>Very bad</span>
          <span className={clsx(handleRange(25))}>Bad</span>
          <span className={clsx(handleRange(50))}>Normal</span>
          <span className={clsx(handleRange(75))}>Good</span>
          <span className={clsx(handleRange(100))}>Very good</span>
        </div>
      )}
      {isScale && (
        <div className="flex justify-between text-[#A2A5AD] font-normal">
          <span className={clsx(handleRange(0))}>Very low</span>
          <span className={clsx(handleRange(25))}>Low</span>
          <span className={clsx(handleRange(50))}>Normal</span>
          <span className={clsx(handleRange(75))}>High</span>
          <span className={clsx(handleRange(100))}>Very high</span>
        </div>
      )}
      {goal && (
        <div className="flex justify-between text-[#A2A5AD] font-normal">
          <span className={clsx(handleRange(0))}>0%</span>
          <span className={clsx(handleRange(25))}>25%</span>
          <span className={clsx(handleRange(50))}>50%</span>
          <span className={clsx(handleRange(75))}>75%</span>
          <span className={clsx(handleRange(100))}>100%</span>
        </div>
      )}
      {isFilter && !health ? (
        <div className="flex justify-between text-[#A2A5AD] font-normal">
          <span>7d</span>
          <span>30d</span>
          <span>90d</span>
          <span>180d</span>
          <span>1y</span>
          <span>3y</span>
          <span>All</span>
        </div>
      ) : null}
      {isFilter && health ? (
        <div className="flex justify-between text-[#A2A5AD]  font-normal">
          <span>1m</span>
          <span>3m</span>
          <span>6m</span>
          <span>1y</span>
          <span>1.5y</span>
          <span>2y</span>
          <span>3y</span>
        </div>
      ) : null}
      {head2headfilter && (
        <div className="flex justify-between text-[#A2A5AD] font-normal">
          <span className={clsx(handleRange(0))}>0a%</span>
          <span className={clsx(handleRange(25))}>25a%</span>
          <span className={clsx(handleRange(50))}>50%</span>
          <span className={clsx(handleRange(75))}>75%</span>
          <span className={clsx(handleRange(100))}>100%</span>
        </div>
      )}
    </div>
  )
}
