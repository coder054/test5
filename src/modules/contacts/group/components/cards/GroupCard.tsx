import { chain, isEmpty } from 'lodash'
import { useRouter } from 'next/router'
import { Fragment, useMemo, useState } from 'react'
import toast from 'react-hot-toast'
import { useMutation, useQueryClient } from 'react-query'
import { ChervonRightIcon, TrashCanIcon } from 'src/components/icons'
import { QUERIES_CONTACTS } from 'src/constants/query-keys/query-keys.constants'
import { GroupType } from 'src/constants/types/contacts.types'
import { useAuth } from 'src/modules/authentication/auth/AuthContext'
import {
  addTeamChatRoom,
  createGroupChatRoom,
  ERoomType,
  findRoomById,
  getMemberIdsOfAChatRoom,
  getUrlChatFromChatRoomId,
  updateChatRoomMemberIds,
} from 'src/modules/chat/chatService'
import { deleteGroup } from 'src/service/contacts/group.service'
import { isEqualArraysNoOrder } from 'src/utils/utils'
import Card from '../../../components/card-template'
import DropdownButton from '../../../components/card-template/DropdownButton'
import ConfirmModal from '../../../components/modals/ModalDelete'

interface GroupCardProps {
  group?: GroupType
}

export const GroupCard = ({ group }: GroupCardProps) => {
  const router = useRouter()
  const { currentRoleId } = useAuth()
  const queryClient = useQueryClient()
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false)

  const HIGHEST_ROLE = useMemo(() => {
    return group.memberType === 'OWNER'
  }, [group.memberType])

  const handleDeleteGroup = () => {
    mutateDelete({ groupId: group.groupId })
  }

  const { mutate: mutateDelete, isLoading: isDeleting } = useMutation(
    deleteGroup,
    {
      onSuccess: () => {
        queryClient.invalidateQueries(QUERIES_CONTACTS.CONTACT_GROUP)
        toast.success('Group successfully deleted')
        setIsOpenModal(false)
      },
      onError: () => {
        toast.error('Something went wrong')
      },
    }
  )

  const showMessageIcon = useMemo(() => {
    const { userIds } = group
    if (isEmpty(userIds) || isEmpty(currentRoleId)) {
      return false
    }
    return userIds.some((id) => id === currentRoleId)
  }, [group.userIds, currentRoleId])

  return (
    <Fragment>
      <Card
        name={group.name}
        users={group.usernames}
        avatar={group.groupImage}
        onClick={() => router.push(`/contacts/group/${group.groupId}`)}
        commonOptions={
          <div
            onClick={(e) => {
              e.stopPropagation()
            }}
            className="flex gap-x-[16px]"
          >
            {showMessageIcon && (
              <button
                className=" p-2"
                type="button"
                onClick={async () => {
                  const roomId = group.groupId
                  const roomExists = await findRoomById(group.groupId)
                  if (!roomExists) {
                    const [, error] = await createGroupChatRoom(
                      group.groupId,
                      group.name,
                      false,
                      group.userIds,
                      group.groupImage || '',
                      ERoomType.GROUP
                    )
                    if (error) {
                      return
                    }
                  } else {
                    let memberIds = await getMemberIdsOfAChatRoom(group.groupId)
                    if (!isEqualArraysNoOrder(memberIds, group.userIds)) {
                      updateChatRoomMemberIds(group.groupId, group.userIds)
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
            <button type="button">
              <ChervonRightIcon className="w-[25px] h-[25px] active:scale-125 duration-150" />
            </button>
          </div>
        }
        dropdownOptions={
          HIGHEST_ROLE && (
            <DropdownButton
              onClick={(e) => {
                setIsOpenModal(true)
                e.stopPropagation()
              }}
              label="Delete group"
              labelClass="text-[#D60C0C]"
              icon={<TrashCanIcon className="w-[20px] h-[20px]" />}
            />
          )
        }
      />
      <ConfirmModal
        label="Delete group"
        content="Are you sure you want to delete this group?"
        actionLabel="Delete"
        isOpen={isOpenModal}
        isLoading={isDeleting}
        onClose={setIsOpenModal}
        onSubmit={handleDeleteGroup}
        icon={<TrashCanIcon className="w-[60px] h-[60px]" />}
      />
    </Fragment>
  )
}
