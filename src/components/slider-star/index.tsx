import { Slider, Rate } from 'antd'
import { useState } from 'react'
const cls = require('./slider-star.module.css')
import clsx from 'clsx'

interface SliderStarProps {
  label?: string
  values?: number
  setValues?: Function
  className?: string
  star?: boolean
  point?: boolean
}

export const SliderStar = ({
  label,
  star,
  point,
  className,
  setValues,
}: SliderStarProps) => {
  const [value, setValue] = useState<number>(0)

  const classNames = clsx(className && className)

  const handleOnChange = (value) => {
    setValue(value)
    setValues && setValues(value)
  }

  return (
    <div className={`${classNames} slider-green relative`}>
      <p className="absolute text-[14px] tetx-[#FFFFFF]">{label}</p>
      <div className={`absolute w-full top-[12px] ml-[0px]`}>
        <Slider
          step={star ? 5 : 1}
          value={value}
          onChange={(value) => handleOnChange(value)}
        />
      </div>
      <div className="absolute right-[6px] top-[34px] text-[14px] leading-[22px] text-white ">
        {star && <Rate allowHalf disabled value={value / 20} />}
        {point && <span>{value}</span>}
      </div>
    </div>
  )
}
