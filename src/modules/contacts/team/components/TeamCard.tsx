import { useRouter } from 'next/router'
import { useMemo, useState } from 'react'
import toast from 'react-hot-toast'
import { useMutation, useQueryClient } from 'react-query'
import { ChervonRightIcon, TrashCanIcon } from 'src/components/icons'
import { QUERIES_CONTACTS } from 'src/constants/query-keys/query-keys.constants'
import { TeamsType } from 'src/constants/types/contacts.types'
import { deleteTeam } from 'src/service/contacts/team.service'
import Card from '../../components/card-template'
import DropdownButton from '../../components/card-template/DropdownButton'
import ConfirmModal from '../../components/modals/ModalDelete'

type TeamsCardProps = {
  team?: TeamsType
}

export const TeamCard = ({ team }: TeamsCardProps) => {
  const router = useRouter()
  const queryClient = useQueryClient()
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false)

  const HIGHEST_ROLE = useMemo(() => {
    return team.memberType === 'OWNER'
  }, [team.memberType])

  const handleDeleteTeam = () => {
    mutateDelete({ teamId: team.teamId })
  }

  const { mutate: mutateDelete, isLoading: isDeleting } = useMutation(
    deleteTeam,
    {
      onSuccess: () => {
        queryClient.invalidateQueries(QUERIES_CONTACTS.CONTACT_TEAM)
        toast.success('Team successfully deleted')
        setIsOpenModal(false)
      },
      onError: () => {
        toast.error('Something went wrong')
      },
    }
  )

  return (
    <Card
      avatar={team?.teamImage}
      name={`${team.clubName} - ${team.teamName}`}
      users={team.usernames}
      onClick={() => router.push(`/contacts/team/${team.teamId}`)}
      commonOptions={
        <button type="button">
          <ChervonRightIcon className="w-[25px] h-[25px] active:scale-125 duration-150" />
        </button>
      }
      dropdownOptions={
        HIGHEST_ROLE && (
          <>
            <DropdownButton
              onClick={(e) => {
                e.stopPropagation()
                setIsOpenModal(true)
              }}
              label="Delete team"
              labelClass="text-[#D60C0C]"
              icon={<TrashCanIcon className="w-[20px] h-[20px]" />}
            />
            <ConfirmModal
              label="Delete team"
              content="Are you sure you want to delete this team?"
              actionLabel="Delete"
              isOpen={isOpenModal}
              onClose={setIsOpenModal}
              isLoading={isDeleting}
              onSubmit={handleDeleteTeam}
              icon={<TrashCanIcon className="w-[60px] h-[60px]" />}
            />
          </>
        )
      }
    />
  )
}
