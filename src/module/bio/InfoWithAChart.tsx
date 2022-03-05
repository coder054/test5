import { IBiographyPlayer } from 'src/pages/biography/[username]/[fullname]'
import { BioRadarChart } from 'src/components/specific/BioRadarChart'
import { Text } from 'src/components/Text'
import { Stars } from 'src/components/common/Stars'
import { Button } from 'src/components'

export const InforWithAChart = ({
  dataBio,
  dataBioRadarChart,
  signupForm,
}: {
  dataBio: IBiographyPlayer
  dataBioRadarChart: any
  signupForm?: boolean
}) => {
  return (
    <>
      <div className="max-w-[466px] mx-auto p-[8px] flex items-center gap-x-[4px] bg-Dark-3 mb-[20px] ">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM13 5.3L14.35 4.35C16.17 4.91 17.72 6.11 18.73 7.69L18.34 9.03L16.99 9.49L13 6.7V5.3ZM9.65 4.35L11 5.3V6.7L7.01 9.49L5.66 9.03L5.27 7.69C6.28 6.12 7.83 4.92 9.65 4.35ZM7.08 17.11L5.94 17.21C4.73 15.81 4 13.99 4 12C4 11.88 4.01 11.77 4.02 11.65L5.02 10.92L6.4 11.4L7.86 15.74L7.08 17.11ZM14.5 19.59C13.71 19.85 12.87 20 12 20C11.13 20 10.29 19.85 9.5 19.59L8.81 18.1L9.45 17H14.56L15.2 18.11L14.5 19.59ZM14.27 15H9.73L8.38 10.98L12 8.44L15.63 10.98L14.27 15ZM18.06 17.21L16.92 17.11L16.13 15.74L17.59 11.4L18.98 10.93L19.98 11.66C19.99 11.77 20 11.88 20 12C20 13.99 19.27 15.81 18.06 17.21Z"
            fill="#09E099"
          />
        </svg>

        <div className=" text-[14px] leading-[22px] text-white ">
          Player Profile
        </div>
      </div>
      <div className="bioradarchart sm:max-w-[466px] mx-auto relative mb-[32px] text-center ">
        <div className="bioradarchartsmall flex sm:hidden justify-center mx-auto ">
          <BioRadarChart type="small" data={dataBioRadarChart}></BioRadarChart>
        </div>

        <div className="bioradarchartnormal hidden sm:block ">
          <BioRadarChart type="normal" data={dataBioRadarChart}></BioRadarChart>
        </div>

        <div
          className="w-full sm:w-[404px] absolute left-1/2 transform -translate-x-1/2 bottom-[46px] min-h-[60px] 
              flex justify-between
            "
        >
          {[
            {
              title: 'LEFT FOOT',
              rate: dataBio?.leftFoot,
            },
            {
              title: 'RIGHT FOOT',
              rate: dataBio?.rightFoot,
            },
          ].map((o, index) => (
            <div key={o.title} className="">
              <div className="text-white font-semibold text-[16px] leading-[28px] text-center mb-2 ">
                {o.title}
              </div>

              <Stars
                svgStarFull={
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z"
                      fill="#FFB400"
                    />
                  </svg>
                }
                svgStarHalf={
                  <img
                    src={'/biography/starhalf.png'}
                    className="w-[24px] h-[24px] "
                    alt=""
                  />
                }
                svgStarEmpty={
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z"
                      fill="#484A4D"
                    />
                  </svg>
                }
                numberOfStars={o.rate}
                className={' gap-x-[4px] sm:gap-x-[12px]'}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-[466px] mx-auto ">
        <Text name="Subtitle1" className="text-Grey mb-[12px]">
          SPECIALITIES
        </Text>
        {dataBio?.specialities.map((speciality) => (
          <span
            key={speciality}
            className="rounded-[16px] bg-Blue h-[30px] px-[12px] py-[4px] inline-flex items-center justify-center
            text-white font-medium text-[14px] leading-[22px] mr-2  mb-2"
          >
            {`#${speciality}`}
          </span>
        ))}

        {signupForm && (
          <Button
            text="Next"
            className="text-[15px] bg-[#4654EA] rounded-[8px] h-[48px]"
          />
        )}
      </div>
    </>
  )
}
