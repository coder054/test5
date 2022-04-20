import { MenuItem } from '@material-ui/core'
import dayjs from 'dayjs'
import { ReactNode, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useMutation, useQuery } from 'react-query'
import { Button, MyDatePicker, MyInput } from 'src/components'
import { XIcon } from 'src/components/icons'
import { ListImageVideo } from 'src/components/list-image-video'
import { MySlider } from 'src/components/MySlider'
import { MyTextArea } from 'src/components/MyTextarea'
import { UploadMutilImageVideo } from 'src/components/upload-mutil-image-video'
import { CategoryOptions } from 'src/constants/options'
import { QUERIES_DASHBOARD } from 'src/constants/query-keys/query-keys.constants'
import {
  DashboardGoalUpdateType,
  DevelopmentNoteType,
} from 'src/constants/types'
import {
  emotionlToNum,
  getToday,
  numToEmotional,
  numToScale,
} from 'src/hooks/functionCommon'
import {
  createDevelopmentNote,
  removeDevelopmentNote,
  updateDevelopmentNote,
  updatePersonalGoal,
  UpdatePersonalGoalType,
} from 'src/service/dashboard/development.service'

interface NoteModalProps {
  setIsOpenModal?: (open: boolean) => void
  setCheckUpdate?: (check: boolean) => void
  item?: DevelopmentNoteType
  create?: boolean
  update?: boolean
  clock?: ReactNode
}

interface FormValues {
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
}

export const NoteModal = ({
  item,
  setCheckUpdate,
  setIsOpenModal,
  update,
  create,
  clock,
}: NoteModalProps) => {
  const [arrayFile, setArrayFile] = useState([])
  const [medias, setMedias] = useState([])
  const [showUrl, setShowUrl] = useState('')
  const [loadingUpdate, setLoadingUpdate] = useState<boolean>(false)
  const [isOpenModal, setIsOpenModalImg] = useState<boolean>(false)
  const [formValues, setFormValues] = useState<FormValues>({
    strengthPlayer: '',
    strengthCoach: '',
    weaknessesPlayer: '',
    weaknessesCoach: '',
    bestDevelopSkillsPlayer: '',
    bestDevelopSkillsCoach: '',
    skillsNeededToDevelopPlayer: '',
    skillsNeededToDevelopCoach: '',
    bestWayToDevelopPlayer: '',
    bestWayToDevelopCoach: '',
    shortTermGoalPlayer: '',
    shortTermGoalCoach: '',
    longTermGoalPlayer: '',
    longTermGoalCoach: '',
    otherCommentsPlayer: '',
    otherCommentsCoach: '',
    date: dayjs(new Date()).format('YYYY/MM/DD'),
    progress: 'NORMAL',
  })

  const { isLoading: loadingCreate, mutate: createNote } = useMutation(
    [QUERIES_DASHBOARD.UPDATE_PERSONAL_GOAL],
    createDevelopmentNote,
    {
      onSuccess: (res) => {
        if (res.status === 200) {
          setIsOpenModal(false)
          toast.success(res.data.message)
          setCheckUpdate(true)
        }
      },
      onError: (err: any) => {
        if (err.response.status === 405) {
          toast.error('You created development for this day.')
        }
      },
    }
  )

  const { isLoading: loading, mutate: UpdateNote } = useMutation(
    [QUERIES_DASHBOARD.UPDATE_PERSONAL_GOAL],
    updateDevelopmentNote,
    {
      onSuccess: (res) => {
        if (res.status === 200) {
          setIsOpenModal(false)
          toast.success('update note successfuly!')
          setCheckUpdate(true)
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
          setIsOpenModal(false)
          toast.success('removed note!')
          setCheckUpdate(true)
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

  const handleChangeForm = (type: keyof FormValues, value: string) => {
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
          numToEmotional(+formValues.progress) || 'NORMAL',
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
          numToEmotional(+formValues.progress) || 'NORMAL',
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
    try {
      RemoveNote(item.devTalkId)
    } catch (error) {}
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
          <MyDatePicker
            label="Date"
            value={formValues.date}
            onChange={(e) => handleChangeForm('date', e)}
            readOnly={update ? true : false}
          />

          <div className="mb-[24px]">
            <MySlider
              isAdjective
              label="How is your development progress?"
              step={25}
              value={
                typeof formValues.progress !== 'number'
                  ? emotionlToNum(formValues.progress)
                  : formValues.progress
              }
              onChange={(e) => handleChangeForm('progress', e)}
            />
          </div>

          <MyTextArea
            label="1.My strengths are..."
            onChange={(e) => handleChangeForm('strengthPlayer', e.target.value)}
            value={formValues.strengthPlayer}
          />
          {update ? (
            <MyTextArea
              placeholder="Coach comment"
              onChange={(e) =>
                handleChangeForm('strengthCoach', e.target.value)
              }
              value={formValues.strengthCoach}
              disabled
            />
          ) : null}

          <MyTextArea
            label="2. My weaknesses are..."
            onChange={(e) =>
              handleChangeForm('weaknessesPlayer', e.target.value)
            }
            value={formValues.weaknessesPlayer}
          />
          {update ? (
            <MyTextArea
              label="Coach comment"
              onChange={(e) =>
                handleChangeForm('weaknessesCoach', e.target.value)
              }
              value={formValues.weaknessesCoach}
              disabled
            />
          ) : null}

          <MyTextArea
            label="3. My best development skilllately are..."
            onChange={(e) =>
              handleChangeForm('bestDevelopSkillsPlayer', e.target.value)
            }
            value={formValues.bestDevelopSkillsPlayer}
          />
          {update ? (
            <MyTextArea
              label="Coach comment"
              onChange={(e) =>
                handleChangeForm('weaknessesCoach', e.target.value)
              }
              value={formValues.bestDevelopSkillsCoach}
              disabled
            />
          ) : null}

          <MyTextArea
            label="4. The skill i need to develop are..."
            onChange={(e) =>
              handleChangeForm('skillsNeededToDevelopPlayer', e.target.value)
            }
            value={formValues.skillsNeededToDevelopPlayer}
          />
          {update ? (
            <MyTextArea
              label="Coach comment"
              onChange={(e) =>
                handleChangeForm('skillsNeededToDevelopCoach', e.target.value)
              }
              value={formValues.skillsNeededToDevelopCoach}
              disabled
            />
          ) : null}

          <MyTextArea
            label="5. The best way to develop are..."
            onChange={(e) =>
              handleChangeForm('bestWayToDevelopPlayer', e.target.value)
            }
            value={formValues.bestWayToDevelopPlayer}
          />
          {update ? (
            <MyTextArea
              label="Coach comment"
              onChange={(e) =>
                handleChangeForm('bestWayToDevelopCoach', e.target.value)
              }
              value={formValues.bestWayToDevelopCoach}
              disabled
            />
          ) : null}

          <MyTextArea
            label="6. My short term goal are..."
            onChange={(e) =>
              handleChangeForm('shortTermGoalPlayer', e.target.value)
            }
            value={formValues.shortTermGoalPlayer}
          />
          {update ? (
            <MyTextArea
              label="Coach comment"
              onChange={(e) =>
                handleChangeForm('shortTermGoalCoach', e.target.value)
              }
              value={formValues.shortTermGoalCoach}
              disabled
            />
          ) : null}

          <MyTextArea
            label="7. My long term goal are..."
            onChange={(e) =>
              handleChangeForm('longTermGoalPlayer', e.target.value)
            }
            value={formValues.longTermGoalPlayer}
          />
          {update ? (
            <MyTextArea
              label="Coach comment"
              onChange={(e) =>
                handleChangeForm('longTermGoalCoach', e.target.value)
              }
              value={formValues.longTermGoalCoach}
              disabled
            />
          ) : null}

          <MyTextArea
            label="8. My other comment are..."
            onChange={(e) =>
              handleChangeForm('otherCommentsPlayer', e.target.value)
            }
            value={formValues.otherCommentsPlayer}
          />
          {update ? (
            <MyTextArea
              label="Coach comment"
              onChange={(e) =>
                handleChangeForm('otherCommentsCoach', e.target.value)
              }
              value={formValues.otherCommentsCoach}
              disabled
            />
          ) : null}

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
                <div className="flex-1">
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
    </div>
  )
}
