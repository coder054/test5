import { Text } from 'components/Text'
import { requireAuth } from 'config/firebase-admin'
import { GetServerSideProps, NextApiRequest, NextApiResponse } from 'next'
import { Layout } from 'components/Layout'
import { Progress } from 'antd'
// import { CircularProgress } from '@mui/material'
import {
  CircularProgress,
  GradientCircularProgress,
} from 'react-circular-gradient-progress'
import { Stars } from 'components/common/Stars'
import { BioRadarChart } from 'components/specific/BioRadarChart'

const Biography = () => {
  return (
    <Layout title="Zporter">
      {/* /// Navigate and filter */}
      <div className=" h-[33px] mt-[24px] flex items-center justify-center relative">
        <div className=" flex items-center justify-between pr-[40px]">
          <svg
            className="cursor-pointer mr-[32px] fill-Grey "
            width="24"
            height="25"
            viewBox="0 0 24 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M15.41 17.09L10.83 12.5L15.41 7.91L14 6.5L8 12.5L14 18.5L15.41 17.09Z" />
          </svg>

          <Text name="Header5" className="text-white ">
            #NeoJon070119
          </Text>

          <svg
            className="cursor-pointer ml-[32px] fill-Green"
            width="24"
            height="25"
            viewBox="0 0 24 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M8.59003 17.09L13.17 12.5L8.59003 7.91L10 6.5L16 12.5L10 18.5L8.59003 17.09Z" />
          </svg>
        </div>
        <div className=" flex absolute right-0 top-[4px] items-center ">
          <Text name="Body2" className="text-white mr-[16px] ">
            4 Filters selected
          </Text>
          <svg
            width="24"
            height="25"
            viewBox="0 0 24 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4 11.5H16V13.5H4V11.5ZM4 6.5H20V8.5H4V6.5ZM4 18.5H11H11.235V16.5H11H4V18.5Z"
              fill="#09E099"
            />
          </svg>
        </div>
      </div>

      <div className="h-[32px] "></div>

      {/* /// 2 main column */}
      <div className="grid grid-cols-2 gap-[20px] min-h-[1263px] ">
        <div
          style={{
            background: 'rgba(32, 33, 40, 0.3)',
            backdropFilter: 'blur(68px)',
          }}
          className="rounded-[8px] p-[32px] "
        >
          <div className="text-center text-[24px] leading-[33px]">
            <span className="text-Green mr-[4px] ">Toni</span>
            <span className="text-white ">Kroos</span>
          </div>
          <div className="text-Grey text-[14px] leading-[22px] text-center">
            #SALMOH
          </div>
          <div className="h-[24px] "></div>

          <div className="w-[316px]  mx-auto flex justify-center gap-x-[24px] mb-[24px] ">
            <div className=" flex flex-col justify-between">
              <div className="h-[45px] ">
                <div className="text-white text-[18px] leading-[24px] text-right">
                  LF
                </div>
                <div className="text-Grey text-[12px] leading-[20px] font-bold text-right ">
                  POSITION
                </div>
              </div>

              <img
                src={'/biography/image 18.png'}
                className="w-[24px] ml-auto "
                alt=""
              />
              <div className="h-[45px] ">
                <div className="text-white text-[18px] leading-[24px] text-right">
                  <span className="inline-block mr-[2px] ">10M</span>
                  <svg
                    className="inline-block "
                    width="16"
                    height="25"
                    viewBox="0 0 16 25"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M11.1766 3C11.4798 3.04175 11.7851 3.07306 12.0863 3.12629C13.5752 3.39035 14.8796 4.03536 16 5.01853C15.4798 5.54768 14.9633 6.07215 14.4457 6.59817C12.8255 5.31233 11.0124 4.8938 9.01477 5.47515C7.47458 5.92342 6.34375 6.90294 5.55117 8.32968C7.27434 8.32968 8.96981 8.32968 10.6747 8.32968C10.6747 8.93242 10.6747 9.51272 10.6747 10.1097C8.77689 10.1097 6.88537 10.1097 5.00065 10.1097C4.8757 10.4307 4.87518 11.5219 4.99438 11.8861C6.88015 11.8861 8.77166 11.8861 10.6736 11.8861C10.6736 12.4831 10.6736 13.0629 10.6736 13.6578C8.97713 13.6578 7.28428 13.6578 5.5428 13.6578C6.46085 15.2839 7.77885 16.3145 9.58463 16.6631C11.3946 17.0123 13.0122 16.5499 14.4284 15.405C14.9502 15.9305 15.4704 16.4539 15.9948 16.982C15.564 17.3734 15.0626 17.7262 14.5205 18.02C13.1026 18.7886 11.587 19.1132 9.98092 18.9645C8.00366 18.7819 6.31813 17.9714 4.93217 16.5504C4.16573 15.7645 3.59064 14.8539 3.20638 13.8264C3.15723 13.6954 3.09293 13.6599 2.95752 13.6604C2.03424 13.6667 1.11044 13.6641 0.187165 13.6635C0.124951 13.6635 0.0622141 13.6583 0 13.6557C0 13.0618 0 12.468 0 11.8746C0.0308456 11.8788 0.0616913 11.8861 0.0925369 11.8861C0.932166 11.8866 1.77179 11.8866 2.61142 11.8861C2.64593 11.8861 2.68043 11.8767 2.69507 11.8746C2.69507 11.2834 2.69507 10.7046 2.69507 10.1129C2.6407 10.1129 2.57901 10.1129 2.51732 10.1129C1.80264 10.1129 1.08849 10.1123 0.373807 10.1134C0.249379 10.1134 0.124428 10.1207 0 10.1249C0 9.53098 0 8.93712 0 8.34377C0.0622141 8.34116 0.124428 8.33594 0.187165 8.33594C1.09999 8.33542 2.01229 8.3302 2.92511 8.34064C3.09659 8.34273 3.16821 8.28428 3.22415 8.1319C3.55614 7.23379 4.0481 6.42753 4.68488 5.71468C5.92341 4.32811 7.45942 3.45714 9.29447 3.12733C9.62645 3.06784 9.96471 3.04175 10.3004 3.00052C10.5921 3 10.8843 3 11.1766 3Z"
                      fill="white"
                    />
                  </svg>
                </div>
                <div className="text-Grey text-[12px] leading-[20px] font-bold text-right ">
                  VALUE
                </div>
              </div>
            </div>
            <div className="w-[164px] h-[164px]  mx-auto my-[5px] relative ">
              <GradientCircularProgress
                startColor="#4c3fe0"
                middleColor="#a35ef6"
                endColor="#8a56f0"
                size={164}
                progress={72}
                strokeWidth={1}
                classes={{
                  indicator: {
                    progression: 'text-aqua-400',
                    container: 'bioprogress ',
                    empty: 'text-blue-400',
                  },
                  snail: 'text-orange-400',
                  textContent: {
                    container: 'text-blue-400',
                    text: 'text-yellow-400',
                  },
                }}
              />

              <div
                className=" w-[68px] h-[12px] absolute top-[120px] left-1/2 transform -translate-x-1/2 z-10
                flex justify-center items-center
              "
              >
                <Stars
                  svgStarFull={
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M6 8.635L9.09 10.5L8.27 6.985L11 4.62L7.405 4.315L6 1L4.595 4.315L1 4.62L3.73 6.985L2.91 10.5L6 8.635Z"
                        fill="#FF9607"
                      />
                    </svg>
                  }
                  svgStarHalf={
                    <img
                      src={'/biography/starhalf.png'}
                      className="w-[12px] h-[12px] "
                      alt=""
                    />
                  }
                  svgStarEmpty={
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M6 8.635L9.09 10.5L8.27 6.985L11 4.62L7.405 4.315L6 1L4.595 4.315L1 4.62L3.73 6.985L2.91 10.5L6 8.635Z"
                        fill="#818389"
                      />
                    </svg>
                  }
                  numberOfStars={3.6}
                  className={'gap-x-[2px] '}
                />
              </div>

              <div
                style={{
                  background: '#c4c4c4',
                }}
                className="rounded-full w-[140px] h-[140px] absolute top-1/2 left-1/2 transform
              -translate-x-1/2 -translate-y-1/2  "
              ></div>
              <img
                src={'/biography/tonicroos.png'}
                className="rounded-full w-[140px] h-[140px] absolute top-1/2 left-1/2 transform
              -translate-x-1/2 -translate-y-1/2 "
                alt=""
              />
              <div
                style={{
                  background:
                    'linear-gradient(180deg, rgba(19, 19, 27, 0) 18.23%, #13141E 100%)',
                }}
                className="rounded-full w-[140px] h-[140px] absolute top-1/2 left-1/2 transform
              -translate-x-1/2 -translate-y-1/2  "
              ></div>
            </div>
            <div className=" flex flex-col justify-between">
              <div className="h-[45px] ">
                <div className="text-white text-[18px] leading-[24px] text-left">
                  26
                </div>
                <div className="text-Grey text-[12px] leading-[20px] font-bold text-left ">
                  AGE
                </div>
              </div>

              <img
                src={'/biography/germany 1.png'}
                className="w-[24px] mr-auto "
                alt=""
              />
              <div className="h-[45px] ">
                <div className="text-white text-[18px] leading-[24px] text-left">
                  178cm
                </div>
                <div className="text-Grey text-[12px] leading-[20px] font-bold text-left ">
                  HEIGHT
                </div>
              </div>
            </div>
          </div>

          <div className="mx-auto max-w-[466px] flex justify-between mb-[24px] px-[24px] ">
            {/*  */}
            <div className=" flex items-center gap-x-[8px]">
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9 6C9 6.79565 8.68393 7.55871 8.12132 8.12132C7.55871 8.68393 6.79565 9 6 9C5.20435 9 4.44129 8.68393 3.87868 8.12132C3.31607 7.55871 3 6.79565 3 6C3 5.20435 3.31607 4.44129 3.87868 3.87868C4.44129 3.31607 5.20435 3 6 3C6.79565 3 7.55871 3.31607 8.12132 3.87868C8.68393 4.44129 9 5.20435 9 6ZM17 6C17 6.39397 16.9224 6.78407 16.7716 7.14805C16.6209 7.51203 16.3999 7.84274 16.1213 8.12132C15.8427 8.3999 15.512 8.62087 15.1481 8.77164C14.7841 8.9224 14.394 9 14 9C13.606 9 13.2159 8.9224 12.8519 8.77164C12.488 8.62087 12.1573 8.3999 11.8787 8.12132C11.6001 7.84274 11.3791 7.51203 11.2284 7.14805C11.0776 6.78407 11 6.39397 11 6C11 5.20435 11.3161 4.44129 11.8787 3.87868C12.4413 3.31607 13.2044 3 14 3C14.7956 3 15.5587 3.31607 16.1213 3.87868C16.6839 4.44129 17 5.20435 17 6ZM12.93 17C12.976 16.673 13 16.34 13 16C13.0023 14.4289 12.4737 12.903 11.5 11.67C12.2601 11.2312 13.1223 11.0001 14 11.0001C14.8776 11.0001 15.7399 11.2311 16.4999 11.67C17.26 12.1088 17.8912 12.74 18.3301 13.5C18.7689 14.2601 19 15.1223 19 16V17H12.93ZM6 11C7.32608 11 8.59785 11.5268 9.53553 12.4645C10.4732 13.4021 11 14.6739 11 16V17H1V16C1 14.6739 1.52678 13.4021 2.46447 12.4645C3.40215 11.5268 4.67392 11 6 11Z"
                  fill="#818389"
                />
              </svg>

              <div className=" ">
                <div className="text-[14px] leading-[22px] text-white ">43</div>
                <div className="text-Grey text-[12px] leading-[20px] ">
                  Friends
                </div>
              </div>
            </div>
            {/*  */}
            <div className=" flex items-center gap-x-[8px]">
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M16.8375 3.99292C15.89 3.05042 14.645 2.53125 13.33 2.53125C12.0942 2.53125 10.92 2.99125 10 3.82958C9.08003 2.99125 7.90669 2.53125 6.67002 2.53125C5.35502 2.53125 4.11002 3.05042 3.15919 3.99625C1.19836 5.96542 1.19919 9.04542 3.16086 11.0063L10 17.8454L16.8392 11.0063C18.8009 9.04542 18.8017 5.96542 16.8375 3.99292Z"
                  fill="#818389"
                />
              </svg>

              <div className=" ">
                <div className="text-[14px] leading-[22px] text-white ">
                  431
                </div>
                <div className="text-Grey text-[12px] leading-[20px] ">
                  Fans
                </div>
              </div>
            </div>
            {/*  */}
            <div className=" flex items-center gap-x-[8px]">
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9.99998 3.75C5.83331 3.75 2.27498 6.34167 0.833313 10C2.27498 13.6583 5.83331 16.25 9.99998 16.25C14.1666 16.25 17.725 13.6583 19.1666 10C17.725 6.34167 14.1666 3.75 9.99998 3.75ZM9.99998 14.1667C7.69998 14.1667 5.83331 12.3 5.83331 10C5.83331 7.7 7.69998 5.83333 9.99998 5.83333C12.3 5.83333 14.1666 7.7 14.1666 10C14.1666 12.3 12.3 14.1667 9.99998 14.1667ZM9.99998 7.5C8.61665 7.5 7.49998 8.61667 7.49998 10C7.49998 11.3833 8.61665 12.5 9.99998 12.5C11.3833 12.5 12.5 11.3833 12.5 10C12.5 8.61667 11.3833 7.5 9.99998 7.5Z"
                  fill="#818389"
                />
              </svg>

              <div className=" ">
                <div className="text-[14px] leading-[22px] text-white ">
                  602
                </div>
                <div className="text-Grey text-[12px] leading-[20px] ">
                  Follows
                </div>
              </div>
            </div>
            {/*  */}
          </div>

          <div className="w-[466px] mx-auto mb-[24px] ">
            <button className="w-[220px] h-[50px] rounded-[8px] text-[16px] leading-[28px] text-white font-SVNGilroy bg-Blue mr-[26px] font-medium ">
              Add
            </button>
            <button className="w-[220px] h-[50px] rounded-[8px] text-[16px] leading-[28px] text-white font-SVNGilroy bg-transparent text-Green border border-Green font-medium ">
              Follow
            </button>
          </div>

          <div className="mx-auto max-w-[466px] text-white text-[14px] leading-[22px] ">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Duis
            aute irure dolor in reprehenderit in voluptate velit esse cillum
            dolore eu fugiat nulla pariatur.
          </div>

          <div className="h-[1px] my-[40px] bg-Stroke "></div>
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
          <div className="bioradarchart max-w-[466px] mx-auto relative mb-[32px] ">
            <BioRadarChart></BioRadarChart>
            <div
              className="w-[404px] absolute left-1/2 transform -translate-x-1/2 bottom-[46px] min-h-[60px] 
            flex justify-between
            "
            >
              {[
                {
                  title: 'LEFT FOOT',
                  rate: 3.4,
                },
                {
                  title: 'RIGHT FOOT',
                  rate: 4.5,
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
                    className={'gap-x-[12px]'}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="max-w-[466px] mx-auto ">
            <Text name="Subtitle1" className="text-Grey mb-[12px]">
              SPECIALITIES
            </Text>
            <span
              className="rounded-[16px] bg-Blue h-[30px] px-[12px] py-[4px] inline-flex items-center justify-center
            text-white font-medium text-[14px] leading-[22px]"
            >
              #Leader
            </span>
          </div>
        </div>
        <div
          style={{
            background: 'rgba(32, 33, 40, 0.3)',
            backdropFilter: 'blur(68px)',
          }}
          className="rounded-[8px] p-[32px] "
        ></div>
      </div>

      {/* /// top videos */}
    </Layout>
  )
}

export default Biography

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  return { props: {} }
}
