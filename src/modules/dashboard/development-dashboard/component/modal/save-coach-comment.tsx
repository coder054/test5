import toast from 'react-hot-toast'
import { useMutation, useQueryClient } from 'react-query'
import { Button } from 'src/components'
import { QUERIES_DASHBOARD } from 'src/constants/query-keys/query-keys.constants'
import { DevelopmentNoteType } from 'src/constants/types'
import { numToEmotion } from 'src/hooks/functionCommon'
import { useAuth } from 'src/modules/authentication/auth/AuthContext'
import { coachCommentDevelopmentNote } from 'src/service/dashboard/development.service'
import { IDevelopmentFormValues } from './note-modal'

interface SaveCoachCommentProps {
  formValues?: IDevelopmentFormValues
  setIsOpenModal?: (value: boolean) => void
  dateNotePlayer?: string | Date
  devTalkId?: string
  notePlayer?: boolean
}

export const SaveCoachComment = ({
  formValues,
  setIsOpenModal,
  dateNotePlayer,
  devTalkId,
  notePlayer,
}: SaveCoachCommentProps) => {
  const { currentRoleName } = useAuth()
  const queryClient = useQueryClient()

  const { mutate: coachCommentPlayer } = useMutation(
    [QUERIES_DASHBOARD.COACH_COMMENT_PLAYER_DEVELOPMENT],
    coachCommentDevelopmentNote,
    {
      onSuccess: (res) => {
        toast.success('Comment player note successfully!')
        setIsOpenModal && setIsOpenModal(false)
        queryClient.invalidateQueries(QUERIES_DASHBOARD.NOTE_DATA)
      },
      onError: (err: any) => {
        if (err.response.status === 405) {
          toast.error('You created comment for this day.')
        }
      },
    }
  )

  const handleSaveCoachComment = () => {
    if (!formValues?.currentTeams?.teamName) {
      toast.error('Please choose field Your team!')
      return
    }
    if (!formValues?.player?.fullName) {
      toast.error('Please choose field Player!')
      return
    }

    if (!notePlayer) {
      toast.error('Player has note updated the development!')
      return
    }

    if (currentRoleName === 'COACH') {
      const valueCoachComment: DevelopmentNoteType = {
        coachNotedAt: formValues?.dateCoachComment,
        coachDevelopmentProgress:
          numToEmotion(+formValues.progress) || 'NORMAL',
        playerId: formValues?.player?.userId,
        strength: {
          playerContent: formValues.strengthPlayer,
          coachComment: formValues.strengthCoach,
        },
        weaknesses: {
          playerContent: formValues.weaknessesPlayer,
          coachComment: formValues.weaknessesCoach,
        },
        bestDevelopSkills: {
          playerContent: formValues.bestDevelopSkillsPlayer,
          coachComment: formValues.bestDevelopSkillsCoach,
        },
        skillsNeededToDevelop: {
          playerContent: formValues.skillsNeededToDevelopPlayer,
          coachComment: formValues.skillsNeededToDevelopCoach,
        },
        bestWayToDevelop: {
          playerContent: formValues.bestWayToDevelopPlayer,
          coachComment: formValues.bestWayToDevelopCoach,
        },
        shortTermGoal: {
          playerContent: formValues.shortTermGoalPlayer,
          coachComment: formValues.shortTermGoalCoach,
        },
        longTermGoal: {
          playerContent: formValues.longTermGoalPlayer,
          coachComment: formValues.longTermGoalCoach,
        },
        otherComments: {
          playerContent: formValues.otherCommentsPlayer,
          coachComment: formValues.otherCommentsCoach,
        },
      }
      try {
        coachCommentPlayer({
          body: { ...valueCoachComment },
          devTalkId: devTalkId,
        })
      } catch (error) {}
    }
  }

  return (
    <div className="flex-1 " onClick={handleSaveCoachComment}>
      <Button
        // loading
        text="Save Coach"
        className="w-[148px] h-[48px] justify-between bg-[#4654EA] hover:bg-[#6470f3] rounded-[8px]"
      />
    </div>
  )
}
