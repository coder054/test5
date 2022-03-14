import StarIcon from '@mui/icons-material/Star'
import { Rating, Slider, Tooltip, SliderProps } from '@mui/material'
import clsx from 'clsx'

type MySliderProps = SliderProps & {
  step: number
  value: number
  label: string
  isStar?: boolean
  isPoint?: boolean
  readOnly?: boolean
  labelClass?: string
  isAdjective?: boolean
  onChange?: (value: number) => void
}

export const MySlider = ({
  step,
  value,
  label,
  isStar,
  isPoint,
  readOnly,
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
    <div>
      <p className={clsx('text-[16px] font-normal', labelClass)}>{label}</p>
      <Slider
        step={step}
        value={value}
        size="small"
        onChange={handleChange}
        valueLabelDisplay="auto"
        sx={{ color: '#09E099', paddingBottom: 1, paddingTop: 0 }}
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
          <p className="text-[#A2A5AD] text-[16px]">{value}</p>
        </div>
      )}
      {isAdjective && (
        <div className="flex justify-between text-[#A2A5AD] text-[14px] font-normal">
          <span className={clsx(handleRange(0))}>Very bad</span>
          <span className={clsx(handleRange(25))}>Bad</span>
          <span className={clsx(handleRange(50))}>Normal</span>
          <span className={clsx(handleRange(75))}>Good</span>
          <span className={clsx(handleRange(100))}>Very good</span>
        </div>
      )}
    </div>
  )
}
