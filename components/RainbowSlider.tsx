import { Slider } from 'antd'

export const RainbowSlider = ({
  min,
  max,
  value,
  setValue,
}: {
  min: number
  max: number
  value: number
  setValue: any
}) => {
  return (
    <div className="slider-rainbow relative pt-[30px] ">
      <div
        className=" 
        absolute
        left-[6px] top-0
        py-1 px-[6px] min-w-[28px] h-[28px] rounded-[4px] bg-[#252627]
        inline-flex justify-center items-center
        text-Red font-bold text-[14px] leading-[150%]
      "
      >
        {min}
      </div>

      <div
        className=" 
        absolute
        right-[6px] top-0
        py-1 px-[6px] min-w-[28px] h-[28px] rounded-[4px] bg-[#252627]
        inline-flex justify-center items-center
        text-Green font-bold text-[14px] leading-[150%]
      "
      >
        {max}
      </div>
      <Slider
        min={min}
        max={max}
        value={value}
        onChange={(value) => {
          setValue(value)
        }}
      />
    </div>
  )
}
