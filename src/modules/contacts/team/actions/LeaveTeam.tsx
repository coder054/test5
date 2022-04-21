import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useMutation, useQueryClient } from 'react-query'
import { LeaveIcon } from 'src/components/icons'
import { QUERIES_CONTACTS } from 'src/constants/query-keys/query-keys.constants'
import ConfirmModal from '../../components/modals/ModalDelete'
import { leaveTeam } from 'src/service/contacts/team.service'

type LeaveTeamProps = {
  isClose: (value: string) => void
}

export default function LeaveTeam({ isClose }: LeaveTeamProps) {
  const router = useRouter()
  const queryClient = useQueryClient()
  const { teamId } = router.query
  const [isOpen, setIsOpen] = useState<boolean>(true)

  const { mutate: mutateLeave, isLoading: isLeaving } = useMutation(leaveTeam, {
    onSuccess: () => {
      queryClient.invalidateQueries(QUERIES_CONTACTS.CONTACT_GROUP)
      toast.success('Leave team successfully')
      isClose('')
      setTimeout(() => {
        router.push({ pathname: '/contacts', query: { t: 'teams' } })
      }, 700)
    },
    onError: () => {
      toast.error('Something went wrong')
    },
  })

  const handleLeave = () => {
    mutateLeave({ teamId })
  }

  useEffect(() => {
    !isOpen && isClose('')
  }, [isOpen])

  return (
    <ConfirmModal
      label="Leave team"
      content="Are you sure you want to leave this team?"
      actionLabel="Leave"
      isOpen={isOpen}
      isLoading={isLeaving}
      onClose={setIsOpen}
      onSubmit={handleLeave}
      icon={<LeaveIcon className="w-[60px] h-[60px]" />}
    />
  )
}
