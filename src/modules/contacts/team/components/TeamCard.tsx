import { isEmpty } from 'lodash'
import { useRouter } from 'next/router'
import { useMemo, useState } from 'react'
import toast from 'react-hot-toast'
import { useMutation, useQueryClient } from 'react-query'
import { ChervonRightIcon, TrashCanIcon } from 'src/components/icons'
import { QUERIES_CONTACTS } from 'src/constants/query-keys/query-keys.constants'
import { TeamsType } from 'src/constants/types/contacts.types'
import { useAuth } from 'src/modules/authentication/auth/AuthContext'
import {
  addTeamChatRoom,
  findRoomById,
  findRoomChatByMemberIds,
  getMemberIdsOfAChatRoom,
  getUrlChatFromChatRoomId,
  goToChatPage,
  updateChatRoomMemberIds,
} from 'src/modules/chat/chatService'
import { deleteTeam } from 'src/service/contacts/team.service'
import { axios } from 'src/utils/axios'
import { isEqualArraysNoOrder } from 'src/utils/utils'
import Card from '../../components/card-template'
import DropdownButton from '../../components/card-template/DropdownButton'
import ConfirmModal from '../../components/modals/ModalDelete'

type TeamsCardProps = {
  team?: TeamsType
}

export const TeamCard = ({ team }: TeamsCardProps) => {
  const { currentRoleId } = useAuth()
  const router = useRouter()
  const queryClient = useQueryClient()
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false)

  const HIGHEST_ROLE = useMemo(() => {
    return team.memberType === 'OWNER'
  }, [team.memberType])

  const handleDeleteTeam = () => {
    mutateDelete({ teamId: team.teamId })
  }

  const { mutate: mutateDelete, isLoading: isDeleting } = useMutation(
    deleteTeam,
    {
      onSuccess: () => {
        queryClient.invalidateQueries(QUERIES_CONTACTS.CONTACT_TEAM)
        toast.success('Team successfully deleted')
        setIsOpenModal(false)
      },
      onError: () => {
        toast.error('Something went wrong')
      },
    }
  )

  const showMessageIcon = useMemo(() => {
    const { userIds } = team

    if (isEmpty(userIds) || isEmpty(currentRoleId)) {
      return false
    }

    return userIds.some((id) => id === currentRoleId)
  }, [team.userIds, currentRoleId])

  return (
    <Card
      avatar={team?.clubUrl}
      name={`${team.clubName} - ${team.teamName}`}
      users={team.usernames}
      onClick={() => router.push(`/contacts/team/${team.teamId}`)}
      commonOptions={
        <div
          onClick={(e) => {
            e.stopPropagation()
          }}
          className="  flex gap-x-[16px]  "
        >
          {showMessageIcon && (
            <button
              className=" p-2"
              type="button"
              onClick={async () => {
                const roomId = team.teamId
                const roomExists = await findRoomById(team.teamId)
                if (!roomExists) {
                  const [, error] = await addTeamChatRoom(
                    team.userIds,
                    roomId,
                    `${team.clubName} - ${team.teamName}`,
                    team.teamImage,
                    currentRoleId
                  )
                  if (error) {
                    return
                  }
                } else {
                  let memberIds = await getMemberIdsOfAChatRoom(team.teamId)
                  if (!isEqualArraysNoOrder(memberIds, team.userIds)) {
                    updateChatRoomMemberIds(team.teamId, team.userIds)
                  }
                }
                if (typeof window !== 'undefined' && !!roomId) {
                  window.open(getUrlChatFromChatRoomId(roomId), '_ blank')
                }
              }}
            >
              <svg
                className="cursor-pointer  "
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M20 2H4C2.9 2 2 2.9 2 4V22L6 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2Z"
                  fill="white"
                />
              </svg>
            </button>
          )}
          <button type="button" className=" p-2">
            <ChervonRightIcon className="w-[25px] h-[25px] active:scale-125 duration-150" />
          </button>
        </div>
      }
      dropdownOptions={
        HIGHEST_ROLE && (
          <>
            <DropdownButton
              onClick={(e) => {
                e.stopPropagation()
                setIsOpenModal(true)
              }}
              label="Delete team"
              labelClass="text-[#D60C0C]"
              icon={<TrashCanIcon className="w-[20px] h-[20px]" />}
            />
            <ConfirmModal
              label="Delete team"
              content="Are you sure you want to delete this team?"
              actionLabel="Delete"
              isOpen={isOpenModal}
              onClose={setIsOpenModal}
              isLoading={isDeleting}
              onSubmit={handleDeleteTeam}
              icon={<TrashCanIcon className="w-[60px] h-[60px]" />}
            />
          </>
        )
      }
    />
  )
}
