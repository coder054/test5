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
import { createGroup } from 'src/service/contacts/group.service'
import { InfiniteMembers } from '../../components/InfiniteMembers'

type CreateGroupModalProps = {
  isClose: (value: string) => void
}

type FormValuesType = {
  name: string
  groupImage: string
  memberIds: string[]
  isPrivate: boolean
}

export default function CreateGroupModal({ isClose }: CreateGroupModalProps) {
  const queryClient = useQueryClient()
  const [isOpen, setIsOpen] = useState<boolean>(true)
  const [formValues, setFormValues] = useState<FormValuesType>({
    name: '',
    groupImage: '',
    memberIds: [],
    isPrivate: false,
  })

  const { mutate: mutateCreate, isLoading: isCreating } = useMutation(
    createGroup,
    {
      onSuccess: () => {
        queryClient.invalidateQueries(QUERIES_CONTACTS.CONTACT_GROUP)
        toast.success('Group successfully created')
        isClose('')
      },
      onError: () => {
        toast.error('An error has occurred')
      },
    }
  )

  const onSubmit = useCallback(() => {
    mutateCreate({ data: formValues })
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
        <p className="text-[24px] font-medium pb-6">Create New Group</p>
        <div className="space-y-6 w-full">
          <MyInput
            label="Group name"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleChangeForm('name', e.target.value)
            }
          />
          <InfiniteMembers
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
              value={formValues.groupImage}
              setImage={(value: any) => handleChangeForm('groupImage', value)}
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
            label="Create"
            onClick={onSubmit}
            isLoading={isCreating}
            isDisabled={formValues.name === ''}
            className="bg-[#4654EA] px-24 py-2.5 rounded-lg"
          />
        </div>
      </div>
    </ModalMui>
  )
}
