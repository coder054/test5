import { useRouter } from 'next/router'
import React, { useCallback, useState } from 'react'
import toast from 'react-hot-toast'
import { useMutation, useQueryClient } from 'react-query'
import { Button } from 'src/components/Button'
import { XIcon } from 'src/components/icons'
import { ModalMui } from 'src/components/ModalMui'
import { QUERIES_CONTACTS } from 'src/constants/query-keys/query-keys.constants'
import { FetchingLimitMembers } from 'src/modules/contacts/components/fetchs/FetchingLimitMembers'
import { editTeamMember } from 'src/service/contacts/team.service'

interface EditAdminModalProps {
  isClose: (value: string) => void
}

export default function EditAdmins({ isClose }: EditAdminModalProps) {
  const router = useRouter()
  const { teamId } = router.query
  const queryClient = useQueryClient()
  const [members, setMembers] = useState<string[]>([])

  const { mutate: mutateEdit, isLoading: isEditing } = useMutation(
    editTeamMember,
    {
      onSuccess: () => {
        queryClient.invalidateQueries(QUERIES_CONTACTS.CONTACT_TEAM_ADMIN)
        toast.success('Admins successfully added')
        isClose('')
      },
      onError: () => {
        toast.error('Something went wrong')
      },
    }
  )

  const onSubmit = useCallback(() => {
    mutateEdit({ data: { memberIds: members, memberType: 'ADMIN' }, teamId })
  }, [JSON.stringify(members)])

  return (
    <ModalMui
      sx={{ width: 700, top: '50%' }}
      isOpen={true}
      onClose={() => isClose('')}
    >
      <div className="px-2 space-y-6 pt-9 relative">
        <button
          type="button"
          onClick={() => isClose('')}
          className="absolute right-0 top-0"
        >
          <XIcon />
        </button>
        <p className="flex justify-center text-[24px] font-medium pb-6">
          Edit Members
        </p>
        <FetchingLimitMembers
          tab="ADMIN"
          endpoint={`teams/${teamId}/search-team-member`}
          onChange={setMembers}
        />
        <Button
          type="submit"
          label="Save"
          onClick={onSubmit}
          isLoading={isEditing}
          className="bg-[#4654EA] px-24 py-2.5 rounded-lg"
        />
      </div>
    </ModalMui>
  )
}
