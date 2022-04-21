import { useRouter } from 'next/router'
import {
  ChervonRightIcon,
  TrashCanIcon,
  UnblockIcon,
} from 'src/components/icons'
import { MemberType } from 'src/constants/types/member.types'
import { useAuth } from 'src/modules/authentication/auth/AuthContext'
import Card from '../card-template'
import { Fragment, useCallback, useState } from 'react'
import DropdownButton from '../card-template/DropdownButton'
import ConfirmModal from '../modals/ModalDelete'
import { useMutation, useQueryClient } from 'react-query'
import toast from 'react-hot-toast'
import { QUERIES_CONTACTS } from 'src/constants/query-keys/query-keys.constants'
import { unblockTeamMember } from 'src/service/contacts/team.service'
import {
  removeRelationship,
  unblockFriend,
} from 'src/service/contacts/friend.service'

type FanCardProps = {
  member: MemberType
}

interface GroupModalType {
  delete: boolean
  unblock: boolean
}

export const BlockedMemberCard = ({ member }: FanCardProps) => {
  const router = useRouter()
  const queryClient = useQueryClient()
  const { currentRoleName } = useAuth()

  const [groupModal, setGroupModal] = useState<GroupModalType>({
    delete: false,
    unblock: false,
  })

  const { mutate: mutateUnblock, isLoading: isUnblocking } = useMutation(
    unblockFriend,
    {
      onSuccess: () => {
        queryClient.invalidateQueries(QUERIES_CONTACTS.CONTACT_BLOCKED)
        toast.success('Successfully!')
        setGroupModal((prev) => ({ ...prev, unblock: false }))
      },
      onError: () => {
        toast.error('Something went wrong')
      },
    }
  )

  const { mutate: mutateRemove, isLoading: isRemoving } = useMutation(
    removeRelationship,
    {
      onSuccess: () => {
        queryClient.invalidateQueries(QUERIES_CONTACTS.CONTACT_BLOCKED)
        toast.success('Successfully!')
        setGroupModal((prev) => ({ ...prev, delete: false }))
      },
      onError: () => {
        toast.error('Something went wrong')
      },
    }
  )

  const onRemove = useCallback(() => {
    mutateRemove({ userId: member.userId, type: 'friends' })
  }, [member.userId])

  const onUnblock = useCallback(() => {
    mutateUnblock({ userIds: [member.userId] })
  }, [member.userId])

  return (
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
        <Fragment>
          <ConfirmModal
            label="Delete user"
            content="Are you sure you want to delete this user?"
            actionLabel="Delete"
            isLoading={isRemoving}
            isOpen={groupModal.delete}
            onClose={(value: boolean) =>
              setGroupModal((prev) => ({ ...prev, delete: value }))
            }
            icon={<TrashCanIcon className="w-[60px] h-[60px]" />}
            onSubmit={() => onRemove()}
          />
          <ConfirmModal
            label="Unblock user"
            content="Are you sure you want to unblock this user?"
            actionLabel="Unblock"
            isLoading={isUnblocking}
            isOpen={groupModal.unblock}
            onClose={(value: boolean) =>
              setGroupModal((prev) => ({ ...prev, unblock: value }))
            }
            icon={<UnblockIcon className="w-[60px] h-[60px]" />}
            onSubmit={() => onUnblock()}
          />
          <DropdownButton
            onClick={() => setGroupModal((prev) => ({ ...prev, delete: true }))}
            label="Unfriend"
            labelClass="text-[#D60C0C]"
            icon={<TrashCanIcon className="w-[20px] h-[20px]" />}
          />
          <DropdownButton
            onClick={() =>
              setGroupModal((prev) => ({ ...prev, unblock: true }))
            }
            label="Unblock"
            labelClass="text-white"
            icon={<UnblockIcon className="w-[20px] h-[20px]" />}
          />
        </Fragment>
      }
    />
  )
}
