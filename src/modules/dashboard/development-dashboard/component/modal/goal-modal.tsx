import { MenuItem } from '@material-ui/core'
import dayjs from 'dayjs'
import { ReactNode, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { Button, MyDatePicker, MyInput } from 'src/components'
import { XIcon } from 'src/components/icons'
import { ListImageVideo } from 'src/components/list-image-video'
import { ModalMui } from 'src/components/ModalMui'
import { MySlider } from 'src/components/MySlider'
import { MyTextArea } from 'src/components/MyTextarea'
import { PopupConfirmDelete } from 'src/components/popup-confirm-delete'
import { UploadMutilImageVideo } from 'src/components/upload-mutil-image-video'
import { CategoryOptions } from 'src/constants/options'
import { QUERIES_DASHBOARD } from 'src/constants/query-keys/query-keys.constants'
import { DashboardGoalUpdateType } from 'src/constants/types'
import { getToday } from 'src/hooks/functionCommon'
import {
  createPersonalGoal,
  CreatePersonalGoalType,
  removePersonalGoal,
  updatePersonalGoal,
  UpdatePersonalGoalType,
} from 'src/service/dashboard/development.service'

interface GoalModalProps {
  setIsOpenModal?: (open: boolean) => void
  setOpenModalGoal?: (open: boolean) => void
  item?: DashboardGoalUpdateType
  update?: boolean
  create?: boolean
  clock?: ReactNode
}

export const GoalModal = ({
  item,
  setIsOpenModal,
  setOpenModalGoal,
  update,
  create,
  clock,
}: GoalModalProps) => {
  const [arrayFile, setArrayFile] = useState([])
  const [medias, setMedias] = useState([])
  const [showUrl, setShowUrl] = useState('')
  const [loadingUpdate, setLoadingUpdate] = useState<boolean>(false)
  const [isOpenModal, setIsOpenModalImg] = useState<boolean>(false)
  const [isOpenModalDelete, setIsOpenModalDelete] = useState<boolean>(false)

  const queryClient = useQueryClient()
  const [formValues, setFormValues] = useState<DashboardGoalUpdateType>({
    typeOfPost: '',
    userType: '',
    updatedAt: 0,
    description: '',
    createdAt: dayjs(new Date()).format('YYYY/MM/DD'),
    headline: '',
    deadline: '',
    mediaLinks: [],
    category: '',
    userId: '',
    personalGoalId: '',
    deadlineUnix: 0,
    progress: 0,
  })

  const { isLoading: loading, mutate: UpdatePersonal } = useMutation(
    [QUERIES_DASHBOARD.UPDATE_PERSONAL_GOAL],
    updatePersonalGoal,
    {
      onSuccess: (res) => {
        toast.success(res.data.message)
        queryClient.invalidateQueries(QUERIES_DASHBOARD.UPDATE_PERSONAL_GOAL)
        setIsOpenModal(false)
      },
    }
  )

  const { isLoading: loadingCreate, mutate: createPersonal } = useMutation(
    [QUERIES_DASHBOARD.UPDATE_PERSONAL_GOAL],
    createPersonalGoal,
    {
      onSuccess: (res) => {
        toast.success(res.data.message)
        queryClient.invalidateQueries(QUERIES_DASHBOARD.UPDATE_PERSONAL_GOAL)
        setIsOpenModal(false)
      },
    }
  )

  const { isLoading: loadingRemove, mutate: removePersonal } = useMutation(
    ['remove-goal'],
    removePersonalGoal,
    {
      onSuccess: (res) => {
        if (res.status === 200) {
          toast.success(res.data.message)
          queryClient.invalidateQueries(QUERIES_DASHBOARD.UPDATE_PERSONAL_GOAL)
          setIsOpenModal(false)
        }
      },
    }
  )

  useEffect(() => {
    item && setFormValues(item)
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
    type: keyof DashboardGoalUpdateType,
    value: string
  ) => {
    setFormValues((prev) => ({ ...prev, [type]: value }))
  }

  const handleSave = () => {
    setLoadingUpdate(true)
    if (update) {
      const valueUpdate: UpdatePersonalGoalType = {
        headline: formValues.headline,
        category: formValues.category,
        description: formValues.description,
        media: medias,
        deadline: formValues.deadline,
        progress: formValues.progress,
        docId: formValues.personalGoalId,
      }

      try {
        UpdatePersonal({ body: { ...valueUpdate } })
      } catch (error) {}
    } else if (create) {
      const valuePost: CreatePersonalGoalType = {
        headline: formValues.headline,
        category: formValues.category,
        description: formValues.description,
        media: medias,
        deadline: formValues.deadline
          ? formValues.deadline
          : new Date().toISOString(),
      }
      try {
        createPersonal({ body: { ...valuePost } })
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

  const handleConfirmDelete = () => {
    try {
      removePersonal(formValues.personalGoalId)
    } catch (error) {}
  }

  return (
    <div className="p-[32px] w-full">
      <div
        className="flex flex-row-reverse cursor-pointer"
        onClick={() => {
          setIsOpenModal && setIsOpenModal(false)
          setOpenModalGoal && setOpenModalGoal(false)
        }}
      >
        <XIcon />
      </div>

      <div className="w-full grid grid-cols-4 mt-[12px] mb-[12px]">
        <p className="text-[18px] font-bold col-span-1">Goal update</p>
        <div className="col-span-3 space-y-[24px]">
          <MyInput
            label="Headline"
            value={formValues.headline}
            onChange={(e) => handleChangeForm('headline', e.target.value)}
          ></MyInput>

          <MyInput
            select
            label="Category"
            value={formValues.category}
            onChange={(e) => handleChangeForm('category', e.target.value)}
          >
            {CategoryOptions.map((i, index) => (
              <MenuItem key={index} value={i.value}>
                {i.label}
              </MenuItem>
            ))}
          </MyInput>

          <MyTextArea
            placeholder="Goal description"
            value={formValues.description}
            onChange={(e) => handleChangeForm('description', e.target.value)}
          />

          <div
            className={`w-full flex ${
              !!arrayFile ? 'mb-[12.5px]' : ''
            } mt-[11.75px]`}
          >
            <UploadMutilImageVideo
              image
              arrayFiles={arrayFile}
              setArrayFiles={setArrayFile}
            />
            <div className="ml-[31px]">
              <UploadMutilImageVideo
                arrayFiles={arrayFile}
                setArrayFiles={setArrayFile}
              />
            </div>
          </div>

          <ListImageVideo
            arrayFile={arrayFile}
            setArrayFile={setArrayFile}
            setIsOpenModal={setIsOpenModalImg}
          />
          {create ? (
            <MyDatePicker
              label="Deadline"
              value={formValues.deadline}
              onChange={(e) => handleChangeForm('deadline', e)}
              minDate={dayjs(formValues.deadline).format('DD/MM/YYYY')}
            />
          ) : (
            <MyDatePicker
              label="Date"
              value={formValues.updatedAt}
              onChange={(e) => handleChangeForm('updatedAt', e)}
              minDate={dayjs(formValues.createdAt).format('DD/MM/YYYY')}
            />
          )}

          {create ? null : (
            <div className="mb-[24px]">
              <MySlider
                goal
                label=""
                step={1}
                value={formValues.progress}
                onChange={(e) => handleChangeForm('progress', e)}
              />
            </div>
          )}

          <div className="w-full flex mt-[24px]">
            <div className="flex-1 " onClick={handleSave}>
              <Button
                // loading
                text="Save"
                className="w-[148px] h-[48px] justify-between bg-[#4654EA] hover:bg-[#6470f3] rounded-[8px]"
              />
            </div>
            {!create ? (
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
      <ModalMui isOpen={isOpenModalDelete} onClose={setIsOpenModalDelete}>
        <PopupConfirmDelete
          handleConfirmDelete={handleConfirmDelete}
          setIsOpenModal={setIsOpenModalDelete}
        />
      </ModalMui>
    </div>
  )
}
