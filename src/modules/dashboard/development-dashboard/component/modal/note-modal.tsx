import dayjs from 'dayjs'
import { useAtom } from 'jotai'
import { ReactNode, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useMutation, useQueryClient } from 'react-query'
import { formValuesDevelopmentNodeAtom } from 'src/atoms/developmentNoteAtom'
import { Button, MyDatePicker } from 'src/components'
import { XIcon } from 'src/components/icons'
import { ModalMui } from 'src/components/ModalMui'
import { MySlider } from 'src/components/MySlider'
import { MyTextArea } from 'src/components/MyTextarea'
import { PopupConfirmDelete } from 'src/components/popup-confirm-delete'
import { QUERIES_DASHBOARD } from 'src/constants/query-keys/query-keys.constants'
import { DevelopmentNoteType } from 'src/constants/types'
import { emotionToNum, numToEmotion } from 'src/hooks/functionCommon'
import { InfiniteScrollTeam } from 'src/modules/account-settings/football/components/InfiniteScrollTeam'
import { useAuth } from 'src/modules/authentication/auth/AuthContext'
import {
  createDevelopmentNote,
  removeDevelopmentNote,
  updateDevelopmentNote,
} from 'src/service/dashboard/development.service'

interface NoteModalProps {
  setIsOpenModal?: (open: boolean) => void
  item?: DevelopmentNoteType
  create?: boolean
  update?: boolean
  clock?: ReactNode
}

export interface IDevelopmentFormValues {
  strengthPlayer: string
  strengthCoach: string
  weaknessesPlayer: string
  weaknessesCoach: string
  bestDevelopSkillsPlayer: string
  bestDevelopSkillsCoach: string
  skillsNeededToDevelopPlayer: string
  skillsNeededToDevelopCoach: string
  bestWayToDevelopPlayer: string
  bestWayToDevelopCoach: string
  shortTermGoalPlayer: string
  shortTermGoalCoach: string
  longTermGoalPlayer: string
  longTermGoalCoach: string
  otherCommentsPlayer: string
  otherCommentsCoach: string
  date: string | Date
  progress: string
  contractedClub?: {
    arena: string
    city: string
    clubId: string
    clubName: string
    country: string
    logoUrl: string
    websiteUrl: any
  }
  currentTeams?: string
}

export const NoteModal = ({
  item,
  setIsOpenModal,
  update,
  create,
  clock,
}: NoteModalProps) => {
  const queryClient = useQueryClient()
  const [arrayFile, setArrayFile] = useState([])
  const [medias, setMedias] = useState([])
  const [loadingUpdate, setLoadingUpdate] = useState<boolean>(false)
  const [isOpenModalDelete, setIsOpenModalDelete] = useState<boolean>(false)
  const { currentRoleName, currentUser, userRoles } = useAuth()
  // console.log('currentUser', currentUser)
  // console.log('userRoles', userRoles)

  const [formValues, setFormValues]: [IDevelopmentFormValues, Function] =
    useAtom(formValuesDevelopmentNodeAtom)

  const { isLoading: loadingCreate, mutate: createNote } = useMutation(
    [QUERIES_DASHBOARD.NOTE_DATA],
    createDevelopmentNote,
    {
      onSuccess: (res) => {
        toast.success('Create Development note successfully!')
        setIsOpenModal && setIsOpenModal(false)
        queryClient.invalidateQueries(QUERIES_DASHBOARD.NOTE_DATA)
      },
      onError: (err: any) => {
        if (err.response.status === 405) {
          toast.error('You created development for this day.')
        }
      },
    }
  )

  const { isLoading: loading, mutate: UpdateNote } = useMutation(
    [QUERIES_DASHBOARD.NOTE_DATA],
    updateDevelopmentNote,
    {
      onSuccess: (res) => {
        if (res.status === 200) {
          toast.success('update note successfuly!')
          queryClient.invalidateQueries(QUERIES_DASHBOARD.NOTE_DATA)
          setIsOpenModal(false)
        }
      },
      onError: (err: any) => {
        if (err.response.status === 405) {
          toast.error(err.response.data.message)
        }
      },
    }
  )

  const { mutate: RemoveNote } = useMutation(
    ['remove-note'],
    removeDevelopmentNote,
    {
      onSuccess: (res) => {
        if (res.status === 200) {
          toast.success('removed note!')
          queryClient.invalidateQueries(QUERIES_DASHBOARD.NOTE_DATA)
          setIsOpenModal(false)
        }
      },
    }
  )

  useEffect(() => {
    item &&
      setFormValues({
        strengthPlayer: item.strength.playerContent,
        strengthCoach: item.strength.coachComment,
        weaknessesPlayer: item.weaknesses.playerContent,
        weaknessesCoach: item.weaknesses.coachComment,
        bestDevelopSkillsPlayer: item.bestDevelopSkills.playerContent,
        bestDevelopSkillsCoach: item.bestDevelopSkills.coachComment,
        skillsNeededToDevelopPlayer: item.skillsNeededToDevelop.playerContent,
        skillsNeededToDevelopCoach: item.skillsNeededToDevelop.coachComment,
        bestWayToDevelopPlayer: item.bestWayToDevelop.playerContent,
        bestWayToDevelopCoach: item.bestWayToDevelop.coachComment,
        shortTermGoalPlayer: item.shortTermGoal.playerContent,
        shortTermGoalCoach: item.shortTermGoal.coachComment,
        longTermGoalPlayer: item.longTermGoal.playerContent,
        longTermGoalCoach: item.longTermGoal.coachComment,
        otherCommentsPlayer: item.otherComments.playerContent,
        otherCommentsCoach: item.otherComments.coachComment,
        date: dayjs(item.playerNotedAt).format('YYYY/MM/DD'),
        progress: item.playerDevelopmentProgress,
      })
  }, [item])

  useEffect(() => {
    setMedias([])
    arrayFile &&
      arrayFile.map((item) => {
        if (item.includes('mp4')) {
          setMedias((prev) => [...prev, { type: 'VIDEO', url: item }])
        } else {
          setMedias((prev) => [...prev, { type: 'IMAGE', url: item }])
        }
      })
  }, [arrayFile])

  const handleChangeForm = (
    type: keyof IDevelopmentFormValues,
    value: string
  ) => {
    setFormValues((prev) => ({ ...prev, [type]: value }))
  }

  const handleSave = () => {
    setLoadingUpdate(true)
    if (
      !formValues.strengthPlayer &&
      !formValues.strengthCoach &&
      !formValues.weaknessesPlayer &&
      !formValues.weaknessesCoach &&
      !formValues.bestDevelopSkillsCoach &&
      !formValues.bestDevelopSkillsPlayer &&
      !formValues.bestWayToDevelopCoach &&
      !formValues.bestWayToDevelopPlayer &&
      !formValues.skillsNeededToDevelopCoach &&
      !formValues.skillsNeededToDevelopPlayer &&
      !formValues.shortTermGoalCoach &&
      !formValues.shortTermGoalPlayer &&
      !formValues.longTermGoalCoach &&
      !formValues.longTermGoalPlayer &&
      !formValues.otherCommentsCoach &&
      !formValues.otherCommentsPlayer
    ) {
      toast.error('You need to fill at least 1 field!')
    }

    if (create) {
      const valuePost: DevelopmentNoteType = {
        playerDevelopmentProgress:
          numToEmotion(+formValues.progress) || 'NORMAL',
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
        playerNotedAt: formValues.date,
      }

      try {
        createNote({ body: { ...valuePost } })
      } catch (error) {}
    } else if (update) {
      const valueUpdate: DevelopmentNoteType = {
        playerDevelopmentProgress:
          numToEmotion(+formValues.progress) || 'NORMAL',
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
        UpdateNote({ body: { ...valueUpdate }, devTalkId: item.devTalkId })
      } catch (error) {}
    }

    loadingUpdate &&
      setTimeout(() => {
        setLoadingUpdate(false)
      }, 1000)
  }

  const handleRemove = () => {
    setIsOpenModalDelete(true)
  }

  const handleGoback = () => {
    setIsOpenModal && setIsOpenModal(false)
  }

  const handleConfirmDelete = () => {
    try {
      RemoveNote(item.devTalkId)
    } catch (error) {}
  }

  const setSelectedTeam = (value: any) => {
    setFormValues((prev) => ({ ...prev, currentTeams: value }))
  }

  return (
    <div className="p-[32px] w-full">
      <div
        className="flex flex-row-reverse cursor-pointer"
        onClick={() => {
          setIsOpenModal && setIsOpenModal(false)
        }}
      >
        <XIcon />
      </div>

      <div className="w-full grid grid-cols-4 mt-[12px] mb-[12px]">
        <p className="text-[18px] font-bold col-span-1 mr-[6px]">
          Development note
        </p>
        <div className="col-span-3 space-y-[24px]">
          {currentRoleName === 'PLAYER' ? (
            <MyDatePicker
              label="Date"
              value={formValues.date}
              onChange={(e) => handleChangeForm('date', e)}
              readOnly={update ? true : false}
            />
          ) : (
            <div>
              <InfiniteScrollTeam
                label="Your team(s)"
                idClub={formValues.contractedClub.clubId}
                handleSetTeam={(value) => setSelectedTeam(value)}
                // item={item}
              />
            </div>
          )}

          <div className="mb-[24px]">
            <MySlider
              isAdjective
              label="How is your development progress?"
              step={25}
              value={
                typeof formValues.progress !== 'number'
                  ? emotionToNum(formValues.progress)
                  : formValues.progress
              }
              onChange={(e) => handleChangeForm('progress', e)}
            />
          </div>

          <MyTextArea
            label="1.My strengths are..."
            onChange={(e) => handleChangeForm('strengthPlayer', e.target.value)}
            value={formValues.strengthPlayer}
            disabled={currentRoleName === 'COACH'}
          />
          <MyTextArea
            placeholder="Coach comment"
            onChange={(e) => handleChangeForm('strengthCoach', e.target.value)}
            value={formValues.strengthCoach}
            disabled={currentRoleName === 'PLAYER'}
          />

          <MyTextArea
            label="2. My weaknesses are..."
            onChange={(e) =>
              handleChangeForm('weaknessesPlayer', e.target.value)
            }
            value={formValues.weaknessesPlayer}
            disabled={currentRoleName === 'COACH'}
          />
          <MyTextArea
            label="Coach comment"
            onChange={(e) =>
              handleChangeForm('weaknessesCoach', e.target.value)
            }
            value={formValues.weaknessesCoach}
            disabled={currentRoleName === 'PLAYER'}
          />

          <MyTextArea
            label="3. My best development skilllately are..."
            onChange={(e) =>
              handleChangeForm('bestDevelopSkillsPlayer', e.target.value)
            }
            value={formValues.bestDevelopSkillsPlayer}
            disabled={currentRoleName === 'COACH'}
          />
          <MyTextArea
            label="Coach comment"
            onChange={(e) =>
              handleChangeForm('weaknessesCoach', e.target.value)
            }
            value={formValues.bestDevelopSkillsCoach}
            disabled={currentRoleName === 'PLAYER'}
          />

          <MyTextArea
            label="4. The skill i need to develop are..."
            onChange={(e) =>
              handleChangeForm('skillsNeededToDevelopPlayer', e.target.value)
            }
            value={formValues.skillsNeededToDevelopPlayer}
            disabled={currentRoleName === 'COACH'}
          />
          <MyTextArea
            label="Coach comment"
            onChange={(e) =>
              handleChangeForm('skillsNeededToDevelopCoach', e.target.value)
            }
            value={formValues.skillsNeededToDevelopCoach}
            disabled={currentRoleName === 'PLAYER'}
          />

          <MyTextArea
            label="5. The best way to develop are..."
            onChange={(e) =>
              handleChangeForm('bestWayToDevelopPlayer', e.target.value)
            }
            value={formValues.bestWayToDevelopPlayer}
            disabled={currentRoleName === 'COACH'}
          />
          <MyTextArea
            label="Coach comment"
            onChange={(e) =>
              handleChangeForm('bestWayToDevelopCoach', e.target.value)
            }
            value={formValues.bestWayToDevelopCoach}
            disabled={currentRoleName === 'PLAYER'}
          />

          <MyTextArea
            label="6. My short term goal are..."
            onChange={(e) =>
              handleChangeForm('shortTermGoalPlayer', e.target.value)
            }
            value={formValues.shortTermGoalPlayer}
            disabled={currentRoleName === 'COACH'}
          />
          <MyTextArea
            label="Coach comment"
            onChange={(e) =>
              handleChangeForm('shortTermGoalCoach', e.target.value)
            }
            value={formValues.shortTermGoalCoach}
            disabled={currentRoleName === 'PLAYER'}
          />

          <MyTextArea
            label="7. My long term goal are..."
            onChange={(e) =>
              handleChangeForm('longTermGoalPlayer', e.target.value)
            }
            value={formValues.longTermGoalPlayer}
            disabled={currentRoleName === 'COACH'}
          />
          <MyTextArea
            label="Coach comment"
            onChange={(e) =>
              handleChangeForm('longTermGoalCoach', e.target.value)
            }
            value={formValues.longTermGoalCoach}
            disabled={currentRoleName === 'PLAYER'}
          />

          <MyTextArea
            label="8. My other comment are..."
            onChange={(e) =>
              handleChangeForm('otherCommentsPlayer', e.target.value)
            }
            value={formValues.otherCommentsPlayer}
            disabled={currentRoleName === 'COACH'}
          />
          <MyTextArea
            label="Coach comment"
            onChange={(e) =>
              handleChangeForm('otherCommentsCoach', e.target.value)
            }
            value={formValues.otherCommentsCoach}
            disabled={currentRoleName === 'PLAYER'}
          />

          <div className="w-full flex mt-[24px]">
            <div className="flex-1 " onClick={handleSave}>
              <Button
                // loading
                text="Save"
                className="w-[148px] h-[48px] justify-between bg-[#4654EA] hover:bg-[#6470f3] rounded-[8px]"
              />
            </div>
            {update ? (
              <>
                <div className="flex-1" onClick={handleGoback}>
                  <Button
                    text="Go Back"
                    className="w-[148px] h-[48px] justify-between text-[#10B981] rounded-[8px] border-[1px] border-[#10B981]"
                  />
                </div>
                <div className="flex-1" onClick={handleRemove}>
                  <Button
                    text="Delete"
                    className="w-[148px] h-[48px] justify-between bg-[#D60C0C] hover:bg-[#eb4848] text-[#ffffff] rounded-[8px]"
                  />
                </div>
              </>
            ) : null}
          </div>
        </div>
      </div>
      <ModalMui isOpen={isOpenModalDelete} onClose={setIsOpenModalDelete}>
        <PopupConfirmDelete
          handleConfirmDelete={handleConfirmDelete}
          setIsOpenModal={setIsOpenModalDelete}
        />
      </ModalMui>
    </div>
  )
}
