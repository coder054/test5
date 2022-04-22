import React, { ChangeEvent, useCallback, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useMutation, useQueryClient } from 'react-query'
import { MyInput } from 'src/components'
import { Button } from 'src/components/Button'
import { CustomUploadImage } from 'src/components/custom-upload-image'
import { XIcon } from 'src/components/icons'
import { ModalMui } from 'src/components/ModalMui'
import { MySwitchButton } from 'src/components/MySwitchButton'
import { useAuth } from 'src/modules/authentication/auth/AuthContext'
import { createTeam, NewTeamType } from 'src/service/contacts/group.service'
import { FetchingAllMembers } from '../../../components/fetchs/FetchingAllMembers'
import { useQuery } from 'react-query'
import { fetchSettings } from 'src/service/users/settings'
import { ClubType } from 'src/constants/types/settingsType.type'
import { QUERIES_CONTACTS } from 'src/constants/query-keys/query-keys.constants'

type CreateGroupModalProps = {
  isClose: (value: string) => void
}

export default function CreateTeamModal({ isClose }: CreateGroupModalProps) {
  const queryClient = useQueryClient()
  const { currentRoleName } = useAuth()
  const [isOpen, setIsOpen] = useState<boolean>(true)

  const [club, setClub] = useState<ClubType>(null)

  const [formValues, setFormValues] = useState<NewTeamType>({
    teamName: '',
    teamImage: '',
    memberIds: [],
    isPrivate: false,
  })

  const { data } = useQuery(['settings'], () =>
    fetchSettings({ roleName: currentRoleName })
  )

  useEffect(() => {
    data && setClub(data.data.playerCareer.contractedClub)
  }, [data])

  const { mutate: mutateCreate, isLoading: isCreating } = useMutation(
    createTeam,
    {
      onSuccess: () => {
        queryClient.invalidateQueries(QUERIES_CONTACTS.CONTACT_TEAM)
        toast.success('Group successfully created')
        isClose('')
      },
      onError: () => {
        toast.error('Something went wrong')
      },
    }
  )

  const onSubmit = useCallback(() => {
    mutateCreate({ data: formValues, clubId: club?.clubId })
  }, [JSON.stringify(formValues), JSON.stringify(club?.clubId)])

  const handleChangeForm = useCallback(
    (type: keyof NewTeamType, value: string | string[]) => {
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
        <p className="text-[24px] font-medium pb-6">Create New Team</p>
        <div className="space-y-6 w-full">
          <MyInput label="Club name" defaultValue={club?.clubName} isDisabled />
          <MyInput
            label="Team name"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleChangeForm('teamName', e.target.value)
            }
          />
          <FetchingAllMembers
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
              setImage={(value: any) => handleChangeForm('teamImage', value)}
            />
          </div>
          <div className="flex items-center">
            <p className="16px font-semibold">Private team</p>
            <MySwitchButton
              onChange={(_, value) => handleChangeForm('isPrivate', value)}
              name="messageUpdates"
            />
          </div>
          <Button
            type="submit"
            label="Create"
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
