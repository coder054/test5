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
import {
  blockGroupMember,
  deleteGroupMember,
  unblockGroupMember,
} from 'src/service/contacts/group.service'
import Card from '../../../components/card-template'
import DropdownButton from '../../../components/card-template/DropdownButton'
import ConfirmModal from '../../../components/modals/ModalDelete'

type MemberCardProps = {
  tab: GroupTabType
  member: MemberType
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
  const { currentRoleName } = useAuth()
  const { groupId } = router.query

  const IS_PERSONAL = useMemo(() => {
    const cookies = new Cookies()
    if (cookies.get('roleid') === member.userId || tab === 'ADMIN') return true
    return false
  }, [member.userId])

  const [groupModal, setGroupModal] = useState<GroupModalType>({
    block: false,
    delete: false,
    unblock: false,
  })

  const { mutate: mutateBlock, isLoading: isBlocking } = useMutation(
    blockGroupMember,
    {
      onSuccess: () => {
        queryClient.invalidateQueries(QUERIES_CONTACTS.CONTACT_GROUP_MEMBER)
        queryClient.invalidateQueries(QUERIES_CONTACTS.CONTACT_GROUP_BLOCKED)
        toast.success('Successfully!')
        setGroupModal((prev) => ({ ...prev, block: false }))
      },
      onError: () => {
        toast.error('Something went wrong')
      },
    }
  )

  const { mutate: mutateUnblock } = useMutation(unblockGroupMember, {
    onSuccess: () => {
      queryClient.invalidateQueries(QUERIES_CONTACTS.CONTACT_GROUP_BLOCKED)
      queryClient.invalidateQueries(QUERIES_CONTACTS.CONTACT_GROUP_MEMBER)
      toast.success('Successfully!')
      setGroupModal((prev) => ({ ...prev, unblock: false }))
    },
    onError: () => {
      toast.error('Something went wrong')
    },
  })

  const { mutate: mutateDelete, isLoading: isDeleting } = useMutation(
    deleteGroupMember,
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries(
          QUERIES_CONTACTS.CONTACT_GROUP_MEMBER
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
    mutateDelete({ groupId: groupId, memberId: member.userId })
  }, [member.userId])

  const onBlock = useCallback(() => {
    mutateBlock({ data: { groupId: groupId, memberId: member.userId } })
  }, [member.userId])

  const onUnblock = useCallback(() => {
    mutateUnblock({ data: { groupId: groupId, memberIds: [member.userId] } })
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
        actionLabelClass="bg-white text-black"
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
        commonOptions={
          <button
            type="button"
            onClick={() =>
              router.push(
                `/${currentRoleName.toLowerCase()}/${member.username}/${
                  member.fullName
                }`
              )
            }
          >
            <ChervonRightIcon className="w-[25px] h-[25px] active:scale-125 duration-150" />
          </button>
        }
        dropdownOptions={
          !IS_PERSONAL && (
            <Fragment>
              <DropdownButton
                onClick={() =>
                  setGroupModal((prev) => ({ ...prev, delete: true }))
                }
                label="Delete member"
                labelClass="text-[#D60C0C]"
                icon={<TrashCanIcon className="w-[20px] h-[20px]" />}
              />
              {isBlocked ? (
                <DropdownButton
                  onClick={() =>
                    setGroupModal((prev) => ({ ...prev, unblock: true }))
                  }
                  label="Unblock"
                  labelClass="text-white"
                  icon={<UnblockIcon className="w-[20px] h-[20px]" />}
                />
              ) : (
                <DropdownButton
                  onClick={() =>
                    setGroupModal((prev) => ({ ...prev, block: true }))
                  }
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
