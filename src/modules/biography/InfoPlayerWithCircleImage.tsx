import { useMemo, useState } from 'react'
import { GradientCircularProgress } from 'react-circular-gradient-progress'
import { Button } from 'src/components'
import { Comments } from 'src/components/Comments'
import { Stars } from 'src/components/common/Stars'
import { API_FRIENDS } from 'src/constants/api.constants'
import {
  EStatusRelationShip,
  IBiographyPlayer,
  IBiographyCoach,
} from 'src/constants/types/biography.types'
import { axios } from 'src/utils/axios'
import { safeHttpImage } from 'src/utils/utils'
import { useAuth } from '../authentication/auth/AuthContext'
import { FollowButton, FriendButton } from './ButtonsRelation'

export const InfoPlayerWithCircleImage = ({
  dataBio,
  currentRoleId,
  signupForm,
  feedPost,
}: {
  dataBio: IBiographyPlayer
  currentRoleId?: string
  signupForm?: boolean
  feedPost?: boolean
}) => {
  const [fakeRelation, setFakeRelation] = useState({
    followStatus: null,
    friendStatus: null,
    isConfirmBox: null,
    isFollowed: null,
    isPublic: null,
    fanCount: null,
  })

  const relations = useMemo(() => {
    return Object.assign(
      {},
      {
        followStatus:
          fakeRelation.followStatus !== null
            ? fakeRelation.followStatus
            : dataBio?.followStatus,
        friendStatus:
          fakeRelation.friendStatus !== null
            ? fakeRelation.friendStatus
            : dataBio?.friendStatus,
        isConfirmBox:
          fakeRelation.isConfirmBox !== null
            ? fakeRelation.isConfirmBox
            : dataBio?.isConfirmBox,
        isFollowed:
          fakeRelation.isFollowed !== null
            ? fakeRelation.isFollowed
            : dataBio?.isFollowed,
        isPublic:
          fakeRelation.isPublic !== null
            ? fakeRelation.isPublic
            : dataBio?.isPublic,
        fanCount:
          fakeRelation.fanCount !== null
            ? fakeRelation.fanCount
            : dataBio?.fanCount,
      }
    )
  }, [fakeRelation, dataBio])

  const [elmButtonFollow, setElmButtonFollow] = useState<string>('Follow')
  const [loading, setLoading] = useState<boolean>(false)
  const { authenticated } = useAuth() as {
    authenticated: boolean
  }

  const handleFollow = async () => {
    if (!dataBio.isFollowed) {
      try {
        const res = await axios.post(
          `${API_FRIENDS}/${dataBio.userId}/request-relationship?type=follows`
        )
        // console.log('res', res)
        if (res.status === 201) {
          // elmButtonFollow = 'Following'
        }
      } catch (error) {}
    } else {
      try {
        const res = await axios.delete(
          `${API_FRIENDS}/${dataBio.userId}/remove-relationship?type=follows`
        )
        if (res.status === 200) {
          // elmButtonFollow = 'Follow'
        }
      } catch (error) {}
    }
  }

  return (
    <>
      {signupForm && (
        <div>
          <p className="text-[24px] text-[#ffffff]">Sing up form - biography</p>
          <Comments
            listComment={[
              {
                img: '/avt-nick.svg',
                text: 'This is how your Biography and profile looks like now. The more updates and content you will add, the more attractive you will be',
              },
            ]}
            className="w-full mt-[48px]"
          />
        </div>
      )}
      <div className="text-center text-[24px] leading-[33px]">
        <span className="text-Green mr-[4px] "> {dataBio?.firstName} </span>
        <span className="text-white "> {dataBio?.lastName} </span>
      </div>
      <div className="text-Grey text-[14px] leading-[22px] text-center">
        #{dataBio?.username}
      </div>
      <div className="h-[24px] "></div>

      <div className="w-[316px] mx-auto flex justify-center gap-x-[24px] mb-[24px]">
        <div className=" flex flex-col justify-between">
          <div className="h-[45px] ">
            <div className="text-white text-[18px] leading-[24px] text-right whitespace-nowrap">
              {dataBio?.position}
            </div>
            <div className="text-Grey text-[12px] leading-[20px] font-bold text-right ">
              POSITION
            </div>
          </div>

          <img
            src={safeHttpImage(dataBio?.currentClubIconUrl)}
            className="w-[24px] h-[24px] ml-auto rounded-full"
            alt=""
          />
          <div className="h-[45px] ">
            <div className="text-white text-[18px] leading-[24px] text-right whitespace-nowrap ">
              <span className="inline-block mr-[2px] ">
                {dataBio?.estMarketValue}M
              </span>
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
        <div className="w-[194px] h-[194px]  mx-auto my-[5px] relative ">
          <GradientCircularProgress
            startColor="#4c3fe0"
            middleColor="#a35ef6"
            endColor="#8a56f0"
            size={194}
            progress={dataBio?.circleCompleted}
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
                  className="w-[12px] h-[12px]"
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
              numberOfStars={dataBio?.starRating}
              className={'gap-x-[2px] '}
            />
          </div>

          {!!dataBio?.faceImageUrl && (
            <>
              <div
                style={
                  {
                    // background: '#c4c4c4',
                  }
                }
                className="rounded-full w-[180px] h-[180px] absolute top-1/2 left-1/2 transform
              -translate-x-1/2 -translate-y-1/2  "
              ></div>
              <img
                src={dataBio?.faceImageUrl}
                className="rounded-full w-[180px] h-[180px] absolute top-1/2 left-1/2 transform
              -translate-x-1/2 -translate-y-1/2 object-cover "
                alt=""
              />
              <div
                style={{
                  background:
                    'linear-gradient(180deg, rgba(19, 19, 27, 0) 18.23%, #13141E 100%)',
                }}
                className="rounded-full w-[180px] h-[180px] absolute top-1/2 left-1/2 transform
              -translate-x-1/2 -translate-y-1/2  "
              ></div>
            </>
          )}
        </div>
        <div className=" flex flex-col justify-between">
          <div className="h-[45px] ">
            <div className="text-white text-[18px] leading-[24px] text-left h-[24px] ">
              {dataBio?.age}
            </div>
            <div className="text-Grey text-[12px] leading-[20px] font-bold text-left ">
              AGE
            </div>
          </div>

          <img
            src={safeHttpImage(dataBio?.countryFlagUrl)}
            className="w-[24px] h-[24px] mr-auto rounded-full"
            alt=""
          />
          <div className="h-[45px] ">
            <div className="text-white text-[18px] leading-[24px] text-left">
              {dataBio?.height}cm
            </div>
            <div className="text-Grey text-[12px] leading-[20px] font-bold text-left ">
              HEIGHT
            </div>
          </div>
        </div>
      </div>

      <div
        className={`mx-auto max-w-[466px] flex justify-between ${
          feedPost ? 'mb-[4px]' : 'mb-[24px]'
        } px-[24px]`}
      >
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
            <div className="text-[14px] leading-[22px] text-white ">
              {' '}
              {dataBio?.friendCount}{' '}
            </div>
            <div className="text-Grey text-[12px] leading-[20px] ">Friends</div>
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
              {relations?.fanCount}
            </div>
            <div className="text-Grey text-[12px] leading-[20px] ">Fans</div>
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
              {dataBio?.followCount}
            </div>
            <div className="text-Grey text-[12px] leading-[20px] ">Follows</div>
          </div>
        </div>
        {/*  */}
      </div>

      {!signupForm &&
        !feedPost &&
        dataBio?.userId !== currentRoleId &&
        authenticated && (
          <div className="max-w-[466px] mx-auto mb-[24px] grid grid-cols-2 gap-x-[26px] ">
            <FriendButton
              setFakeRelation={setFakeRelation}
              friendStatus={relations.friendStatus}
              userId={dataBio.userId}
            />

            <FollowButton
              setFakeRelation={setFakeRelation}
              followStatus={relations.followStatus}
              isFollowed={relations.isFollowed}
              userId={dataBio.userId}
              relations={relations}
            />
          </div>
        )}

      {(signupForm || feedPost) && dataBio?.summary && (
        <div
          className={`mx-auto max-w-[466px] text-white text-[14px] leading-[22px] ${
            feedPost ? 'ml-[24px]' : ''
          }`}
        >
          {dataBio?.summary}
        </div>
      )}
    </>
  )
}
