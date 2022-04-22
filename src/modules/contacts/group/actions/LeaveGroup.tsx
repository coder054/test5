import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useMutation, useQueryClient } from 'react-query'
import { LeaveIcon } from 'src/components/icons'
import { QUERIES_CONTACTS } from 'src/constants/query-keys/query-keys.constants'
import { leaveGroup } from 'src/service/contacts/group.service'
import ConfirmModal from '../../components/modals/ModalDelete'

type LeaveGroupProps = {
  isClose: (value: string) => void
}

export default function LeaveGroup({ isClose }: LeaveGroupProps) {
  const router = useRouter()
  const queryClient = useQueryClient()
  const { groupId } = router.query
  const [isOpen, setIsOpen] = useState<boolean>(true)

  const { mutate: mutateLeave, isLoading: isLeaving } = useMutation(
    leaveGroup,
    {
      onSuccess: () => {
        queryClient.invalidateQueries(QUERIES_CONTACTS.CONTACT_GROUP)
        toast.success('Leave group successfully')
        isClose('')
        setTimeout(() => {
          router.push({ pathname: '/contacts', query: { t: 'groups' } })
        }, 700)
      },
      onError: () => {
        toast.error('Something went wrong')
      },
    }
  )

  const handleLeave = () => {
    mutateLeave({ groupId })
  }

  useEffect(() => {
    !isOpen && isClose('')
  }, [isOpen])

  return (
    <ConfirmModal
      label="Leave group"
      content="Are you sure you want to leave this group?"
      actionLabel="Leave"
      isOpen={isOpen}
      isLoading={isLeaving}
      onClose={setIsOpen}
      onSubmit={handleLeave}
      icon={<LeaveIcon className="w-[60px] h-[60px]" />}
    />
  )
}
