import { MenuItem } from '@material-ui/core'
import TextArea from 'antd/lib/input/TextArea'
import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useMutation } from 'react-query'
import { Button, ModalShowImage, MyDatePicker, MyInput } from 'src/components'
import { CloseIcon, XIcon } from 'src/components/icons'
import { ListImageVideo } from 'src/components/list-image-video'
import { ModalShowVideo } from 'src/components/modal-show-video'
import { MyModal } from 'src/components/MyModal'
import { MySelect } from 'src/components/MySelect'
import { MyTextArea } from 'src/components/MyTextarea'
import { UploadMutilImageVideo } from 'src/components/upload-mutil-image-video'
import { DashboardHealthUpdateType } from 'src/constants/types'
import { useIncrementNumber } from 'src/hooks/useIncrementNumber'
import { postHealth, removeHealth } from 'src/service/dashboard/health.service'

interface ModalHealthUpdateProps {
  setIsOpenModal?: (open: boolean) => void
  setCheckUpdate?: (check: boolean) => void
  item?: DashboardHealthUpdateType
}

export const ModalHealthUpdate = ({
  item,
  setCheckUpdate,
  setIsOpenModal,
}: ModalHealthUpdateProps) => {
  const [arrayFile, setArrayFile] = useState([])
  const [medias, setMedias] = useState([])
  const [showUrl, setShowUrl] = useState('')
  const [loadingUpdate, setLoadingUpdate] = useState<boolean>(false)
  const [isOpenModal, setIsOpenModalImg] = useState<boolean>(false)
  const [formValues, setFormValues] = useState<DashboardHealthUpdateType>({
    healthId: '',
    userId: '',
    weight: 0,
    waistSkinsThickness: 0,
    height: 0,
    updatedAt: 0,
    systolicBloodPressure: 0,
    diastolicBloodPressure: 0,
    date: '',
    breastSkinThickness: 0,
    media: [''],
    thighSkinThickness: 0,
    otherDescription: '',
    restingPulse: 0,
    createdAt: 0,
    maxPulse: 0,
    bmi: 0,
    fat: 0,
  })

  const heightOptions = useIncrementNumber({
    startNumber: 120,
    endNumber: 220,
    meanSure: 'cm',
  })

  const weightOptions = useIncrementNumber({
    startNumber: 30,
    endNumber: 130,
    meanSure: 'kg',
  })

  const breastSkinOptions = useIncrementNumber({
    startNumber: 4,
    endNumber: 20,
    meanSure: 'mm',
  })

  const waistSkinOptions = useIncrementNumber({
    startNumber: 4,
    endNumber: 20,
    meanSure: 'mm',
  })

  const thighSkinOptions = useIncrementNumber({
    startNumber: 4,
    endNumber: 20,
    meanSure: 'mm',
  })
  const restingPulseOptions = useIncrementNumber({
    startNumber: 30,
    endNumber: 220,
    meanSure: 'bpm',
  })
  const maxPulseOptions = useIncrementNumber({
    startNumber: 30,
    endNumber: 220,
    meanSure: 'bpm',
  })

  const systolicBloodPresureOptions = useIncrementNumber({
    startNumber: 50,
    endNumber: 150,
    meanSure: 'mmHg',
  })

  const diastolicBloodPresureOptions = useIncrementNumber({
    startNumber: 50,
    endNumber: 150,
    meanSure: 'mmHg',
  })

  const { mutate: PostHealth, isLoading: loadingHealth } = useMutation(
    postHealth,
    {
      onSuccess: (res) => {
        if (res.status === 200) {
          toast.success(res.data.message)
          setLoadingUpdate(false)
          setIsOpenModal(false)
          setCheckUpdate(true)
        }
      },
    }
  )
  const { mutate: RemoveHealth } = useMutation(removeHealth, {
    onSuccess: (res) => {
      if (res.status === 200) {
        toast.success(res.data.message)
        setIsOpenModal(false)
        setCheckUpdate(true)
      }
    },
  })

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
    type: keyof DashboardHealthUpdateType,
    value: string
  ) => {
    setFormValues((prev) => ({ ...prev, [type]: value }))
  }

  const handleShow = (url: string) => {
    setIsOpenModal(true)
    setShowUrl(url)
  }

  const handleSave = () => {
    setLoadingUpdate(true)
    const valuePost = {
      date: new Date(formValues.date).toISOString(),
      height: +formValues.height,
      weight: +formValues.weight,
      breastSkinThickness: +formValues.breastSkinThickness,
      waistSkinsThickness: +formValues.waistSkinsThickness,
      thighSkinThickness: +formValues.thighSkinThickness,
      restingPulse: +formValues.restingPulse,
      maxPulse: +formValues.maxPulse,
      systolicBloodPressure: +formValues.systolicBloodPressure,
      diastolicBloodPressure: +formValues.diastolicBloodPressure,
      otherDescription: formValues.otherDescription,
      media: medias,
    }

    try {
      PostHealth({
        docId: item.healthId && item.healthId,
        body: { ...valuePost },
      })
    } catch (error) {}

    loadingUpdate &&
      setTimeout(() => {
        setLoadingUpdate(false)
      }, 1000)
  }

  const handleDelete = () => {
    try {
      RemoveHealth(item.healthId && item.healthId)
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

      <div className="w-full grid grid-cols-4 mt-[24px]">
        <p className="text-[18px] font-bold col-span-1">Health update</p>
        <div className="col-span-3 space-y-[24px]">
          <div className="bg-[#13161A] rounded-[8px]">
            <p className="text-sm p-[10px]">
              Control and update your health data frequently to make sure you
              are healthy!
            </p>
          </div>

          <MyDatePicker
            label="Date"
            value={formValues.date}
            onChange={(e) => handleChangeForm('date', e)}
          />

          <MyInput
            select
            label="Height"
            value={formValues.height}
            onChange={(e) => handleChangeForm('height', e.target.value)}
          >
            {heightOptions.map((i, index) => (
              <MenuItem key={index} value={i.value}>
                {i.label}
              </MenuItem>
            ))}
          </MyInput>

          <MyInput
            select
            label="Weight"
            value={formValues.weight}
            onChange={(e) => handleChangeForm('weight', e.target.value)}
          >
            {weightOptions.map((i, index) => (
              <MenuItem key={index} value={i.value}>
                {i.label}
              </MenuItem>
            ))}
          </MyInput>

          <MyInput
            select
            label="Breast skin thickness"
            value={formValues.breastSkinThickness}
            onChange={(e) =>
              handleChangeForm('breastSkinThickness', e.target.value)
            }
          >
            {breastSkinOptions.map((i, index) => (
              <MenuItem key={index} value={i.value}>
                {i.label}
              </MenuItem>
            ))}
          </MyInput>

          <MyInput
            select
            label="Waist skin thickness"
            value={formValues.waistSkinsThickness}
            onChange={(e) =>
              handleChangeForm('waistSkinsThickness', e.target.value)
            }
          >
            {waistSkinOptions.map((i, index) => (
              <MenuItem key={index} value={i.value}>
                {i.label}
              </MenuItem>
            ))}
          </MyInput>

          <MyInput
            select
            label="Thigh skin thickness"
            value={formValues.thighSkinThickness}
            onChange={(e) =>
              handleChangeForm('thighSkinThickness', e.target.value)
            }
          >
            {thighSkinOptions.map((i, index) => (
              <MenuItem key={index} value={i.value}>
                {i.label}
              </MenuItem>
            ))}
          </MyInput>

          <MyInput
            select
            label="Resting pulse"
            value={formValues.restingPulse}
            onChange={(e) => handleChangeForm('restingPulse', e.target.value)}
          >
            {restingPulseOptions.map((i, index) => (
              <MenuItem key={index} value={i.value}>
                {i.label}
              </MenuItem>
            ))}
          </MyInput>

          <MyInput
            select
            label="Max pulse"
            value={formValues.maxPulse}
            onChange={(e) => handleChangeForm('maxPulse', e.target.value)}
          >
            {maxPulseOptions.map((i, index) => (
              <MenuItem key={index} value={i.value}>
                {i.label}
              </MenuItem>
            ))}
          </MyInput>

          <MyInput
            select
            label="Systolic blood pressue"
            value={formValues.systolicBloodPressure}
            onChange={(e) =>
              handleChangeForm('systolicBloodPressure', e.target.value)
            }
          >
            {systolicBloodPresureOptions.map((i, index) => (
              <MenuItem key={index} value={i.value}>
                {i.label}
              </MenuItem>
            ))}
          </MyInput>

          <MyInput
            select
            label="Diastolic blood pressue"
            value={formValues.diastolicBloodPressure}
            onChange={(e) =>
              handleChangeForm('diastolicBloodPressure', e.target.value)
            }
          >
            {diastolicBloodPresureOptions.map((i, index) => (
              <MenuItem key={index} value={i.value}>
                {i.label}
              </MenuItem>
            ))}
          </MyInput>

          <MyTextArea
            placeholder="Description"
            value={formValues.otherDescription}
            onChange={(e) =>
              handleChangeForm('otherDescription', e.target.value)
            }
          />

          <div className="w-full flex mb-[12.5px] mt-[11.75px]">
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
            handleShow={handleShow}
          />
          <div className="w-full flex mt-[24px]">
            <div className="flex-1 " onClick={handleSave}>
              <Button
                loading
                text="Save"
                className="w-[148px] h-[48px] justify-between bg-[#4654EA] hover:bg-[#6470f3] rounded-[8px]"
              />
            </div>
            <div className="flex-1">
              <Button
                text="Go Back"
                className="w-[148px] h-[48px] justify-between text-[#10B981] rounded-[8px] border-[1px] border-[#10B981]"
              />
            </div>
            <div className="flex-1" onClick={handleDelete}>
              <Button
                text="Delete"
                className="w-[148px] h-[48px] justify-between bg-[#D60C0C] hover:bg-[#eb4848] text-[#ffffff] rounded-[8px]"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
