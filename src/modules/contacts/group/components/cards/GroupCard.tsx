import { useRouter } from 'next/router'
import { Fragment, useMemo, useState } from 'react'
import toast from 'react-hot-toast'
import { useMutation, useQueryClient } from 'react-query'
import { ChervonRightIcon, TrashCanIcon } from 'src/components/icons'
import { QUERIES_CONTACTS } from 'src/constants/query-keys/query-keys.constants'
import { GroupType } from 'src/constants/types/contacts.types'
import { deleteGroup } from 'src/service/contacts/group.service'
import Card from '../../../components/card-template'
import DropdownButton from '../../../components/card-template/DropdownButton'
import ConfirmModal from '../../../components/modals/ModalDelete'

interface GroupCardProps {
  group?: GroupType
}

export const GroupCard = ({ group }: GroupCardProps) => {
  const router = useRouter()
  const queryClient = useQueryClient()
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false)

  const HIGHEST_ROLE = useMemo(() => {
    return group.memberType === 'OWNER'
  }, [group.memberType])

  const handleDeleteGroup = () => {
    mutateDelete({ groupId: group.groupId })
  }

  const { mutate: mutateDelete, isLoading: isDeleting } = useMutation(
    deleteGroup,
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries(QUERIES_CONTACTS.CONTACT_GROUP)
        toast.success('Group successfully deleted')
        setIsOpenModal(false)
      },
      onError: () => {
        toast.error('Something went wrong')
      },
    }
  )

  return (
    <Fragment>
      <Card
        name={group.name}
        users={group.usernames}
        avatar={group.groupImage}
        onClick={() => router.push(`/contacts/group/${group.groupId}`)}
        commonOptions={
          <button type="button">
            <ChervonRightIcon className="w-[25px] h-[25px] active:scale-125 duration-150" />
          </button>
        }
        dropdownOptions={
          HIGHEST_ROLE && (
            <DropdownButton
              onClick={(e) => {
                setIsOpenModal(true)
                e.stopPropagation()
              }}
              label="Delete group"
              labelClass="text-[#D60C0C]"
              icon={<TrashCanIcon className="w-[20px] h-[20px]" />}
            />
          )
        }
      />
      <ConfirmModal
        label="Delete group"
        content="Are you sure you want to delete this group?"
        actionLabel="Delete"
        isOpen={isOpenModal}
        isLoading={isDeleting}
        onClose={setIsOpenModal}
        onSubmit={handleDeleteGroup}
        icon={<TrashCanIcon className="w-[60px] h-[60px]" />}
      />
    </Fragment>
  )
}
