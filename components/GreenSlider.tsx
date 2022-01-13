import { Slider } from 'antd'

export const GreenSlider = () => {
  return (
    <div className="slider-green ">
      <Slider defaultValue={30} />

      <style jsx>{`
        .ant-slider-track {
          position: absolute;
          height: 4px;
          background-color: #ff0000 !important;
          border-radius: 2px;
          transition: background-color 0.3s;
        }
      `}</style>
    </div>
  )
}
