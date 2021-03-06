import { useRouter } from 'next/router'
import { Fragment, useCallback, useMemo, useState } from 'react'
import { Cookies } from 'react-cookie'
import toast from 'react-hot-toast'
import { useMutation, useQueryClient } from 'react-query'
import {
  BlockIcon,
  ChervonRightIcon,
  TrashCanIcon,
  UnblockIcon,
} from 'src/components/icons'
import { QUERIES_CONTACTS } from 'src/constants/query-keys/query-keys.constants'
import { GroupTabType } from 'src/constants/types/contacts.types'
import { MemberType } from 'src/constants/types/member.types'
import { useAuth } from 'src/modules/authentication/auth/AuthContext'
import { goToChatPage } from 'src/modules/chat/chatService'
import {
  blockTeamMember,
  deleteTeamMember,
  unblockTeamMember,
} from 'src/service/contacts/team.service'
import { getBioUrl } from 'src/utils/utils'
import Card from '../../components/card-template'
import DropdownButton from '../../components/card-template/DropdownButton'
import ConfirmModal from '../../components/modals/ModalDelete'

type MemberCardProps = {
  member: MemberType
  tab?: GroupTabType
  isBlocked?: boolean
  isBlockable?: boolean
}

interface GroupModalType {
  block: boolean
  delete: boolean
  unblock: boolean
}

export const MemberCard = ({
  tab,
  member,
  isBlocked,
  isBlockable,
}: MemberCardProps) => {
  const router = useRouter()
  const queryClient = useQueryClient()
  const { currentRoleId } = useAuth()
  const { teamId } = router.query

  const IS_PERSONAL = useMemo(() => {
    const cookies = new Cookies()
    const isKeyMember = cookies.get('roleid') === member.userId
    const isAdminPage = tab === 'ADMIN'
    if (isBlockable) return true
    return isKeyMember || isAdminPage
  }, [member.userId])

  const [groupModal, setGroupModal] = useState<GroupModalType>({
    block: false,
    delete: false,
    unblock: false,
  })

  const { mutate: mutateBlock, isLoading: isBlocking } = useMutation(
    blockTeamMember,
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries(
          QUERIES_CONTACTS.CONTACT_TEAM_MEMBER
        )
        await queryClient.invalidateQueries(
          QUERIES_CONTACTS.CONTACT_TEAM_BLOCKED
        )
        toast.success('Successfully!')
        setGroupModal((prev) => ({ ...prev, block: false }))
      },
      onError: () => {
        toast.error('Something went wrong')
      },
    }
  )

  const { mutate: mutateUnblock } = useMutation(unblockTeamMember, {
    onSuccess: async () => {
      await queryClient.invalidateQueries(QUERIES_CONTACTS.CONTACT_TEAM_BLOCKED)
      toast.success('Successfully!')
      setGroupModal((prev) => ({ ...prev, unblock: false }))
    },
    onError: () => {
      toast.error('Something went wrong')
    },
  })

  const { mutate: mutateDelete, isLoading: isDeleting } = useMutation(
    deleteTeamMember,
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries(
          QUERIES_CONTACTS.CONTACT_TEAM_MEMBER
        )
        toast.success('Successfully deleted!')
        setGroupModal((prev) => ({ ...prev, delete: false }))
      },
      onError: () => {
        toast.error('Something went wrong')
      },
    }
  )

  const onDelete = useCallback(() => {
    mutateDelete({ teamId, memberId: member.userId })
  }, [member.userId])

  const onBlock = useCallback(() => {
    mutateBlock({ data: { teamId, memberId: member.userId } })
  }, [member.userId])

  const onUnblock = useCallback(() => {
    mutateUnblock({ data: { teamId, memberIds: [member.userId] } })
  }, [member.userId])

  return (
    <Fragment>
      <ConfirmModal
        label="Delete user"
        content="Are you sure you want to delete this user?"
        actionLabel="Delete"
        isLoading={isDeleting}
        isOpen={groupModal.delete}
        onClose={(value: boolean) =>
          setGroupModal((prev) => ({ ...prev, delete: value }))
        }
        icon={<TrashCanIcon className="w-[60px] h-[60px]" />}
        onSubmit={() => onDelete()}
      />
      <ConfirmModal
        label="Block"
        content="Are you sure you want to block this user?"
        actionLabel="Block"
        isLoading={isBlocking}
        isOpen={groupModal.block}
        onClose={(value: boolean) =>
          setGroupModal((prev) => ({ ...prev, block: value }))
        }
        icon={<BlockIcon className="w-[60px] h-[60px]" />}
        onSubmit={() => onBlock()}
      />
      <ConfirmModal
        label="Unblock user"
        content="Are you sure you want to unblock this user?"
        actionLabel="Unblock"
        isLoading={isBlocking}
        isOpen={groupModal.unblock}
        onClose={(value: boolean) =>
          setGroupModal((prev) => ({ ...prev, unblock: value }))
        }
        icon={<UnblockIcon className="w-[60px] h-[60px]" />}
        onSubmit={() => onUnblock()}
      />
      <Card
        name={member.fullName}
        avatar={member.faceImage}
        users={[member.username]}
        roles={member.favoriteRoles}
        city={member.city}
        club={member.clubName}
        onClick={() =>
          router.push(
            getBioUrl(
              member.type,
              member.username,
              member.firstName,
              member.lastName
            )
          )
        }
        commonOptions={
          <div
            onClick={(e) => {
              e.stopPropagation()
            }}
            className="  flex gap-x-[16px]  "
          >
            {member.isRelationship && (
              <button
                className=" p-2"
                type="button"
                onClick={goToChatPage.bind(null, member, currentRoleId, false)}
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
          IS_PERSONAL && (
            <Fragment>
              <DropdownButton
                onClick={(e) => {
                  e.stopPropagation()
                  setGroupModal((prev) => ({ ...prev, delete: true }))
                }}
                label="Delete member"
                labelClass="text-[#D60C0C]"
                icon={<TrashCanIcon className="w-[20px] h-[20px]" />}
              />
              {isBlocked ? (
                <DropdownButton
                  onClick={(e) => {
                    e.stopPropagation()
                    setGroupModal((prev) => ({ ...prev, unblock: true }))
                  }}
                  label="Unblock"
                  labelClass="text-white"
                  icon={<UnblockIcon className="w-[20px] h-[20px]" />}
                />
              ) : (
                <DropdownButton
                  onClick={(e) => {
                    e.stopPropagation()
                    setGroupModal((prev) => ({ ...prev, block: true }))
                  }}
                  label="Block member"
                  labelClass="text-[#D60C0C]"
                  icon={<BlockIcon className="w-[20px] h-[20px]" />}
                />
              )}
            </Fragment>
          )
        }
      />
    </Fragment>
  )
}
