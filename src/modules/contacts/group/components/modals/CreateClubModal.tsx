import React, { ChangeEvent, useCallback, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useMutation, useQueryClient } from 'react-query'
import { MyInput } from 'src/components'
import { Button } from 'src/components/Button'
import { CustomUploadImage } from 'src/components/custom-upload-image'
import { XIcon } from 'src/components/icons'
import { ModalMui } from 'src/components/ModalMui'
import { useIPGeolocation } from 'src/hooks/useIPGeolocation'
import { createClub, NewClubType } from 'src/service/contacts/group.service'

type CreateGroupClubProps = {
  isClose: (value: string) => void
}

export default function CreateClubModal({ isClose }: CreateGroupClubProps) {
  const queryClient = useQueryClient()
  const [isOpen, setIsOpen] = useState<boolean>(true)

  const data = useIPGeolocation()

  const [formValues, setFormValues] = useState<NewClubType>({
    clubName: '',
    logoUrl: '',
    nickName: '',
    city: '',
    country: '',
    arena: '',
    websiteUrl: '',
  })

  useEffect(() => {
    setFormValues((prev) => ({
      ...prev,
      country: data?.country,
      city: data?.regionName,
    }))
  }, [data])

  const { mutate: mutateCreate, isLoading: isCreating } = useMutation(
    createClub,
    {
      onSuccess: () => {
        toast.success('Group successfully created')
        isClose('')
      },
      onError: () => {
        toast.error('Something went wrong')
      },
    }
  )

  const onSubmit = useCallback(() => {
    mutateCreate({ data: formValues })
  }, [JSON.stringify(formValues)])

  const handleChangeForm = useCallback(
    (type: keyof NewClubType, value: string | string[]) => {
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
        <p className="text-[24px] font-medium pb-6">Create New Club</p>
        <div className="space-y-6 w-full">
          <MyInput
            label="Club name"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleChangeForm('clubName', e.target.value)
            }
          />
          <MyInput
            label="Club website url"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleChangeForm('websiteUrl', e.target.value)
            }
          />
          <div className="pb-8">
            <CustomUploadImage
              title="Club icon url/image"
              text="Drag-drop or click here to upload a photo
            (1160x400px JPG format, RGB color, ≤ 100 KB)"
              width={'100%'}
              height={250}
              className="border-[2px] border-gray-700 hover:border-white  duration-150"
              textClass="pt-8 px-24 font-medium"
              iconClass="pt-24"
              value={formValues.logoUrl}
              setImage={(value: any) => {
                handleChangeForm('logoUrl', value)
              }}
            />
          </div>
          <MyInput
            label="Country"
            value={formValues.country || ''}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleChangeForm('country', e.target.value)
            }
          />
          <MyInput
            label="City"
            value={formValues.city || ''}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleChangeForm('city', e.target.value)
            }
          />
          <Button
            type="submit"
            label="Create"
            onClick={onSubmit}
            isLoading={isCreating}
            isDisabled={formValues.clubName === ''}
            className="bg-[#4654EA] px-24 py-2.5 rounded-lg"
          />
        </div>
      </div>
    </ModalMui>
  )
}
