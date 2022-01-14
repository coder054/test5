import { Slider } from 'antd'

export const GreenSlider = () => {
  return (
    <div className="slider-green relative ">
      <Slider defaultValue={30} />
      <div className=" absolute left-[6px] bottom-[-22px] text-[14px] leading-[22px] text-white ">
        Very unlikely
      </div>
      <div className=" absolute right-[6px] bottom-[-22px] text-[14px] leading-[22px] text-white ">
        Very likely
      </div>
    </div>
  )
}
