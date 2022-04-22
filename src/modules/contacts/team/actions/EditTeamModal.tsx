import React, { ChangeEvent, useCallback, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useMutation, useQueryClient } from 'react-query'
import { MyInput } from 'src/components'
import { Button } from 'src/components/Button'
import { CustomUploadImage } from 'src/components/custom-upload-image'
import { XIcon } from 'src/components/icons'
import { ModalMui } from 'src/components/ModalMui'
import { MySwitchButton } from 'src/components/MySwitchButton'
import { QUERIES_CONTACTS } from 'src/constants/query-keys/query-keys.constants'
import { createGroup, editGroup } from 'src/service/contacts/group.service'
import { FetchingAllMembers } from '../../components/fetchs/FetchingAllMembers'
import { GroupType } from 'src/constants/types/contacts.types'
import { FetchingLimitMembers } from 'src/modules/contacts/components/fetchs/FetchingLimitMembers'
import { useRouter } from 'next/router'
import { TeamType } from 'src/constants/types/settingsType.type'
import { editTeam } from 'src/service/contacts/team.service'

type FormValuesType = {
  teamName: string
  teamImage: string
  memberIds: string[]
  isPrivate: boolean
}

interface EditTeamProps {
  isClose: (value: string) => void
  initialValue: TeamType
}

export default function EditTeamModal({
  isClose,
  initialValue,
}: EditTeamProps) {
  const router = useRouter()
  const { teamId } = router.query
  const queryClient = useQueryClient()
  const [isOpen, setIsOpen] = useState<boolean>(true)
  const [formValues, setFormValues] = useState<FormValuesType>({
    teamName: '',
    teamImage: '',
    memberIds: [],
    isPrivate: false,
  })

  useEffect(() => {
    initialValue && setFormValues(initialValue as FormValuesType)
  }, [JSON.stringify(initialValue)])

  const { mutate: mutateEdit, isLoading: isCreating } = useMutation(editTeam, {
    onSuccess: () => {
      queryClient.invalidateQueries(QUERIES_CONTACTS.CONTACT_TEAM_PROFILE)
      queryClient.invalidateQueries(QUERIES_CONTACTS.CONTACT_TEAM_MEMBER)
      toast.success('Team successfully edited')
      setIsOpen(false)
      isClose('')
    },
    onError: () => {
      toast.error('Something went wrong')
    },
  })

  const onSubmit = useCallback(() => {
    mutateEdit({ data: formValues, teamId })
  }, [JSON.stringify(formValues)])

  const handleChangeForm = useCallback(
    (type: keyof FormValuesType, value: string | string[]) => {
      setFormValues((prev) => ({ ...prev, [type]: value }))
    },
    [JSON.stringify(formValues)]
  )

  useEffect(() => {
    !isOpen && isClose('')
  }, [isOpen])

  return (
    <ModalMui
      sx={{ width: 700, top: '50%' }}
      isOpen={isOpen}
      onClose={setIsOpen}
    >
      <div className="flex flex-col items-center space-y-4 p-2 relative">
        <button
          type="button"
          onClick={() => setIsOpen(false)}
          className="absolute right-0 top-0"
        >
          <XIcon />
        </button>
        <p className="text-[24px] font-medium pb-6">Edit Team</p>
        <div className="space-y-6 w-full">
          <MyInput
            defaultValue={initialValue?.teamName}
            label="Group name"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleChangeForm('teamName', e.target.value)
            }
          />
          <FetchingLimitMembers
            tab="MEMBER"
            endpoint={`teams/${teamId}/search-team-member`}
            onChange={(value) => handleChangeForm('memberIds', value)}
          />
          <div className="pb-6">
            <CustomUploadImage
              text="Drag-drop or click here to upload a photo
            (1160x400px JPG format, RGB color, ≤ 100 KB)"
              width={'100%'}
              height={250}
              className="border-[2px] border-gray-700 hover:border-white  duration-150"
              textClass="pt-8 px-24 font-medium"
              iconClass="pt-24"
              value={formValues.teamImage}
              setImage={(value: any) => {
                handleChangeForm('teamImage', value)
              }}
            />
          </div>
          <div className="flex items-center">
            <p className="16px font-semibold">Private group</p>
            <MySwitchButton
              onChange={(_, value) => handleChangeForm('isPrivate', value)}
              name="messageUpdates"
            />
          </div>
          <Button
            type="submit"
            label="Save"
            onClick={onSubmit}
            isLoading={isCreating}
            isDisabled={formValues.teamName === ''}
            className="bg-[#4654EA] px-24 py-2.5 rounded-lg"
          />
        </div>
      </div>
    </ModalMui>
  )
}
