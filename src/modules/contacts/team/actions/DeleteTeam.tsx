import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useMutation, useQueryClient } from 'react-query'
import { TrashCanIcon } from 'src/components/icons'
import { QUERIES_CONTACTS } from 'src/constants/query-keys/query-keys.constants'
import { deleteTeam } from 'src/service/contacts/team.service'
import ConfirmModal from '../../components/modals/ModalDelete'

type DeleteTeamProps = {
  isClose: (value: string) => void
}

export default function DeleteTeam({ isClose }: DeleteTeamProps) {
  const router = useRouter()
  const queryClient = useQueryClient()
  const { teamId } = router.query
  const [isOpen, setIsOpen] = useState<boolean>(true)

  const { mutate: mutateDelete, isLoading: isDeleting } = useMutation(
    deleteTeam,
    {
      onSuccess: () => {
        queryClient.invalidateQueries(QUERIES_CONTACTS.CONTACT_GROUP)
        toast.success('Group successfully deleted')
        setTimeout(() => {
          router.push({ pathname: '/contacts', query: { t: 'teams' } })
        }, 700)
      },
      onError: () => {
        toast.error('Something went wrong')
      },
    }
  )

  const handleDelete = () => {
    mutateDelete({ teamId })
  }

  useEffect(() => {
    !isOpen && isClose('')
  }, [isOpen])

  return (
    <ConfirmModal
      label="Delete team"
      content="Are you sure you want to delete this team?"
      actionLabel="Delete"
      isOpen={isOpen}
      isLoading={isDeleting}
      onClose={setIsOpen}
      onSubmit={handleDelete}
      icon={<TrashCanIcon className="w-[60px] h-[60px]" />}
    />
  )
}
