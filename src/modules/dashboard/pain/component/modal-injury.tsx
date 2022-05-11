import { MenuItem } from '@material-ui/core'
import dayjs from 'dayjs'
import { ReactNode, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useMutation, useQuery } from 'react-query'
import { Button, MyDatePicker, MyInput, MyInputChips } from 'src/components'
import { XIcon } from 'src/components/icons'
import { ListImageVideo } from 'src/components/list-image-video'
import { MySlider } from 'src/components/MySlider'
import { MyTextArea } from 'src/components/MyTextarea'
import { UploadMutilImageVideo } from 'src/components/upload-mutil-image-video'
import { CategoryOptions } from 'src/constants/options'
import { QUERIES_DASHBOARD } from 'src/constants/query-keys/query-keys.constants'
import { DashboardGoalUpdateType } from 'src/constants/types'
import { InjuryReportType } from 'src/constants/types/dashboard/pain.types'
import { emotionToNum, getToday, numToEmotion } from 'src/hooks/functionCommon'
import {
  createPersonalGoal,
  CreatePersonalGoalType,
  removePersonalGoal,
  updatePersonalGoal,
  UpdatePersonalGoalType,
} from 'src/service/dashboard/development.service'

interface PainUpdateType {
  description: string
  treatment: string
  painLevel: string
  injuryTags: string[]
  injuryMedia: any
  injuryPosition: {
    x: number
    y: number
  }
  createdAt: string
  isFront: boolean
  injuryArea: string
}

interface PainModalProps {
  setIsOpenModal?: (open: boolean) => void
  setOpenModalPain?: (open: boolean) => void
  setCheckUpdate?: (check: boolean) => void
  item?: InjuryReportType
  update?: boolean
  create?: boolean
  clock?: ReactNode
}

export const PainModal = ({
  item,
  setCheckUpdate,
  setIsOpenModal,
  setOpenModalPain,
  update,
  create,
  clock,
}: PainModalProps) => {
  const [arrayFile, setArrayFile] = useState([])
  const [medias, setMedias] = useState([])
  const [tags, setTags] = useState<string[]>([])
  const [loadingUpdate, setLoadingUpdate] = useState<boolean>(false)
  const [isOpenModal, setIsOpenModalImg] = useState<boolean>(false)
  const [formValues, setFormValues] = useState<InjuryReportType>({
    createdAt: 0,
    description: '',
    isFront: false,
    injuryPosition: {
      y: 0,
      x: 0,
    },
    injuryTags: [],
    injuryArea: '',
    painLevel: '',
    updatedAt: 0,
    treatment: '',
    userId: '',
    injuryMedia: [],
    injuryId: '',
    diaryId: '',
  })

  const { isLoading: loading, mutate: UpdatePersonal } = useMutation(
    [QUERIES_DASHBOARD.UPDATE_PERSONAL_GOAL],
    updatePersonalGoal,
    {
      onSuccess: (res) => {
        setIsOpenModal(false)
        toast.success(res.data.message)
        setCheckUpdate(true)
      },
    }
  )

  const { isLoading: loadingCreate, mutate: createPersonal } = useMutation(
    [QUERIES_DASHBOARD.UPDATE_PERSONAL_GOAL],
    createPersonalGoal,
    {
      onSuccess: (res) => {
        console.log('res create:', res)

        setIsOpenModal(false)
        toast.success(res.data.message)
        setCheckUpdate(true)
      },
    }
  )

  const { isLoading: loadingRemove, mutate: removePersonal } = useMutation(
    ['remove-goal'],
    removePersonalGoal,
    {
      onSuccess: (res) => {
        if (res.status === 200) {
          setIsOpenModal(false)
          toast.success(res.data.message)
          setCheckUpdate(true)
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

  const handleChangeForm = (type: keyof PainUpdateType, value: string) => {
    setFormValues((prev) => ({ ...prev, [type]: value }))
  }

  const handleSave = () => {
    // setLoadingUpdate(true)
    // const valueUpdate: PainUpdateType = {
    //   description: formValues.description,
    //   treatment: formValues.treatment,
    //   painLevel: numToEmotion(+formValues.painLevel) || 'NORMAL',
    //   injuryTags: tags,
    //   injuryMedia: medias,
    //   injuryPosition: {
    //     x: 0,
    //     y: 0,
    //   },
    //   createdAt: new Date().toISOString(),
    //   isFront: true,
    //   injuryArea: formValues.injuryArea,
    // }
    // console.log('valueUpdate:', valueUpdate)
    // try {
    //   UpdatePersonal({ body: { ...valueUpdate } })
    // } catch (error) {}
    // loadingUpdate &&
    //   setTimeout(() => {
    //     setLoadingUpdate(false)
    //   }, 1000)
  }

  const handleRemove = () => {
    try {
      // removePersonal(formValues.personalGoalId)
    } catch (error) {}
  }

  return (
    <div className="p-[32px] w-full">
      {/* <div
        className="flex flex-row-reverse cursor-pointer"
        onClick={() => {
          setIsOpenModal && setIsOpenModal(false)
          setOpenModalPain && setOpenModalPain(false)
        }}
      >
        <XIcon />
      </div>

      <div className="w-full grid grid-cols-4 mt-[12px] mb-[12px]">
        <div className="col-span-1 font-bold">
          <p className="text-[18px]">Pain update</p>
          <p className="text-[14px]">Area: {item.injuryArea}</p>
        </div>
        <div className="col-span-3 space-y-[24px]">
          <MyTextArea
            label="Injury description (Describe your injury in text)"
            value={formValues.description}
            onChange={(e) => handleChangeForm('description', e.target.value)}
          />

          <UploadMutilImageVideo
            image
            arrayFiles={arrayFile}
            setArrayFiles={setArrayFile}
          />

          <ListImageVideo
            arrayFile={arrayFile}
            setArrayFile={setArrayFile}
            setIsOpenModal={setIsOpenModalImg}
          />

          <div className="mb-[24px]">
            <MySlider
              isScale
              label="Pain level"
              step={25}
              value={
                typeof formValues.painLevel !== 'number'
                  ? emotionToNum(formValues.painLevel)
                  : formValues.painLevel
              }
              onChange={(e) => handleChangeForm('painLevel', e)}
            />
          </div>

          <MyTextArea
            label="Injury treatment (Describe your rehab and how you treat your injury)"
            value={formValues.treatment}
            onChange={(e) => handleChangeForm('treatment', e.target.value)}
          />

          <MyInputChips label="Injury tags" value={tags} setTags={setTags} />

          <div className="w-full flex mt-[24px]">
            <div className="flex-1 " onClick={handleSave}>
              <Button
                // loading
                text="Save"
                className="w-[148px] h-[48px] justify-between bg-[#4654EA] hover:bg-[#6470f3] rounded-[8px]"
              />
            </div>
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
          </div>
        </div>
      </div> */}
    </div>
  )
}
