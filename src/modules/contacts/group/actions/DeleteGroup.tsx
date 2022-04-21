import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useMutation, useQueryClient } from 'react-query'
import { LeaveIcon, TrashCanIcon } from 'src/components/icons'
import { QUERIES_CONTACTS } from 'src/constants/query-keys/query-keys.constants'
import { deleteGroup, leaveGroup } from 'src/service/contacts/group.service'
import ConfirmModal from '../../components/modals/ModalDelete'

type DeleteGroupProps = {
  isClose: (value: string) => void
}

export default function DeleteGroup({ isClose }: DeleteGroupProps) {
  const router = useRouter()
  const queryClient = useQueryClient()
  const { groupId } = router.query
  const [isOpen, setIsOpen] = useState<boolean>(true)

  const { mutate: mutateDelete, isLoading: isDeleting } = useMutation(
    deleteGroup,
    {
      onSuccess: () => {
        queryClient.invalidateQueries(QUERIES_CONTACTS.CONTACT_GROUP)
        toast.success('Group successfully deleted')
        setTimeout(() => {
          router.push({ pathname: '/contacts', query: { t: 'groups' } })
        }, 700)
      },
      onError: () => {
        toast.error('Something went wrong')
      },
    }
  )

  const handleDelete = () => {
    mutateDelete({ groupId })
  }

  useEffect(() => {
    !isOpen && isClose('')
  }, [isOpen])

  return (
    <ConfirmModal
      label="Delete group"
      content="Are you sure you want to delete this group?"
      actionLabel="Delete"
      isOpen={isOpen}
      isLoading={isDeleting}
      onClose={setIsOpen}
      onSubmit={handleDelete}
      icon={<TrashCanIcon className="w-[60px] h-[60px]" />}
    />
  )
}
