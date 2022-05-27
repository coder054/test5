import { IconButton, ListItem, Tooltip } from '@mui/material'
import clsx from 'clsx'
import { format } from 'date-fns'
import dayjs from 'dayjs'
import { useAtom } from 'jotai'
import { get, isEmpty } from 'lodash'
import Link from 'next/link'
import queryString from 'query-string'
import { useMemo } from 'react'
import { formValuesDevelopmentNodeAtom } from 'src/atoms/developmentNoteAtom'
import { openModalDiaryUpdateAtom } from 'src/atoms/diaryAtoms'
import {
  dataModalCoachCreateDiaryTrainingAtom,
  dataModalResponseAskJoinGroupAtom,
  dataModalResponseAskJoinTeamAtom,
  dataModalResponseCoachReviewAtom,
  dataModalResponseDeleteFromTeamAtom,
  dataModalResponseGroupAtom,
  dataModalResponseMatchAtom,
  dataModalResponseTeamAtom,
  dataModalResponseTeamTrainingAtom,
} from 'src/atoms/notiAtoms'
import { notiToast } from 'src/components/common/Toast'
import {
  DevelopmentNoteType,
  IDevelopmentNoteFilterAPI,
  NotificationType,
} from 'src/constants/types'
import { XIcon } from 'src/icons/x'
import { getUrlChatFromChatRoomId } from 'src/modules/chat/chatService'
import { IDevelopmentFormValues } from 'src/modules/dashboard/development-dashboard/component/modal/note-modal'
import { INoti } from 'src/types/notification'
import { axios } from 'src/utils/axios'
import { getErrorMessage, getStr } from 'src/utils/utils'
import { wait } from 'src/utils/wait'

export const ItemNotification = ({
  setDataDevelopmentNote,
  setIsOpenModalDevelopmentNote,
  notification,
  handleClickOne,
  handleRemoveOne,
  onClose,
}: {
  setDataDevelopmentNote: (dataDevelopmentNote: DevelopmentNoteType) => void
  setIsOpenModalDevelopmentNote: Function
  notification: INoti
  handleClickOne: Function
  onClose: Function
  handleRemoveOne: Function
}) => {
  const [, setOpenModalDiaryUpdate] = useAtom(openModalDiaryUpdateAtom)
  const [, setFormValues]: [IDevelopmentFormValues, Function] = useAtom(
    formValuesDevelopmentNodeAtom
  )

  const [, setDataModalResponseGroup] = useAtom(dataModalResponseGroupAtom)
  const [, setDataModalResponseTeam] = useAtom(dataModalResponseTeamAtom)
  const [, setDataModalResponseDeleteFromTeam] = useAtom(
    dataModalResponseDeleteFromTeamAtom
  )

  const [, setDataModalResponseAskJoinGroup] = useAtom(
    dataModalResponseAskJoinGroupAtom
  )
  const [, setDataModalResponseAskJoinTeam] = useAtom(
    dataModalResponseAskJoinTeamAtom
  )
  const [, setDataModalResponseCoachReview] = useAtom(
    dataModalResponseCoachReviewAtom
  )

  const [, setDataModalResponseTeamTraining] = useAtom(
    dataModalResponseTeamTrainingAtom
  )

  const [, setDataModalCoachCreateDiaryTraining] = useAtom(
    dataModalCoachCreateDiaryTrainingAtom
  )
  const [, setDataModalResponseMatch]: any = useAtom(dataModalResponseMatchAtom)

  // here render icon noti
  const renderIcon = () => {
    switch (notification.notificationType) {
      case NotificationType.LIKE_POST:
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
          </svg>
        )

      case NotificationType.SEND_MESSAGE:
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
            />
          </svg>
        )
        break

      case NotificationType.ACCEPT_JOIN_TEAM:
      case NotificationType.LEAVE_TEAM:
      case NotificationType.FOLLOW:
      case NotificationType.FOLLOW_REQUEST:
      case NotificationType.REJECT_FOLLOW_REQUEST:
      case NotificationType.ACCEPTED_FOLLOW_REQUEST:
      case NotificationType.REJECT_FRIEND_REQUEST:
      case NotificationType.ACCEPTED_FRIEND_REQUEST:
      case NotificationType.FRIEND_REQUEST:
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5  "
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
              clipRule="evenodd"
            />
          </svg>
        )
        break
      case NotificationType.REMIND_DIARY_UPDATE_LOCAL:
      case NotificationType.REMIND_ON_DIARY_UPDATE:
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
            />
          </svg>
        )
        break

      case NotificationType.ASK_JOIN_TEAM:
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
          </svg>
        )
        break

      default:
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        )
        break
    }
  }

  // here get link for noti
  const link = useMemo(() => {
    switch (notification.notificationType) {
      case NotificationType.SEND_MESSAGE:
        //@ts-ignore: Unreachable code error
        return getUrlChatFromChatRoomId(notification.chatRoomId)
        break
      case NotificationType.ACCEPT_JOIN_TEAM:
      case NotificationType.LEAVE_TEAM:
      case NotificationType.FOLLOW:
      case NotificationType.FOLLOW_REQUEST:
      case NotificationType.REJECT_FOLLOW_REQUEST:
      case NotificationType.ACCEPTED_FOLLOW_REQUEST:
      case NotificationType.REJECT_FRIEND_REQUEST:
      case NotificationType.ACCEPTED_FRIEND_REQUEST:
      case NotificationType.FRIEND_REQUEST:
        return `/${notification.userType === 'PLAYER' ? 'player' : 'coach'}/${
          notification.username
        }/zporter`
        break
      case NotificationType.REMIND_DIARY_UPDATE_LOCAL:
      case NotificationType.REMIND_ON_DIARY_UPDATE:
        return `#`
        break

      case NotificationType.UPGRADE_TEAM_MEMBER_TYPE:
        return `/contacts/team/${notification.teamId}`
        break

      case NotificationType.UPGRADE_GROUP_MEMBER_TYPE:
        return `/contacts/group/${notification.groupId}`
        break

      case NotificationType.ASK_JOIN_TEAM:
        return `#`
        break

      case NotificationType.COMMENT_POST:
      case NotificationType.LIKE_POST:
        return `/posts/${notification.postId}/${notification.typeOfPost}`
        break

      default:
        return '#'
        break
    }
  }, [])

  return (
    <ListItem
      divider
      key={notification.notificationId}
      sx={{
        alignItems: 'flex-start',
        '&:hover': {
          backgroundColor: 'action.hover',
        },
        '& .MuiListItemSecondaryAction-root': {
          top: '24%',
        },
      }}
      secondaryAction={
        <Tooltip title="Remove">
          <IconButton
            edge="end"
            onClick={() => handleRemoveOne(notification.notificationId)}
            size="small"
          >
            <XIcon sx={{ fontSize: 14 }} />
          </IconButton>
        </Tooltip>
      }
    >
      <div className="w-full ">
        {/* // here handleClickOnNotiItem */}

        <Link href={link}>
          <a
            onClick={async () => {
              if (notification.notificationType === 'REMIND_ON_DIARY_UPDATE') {
                setOpenModalDiaryUpdate(true)
              } else if (
                notification.notificationType ===
                NotificationType.INVITE_MEMBER_GROUP
              ) {
                setDataModalResponseGroup({
                  //@ts-ignore: Unreachable code error
                  idGroup: notification.groupId,
                  img: notification.largeIcon,
                  body: notification.body,
                  title: notification.title,
                })
              } else if (
                notification.notificationType ===
                NotificationType.INVITE_MEMBER_TEAM
              ) {
                setDataModalResponseTeam({
                  //@ts-ignore: Unreachable code error
                  idTeam: notification.teamId,
                  img: notification.largeIcon,
                  body: notification.body,
                  title: notification.title,
                })
              } else if (
                notification.notificationType ===
                NotificationType.DELETE_MEMBER_TEAM
              ) {
                setDataModalResponseDeleteFromTeam({
                  //@ts-ignore: Unreachable code error
                  teamId: notification.teamId,
                  img: notification.largeIcon,
                  body: notification.body,
                  title: notification.title,
                  confirmType: getStr(notification, 'nextNotificationType'),
                  memberConfirm: getStr(notification, 'memberConfirm'),

                  memberId:
                    getStr(notification, 'memberConfirm') === 'ADMIN'
                      ? notification.senderId
                      : null,
                  oldMemberType: getStr(notification, 'oldMemberType'),
                })
              } else if (
                notification.notificationType ===
                NotificationType.MEMBER_CONFIRM_DELETE_MEMBER_TEAM
              ) {
                setDataModalResponseDeleteFromTeam({
                  //@ts-ignore: Unreachable code error
                  teamId: notification.teamId,
                  img: notification.largeIcon,
                  body: notification.body,
                  title: notification.title,
                  confirmType: getStr(notification, 'nextNotificationType'),
                  memberConfirm: getStr(notification, 'memberConfirm'),

                  memberId:
                    getStr(notification, 'memberConfirm') === 'ADMIN'
                      ? notification.senderId
                      : null,
                  oldMemberType: getStr(notification, 'oldMemberType'),
                })
              } else if (
                notification.notificationType ===
                NotificationType.ASK_JOIN_GROUP
              ) {
                setDataModalResponseAskJoinGroup({
                  //@ts-ignore: Unreachable code error
                  teamId: notification.teamId,
                  img: notification.largeIcon,
                  body: notification.body,
                  title: notification.title,
                  groupId: notification.groupId,
                  senderId: notification.senderId,
                })
              } else if (
                notification.notificationType === NotificationType.ASK_JOIN_TEAM
              ) {
                setDataModalResponseAskJoinTeam({
                  //@ts-ignore: Unreachable code error
                  teamId: notification.teamId,
                  img: notification.largeIcon,
                  body: notification.body,
                  title: notification.title,
                  groupId: notification.groupId,
                  senderId: notification.senderId,
                })
              } else if (
                notification.notificationType === NotificationType.TEAM_TRAINING
              ) {
                setDataModalResponseTeamTraining({
                  //@ts-ignore: Unreachable code error
                  teamId: notification.teamId,
                  img: notification.largeIcon,
                  body: notification.body,
                  title: notification.title,
                  groupId: notification.groupId,
                  senderId: notification.senderId,
                  playerDiaryData: notification.playerDiaryData,
                })
              } else if (
                notification.notificationType === NotificationType.MATCH
              ) {
                setDataModalResponseMatch({
                  //@ts-ignore: Unreachable code error
                  teamId: notification.teamId,
                  img: notification.largeIcon,
                  body: notification.body,
                  title: notification.title,
                  groupId: notification.groupId,
                  senderId: notification.senderId,
                  playerDiaryData: notification.playerDiaryData,
                })
              } else if (
                notification.notificationType ===
                NotificationType.COACH_CREATE_DIARY_TRAINING
              ) {
                setDataModalCoachCreateDiaryTraining({
                  //@ts-ignore: Unreachable code error
                  teamId: notification.teamId,
                  img: notification.largeIcon,
                  body: notification.body,
                  title: notification.title,
                  groupId: notification.groupId,
                  senderId: notification.senderId,
                  playerDiaryData: notification.playerDiaryData,
                  diaryId: notification.diaryId,
                })
              } else if (
                notification.notificationType ===
                NotificationType.COACH_CREATE_DIARY_MATCH
              ) {
                setDataModalResponseCoachReview({
                  //@ts-ignore: Unreachable code error
                  teamId: notification.teamId,
                  img: notification.largeIcon,
                  body: notification.body,
                  title: notification.title,
                  groupId: notification.groupId,
                  senderId: notification.senderId,
                  playerDiaryData: notification.coachDiaryData,
                })
              } else if (
                notification.notificationType ===
                NotificationType.COACH_COMMENT_DEVELOPMENT_NOTE
              ) {
                const { developmentNoteData: dev } = notification

                if (isEmpty(dev)) {
                  return
                }
                setIsOpenModalDevelopmentNote(true)
                await wait(100)
                setDataDevelopmentNote(dev)
              } else if (
                notification.notificationType ===
                NotificationType.ASK_FOR_REVIEW_DEVELOPMENT_TALK
              ) {
                try {
                  const params = {
                    playerId: notification.senderId,
                    playerNotedAt: notification.playerNotedAt,
                  }

                  const { data }: { data: IDevelopmentNoteFilterAPI } =
                    await axios.get(
                      `https://dev.api.zporter.co/development-talk/coach/filter-development-notes?${queryString.stringify(
                        params
                      )}`
                    )
                  setDataDevelopmentNote(data)
                  await wait(100)
                  setIsOpenModalDevelopmentNote(true)
                } catch (error) {
                  notiToast({
                    message: getErrorMessage(error),
                    type: 'error',
                  })
                }

                let aa = notification
                const { developmentNoteData: dev } = notification
                if (isEmpty(dev)) {
                  return
                }

                setIsOpenModalDevelopmentNote(true)
                await wait(100)
                let developmentData: IDevelopmentFormValues = {
                  strengthPlayer: dev.strength.playerContent,
                  strengthCoach: dev.strength.coachComment,
                  weaknessesPlayer: dev.weaknesses.playerContent,
                  weaknessesCoach: dev.weaknesses.coachComment,
                  bestDevelopSkillsPlayer: dev.bestDevelopSkills.playerContent,
                  bestDevelopSkillsCoach: dev.bestDevelopSkills.coachComment,
                  skillsNeededToDevelopPlayer:
                    dev.skillsNeededToDevelop.playerContent,
                  skillsNeededToDevelopCoach:
                    dev.skillsNeededToDevelop.coachComment,
                  bestWayToDevelopPlayer: dev.bestWayToDevelop.playerContent,
                  bestWayToDevelopCoach: dev.bestWayToDevelop.coachComment,
                  shortTermGoalPlayer: dev.shortTermGoal.playerContent,
                  shortTermGoalCoach: dev.shortTermGoal.coachComment,
                  longTermGoalPlayer: dev.longTermGoal.playerContent,
                  longTermGoalCoach: dev.longTermGoal.coachComment,
                  otherCommentsPlayer: dev.otherComments.playerContent,
                  otherCommentsCoach: dev.otherComments.coachComment,
                  date: dayjs(dev.updatedAt).format('YYYY/MM/DD'),
                  progress: dev.playerDevelopmentProgress,
                  contractedClub: {
                    arena: '',
                    city: '',
                    clubId: '',
                    clubName: '',
                    country: '',
                    logoUrl: '',
                    websiteUrl: null,
                  },
                  currentTeams: '',
                }
                setFormValues(developmentData)
              }

              if (
                notification.notificationType !== NotificationType.SEND_MESSAGE
              ) {
                await handleClickOne(notification.notificationId)
              }
              onClose()
            }}
            className="text-white hover:text-white inline-block font-Inter text-[14px "
          >
            <div
              className={clsx(
                ` flex w-full `,
                notification.notificationStatus === true
                  ? ' text-Grey opacity-88 '
                  : ' text-white '
              )}
            >
              <div className="grow-0 mr-[12px] h-[56px] relative ">
                <img
                  src={notification.largeIcon}
                  className="rounded-full w-[56px] h-[56px] object-cover block "
                  alt=""
                />
                <div className="w-[28px] h-[28px] object-cover rounded-full absolute right-[-6px] bottom-[-6px] flex justify-center items-center bg-[#006699] ">
                  {renderIcon()}
                </div>
              </div>

              <div
                className={clsx(
                  ` grow-0 w-[235px]  `,
                  notification.notificationStatus === true
                    ? ' text-Grey '
                    : ' text-white '
                )}
              >
                <div className="font-Inter text-[14px] ">
                  {notification.title}
                </div>
                <div className="font-Inter text-[14px] ">
                  {notification.body}
                </div>

                {(getStr(notification, 'updatedAt') ||
                  getStr(notification, 'createdAt')) && (
                  <div className="font-medium text-[12px] opacity-90 text-[#1876f2]">
                    {format(
                      Number(
                        get(notification, 'updatedAt') ||
                          get(notification, 'createdAt')
                      ),
                      'MMM dd, h:mm a'
                    )}
                  </div>
                )}
              </div>
            </div>
          </a>
        </Link>
      </div>
    </ListItem>
  )
}
