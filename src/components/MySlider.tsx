import { Rating, Slider, Tooltip } from '@mui/material'
import clsx from 'clsx'
import StarIcon from '@mui/icons-material/Star'

type MySliderProps = {
  value: number
  label: string
  isStar?: boolean
  isPoint?: boolean
  labelClass?: string
  onChange?: (value: number) => void
}

export const MySlider = ({
  value,
  label,
  isStar,
  isPoint,
  onChange,
  labelClass,
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

  const handleChange = (_: any, newValue: number | number[]) => {
    onChange && onChange(newValue as number)
  }

  return (
    <div {...rest}>
      <p className={clsx('text-[16px] font-normal', labelClass)}>{label}</p>
      <Slider
        // step={5}
        value={value}
        size="medium"
        onChange={handleChange}
        sx={{ color: '#09E099', paddingBottom: 0, paddingTop: 0 }}
        valueLabelDisplay="auto"
        components={{
          ValueLabel: ValueLabelComponent,
        }}
      />
      {isStar && (
        <div className="flex justify-end">
          <Rating
            precision={0.5}
            value={value / 20}
            emptyIcon={<StarIcon style={{ opacity: 1 }} fontSize="inherit" />}
          />
        </div>
      )}
      {isPoint && (
        <div className="flex justify-end">
          <p className="text-[#A2A5AD] text-[16px]">{value}</p>
        </div>
      )}
    </div>
  )
}
