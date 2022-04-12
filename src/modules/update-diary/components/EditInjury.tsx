import useMouse from '@react-hook/mouse-position'
import { useAtom } from 'jotai'
import { useEffect, useRef, useState } from 'react'
import { toast as AlertSpot } from 'react-hot-toast'
import { useMutation } from 'react-query'
import { Slide, toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { diaryAtom } from 'src/atoms/diaryAtoms'
import { injuryAtom } from 'src/atoms/injuryAtom'
import { MyInputChips } from 'src/components'
import { Button } from 'src/components/Button'
import { MyButton } from 'src/components/MyButton'
import { MySlider } from 'src/components/MySlider'
import { MyTextArea } from 'src/components/MyTextarea'
import {
  BODY_PART,
  InjuryType,
  PointsType,
  SPOT_KEY,
} from 'src/constants/types/diary.types'
import { numToScale, scaleToNum } from 'src/hooks/functionCommon'
import { useAuth } from 'src/modules/authentication/auth/AuthContext'
import { deleteInjury, updateInjury } from 'src/service/diary-update'
import { ModalMui } from 'src/components/ModalMui'
import { BodyPart } from './BodyPart'
import { BooleanOption } from './BooleanOption'
import { InjurySpot } from './InjurySpot'

type EditInjuryProps = {
  onClose: (value: boolean) => void
}

const INITIAL_FORM = {
  injuryArea: '',
  isFront: true,
  description: '',
  treatment: '',
  painLevel: 'VERY_LOW',
  injuryTags: [],
  injuryMedia: [],
  injuryPosition: {
    x: null,
    y: null,
  },
}

export const EditInjury = ({ onClose }: EditInjuryProps) => {
  const { currentRoleName } = useAuth()
  const [injury] = useAtom(injuryAtom)
  const [diary, setDiary] = useAtom(diaryAtom)
  const [side, setSide] = useState<boolean>(true)
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false)
  const [formValues, setFormValues] = useState<InjuryType>(INITIAL_FORM)

  const parentRef = useRef(null)
  const mouse = useMouse(parentRef, {
    enterDelay: 100,
    leaveDelay: 100,
  })

  const [spot, setSpot] = useState<PointsType>({
    x: null,
    y: null,
    name: '',
  })

  const handleChooseSpot = (
    e: React.MouseEvent<HTMLDivElement>,
    key: SPOT_KEY
  ) => {
    notify(key)
    setSpot((prev) => ({
      ...prev,
      x: e.nativeEvent.offsetX,
      y: e.nativeEvent.offsetY,
      name: key,
    }))
  }

  const notify = (key: string) => {
    toast(`Hey, you've click on ${BODY_PART[key].injuryName} !`, {
      position: 'bottom-left',
      autoClose: 1000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      className: 'bg-[#4654EA] text-white w-[500px]',
      progress: undefined,
    })
  }

  const { mutate: mutateDelete, isLoading: isDeleting } = useMutation(
    deleteInjury,
    {
      onSuccess: (data) => {
        let newArr = [...diary.injuries]
        setDiary((prev) => ({
          ...prev,
          injuries: newArr.filter((it) => it.injuryId !== injury.injuryId),
        }))
        setIsOpenModal(false)
        onClose && onClose(false)
        AlertSpot.success(data.data)
      },
      onError: () => {
        AlertSpot.error('An error has occurred')
      },
    }
  )

  const { mutate: mutateUpdate, isLoading: isUpdating } = useMutation(
    updateInjury,
    {
      onSuccess: () => {
        let newArr = [...diary.injuries]
        setDiary((prev) => ({
          ...prev,
          injuries: newArr.map((item) => {
            return item.injuryId === injury.injuryId ? formValues : item
          }),
        }))

        AlertSpot.success('Injury successfully updated')
        onClose && onClose(false)
      },
      onError: () => {
        AlertSpot.error('An error has occurred')
      },
    }
  )

  const handleDeleteInjury = async () => {
    mutateDelete({
      diaryId: injury.diaryId,
      injuryId: injury.injuryId,
      roleName: currentRoleName,
    })
  }

  const handleUpdateInjury = async () => {
    mutateUpdate({
      diaryId: injury.diaryId,
      injuryId: injury.injuryId,
      data: { ...formValues, createdAt: new Date(formValues.createdAt) },
    })
  }

  useEffect(() => {
    setFormValues((prev) => ({
      ...prev,
      isFront: side,
      injuryArea: BODY_PART[spot.name]?.injuryArea,
      injuryPosition: { x: mouse.x, y: mouse.y },
    }))
  }, [JSON.stringify(spot)])

  useEffect(() => {
    setFormValues(injury)
    setSide(injury.isFront)
  }, [JSON.stringify(injury)])

  return (
    <div className="pb-6">
      <BooleanOption
        label="Point the mark where your pain is"
        first="Front"
        second="Back"
        value={side}
        onChange={setSide}
      />
      <div className="flex flex-col items-center space-y-9 my-9">
        <ToastContainer transition={Slide} limit={0} />
        {side ? (
          // 16 parts of front body
          <div
            ref={parentRef}
            className="bg-front-body  relative w-[214px] h-[440px] bg-no-repeat bg-center cursor-pointer duration-150"
          >
            {formValues.injuryArea && formValues.isFront && (
              <InjurySpot
                level={scaleToNum(formValues.painLevel)}
                spot={formValues.injuryPosition}
              />
            )}
            <BodyPart
              handleChooseSpot={(e) => handleChooseSpot(e, 'FRH')}
              className="absolute z-10 w-[21px] h-[20px]  top-0 left-[86px] rounded-tl-full"
            />
            <BodyPart
              handleChooseSpot={(e) => handleChooseSpot(e, 'FLH')}
              className="absolute z-10 w-[21px] h-[20px] top-0 right-[86px] rounded-tr-full"
            />
            <BodyPart
              handleChooseSpot={(e) => handleChooseSpot(e, 'FLUB')}
              className="absolute z-10 w-[40px] h-[116px] top-[80px] right-[67px]"
            />
            <BodyPart
              handleChooseSpot={(e) => handleChooseSpot(e, 'FRUB')}
              className="absolute z-10 w-[40px] h-[116px]  top-[80px] left-[67px]"
            />
            <BodyPart
              handleChooseSpot={(e) => handleChooseSpot(e, 'FRHIP')}
              className="absolute z-10 w-[33px] h-[30px]  top-[196px] left-[64px]"
            />
            <BodyPart
              handleChooseSpot={(e) => handleChooseSpot(e, 'FLHIP')}
              className="absolute z-10 w-[33px] h-[30px]  top-[196px] right-[65px]"
            />
            <BodyPart
              handleChooseSpot={(e) => handleChooseSpot(e, 'FLUL')}
              className="absolute z-10 w-[45px] h-[74px]  top-[226px] right-[60px]"
            />
            <BodyPart
              handleChooseSpot={(e) => handleChooseSpot(e, 'FRUL')}
              className="absolute z-10 w-[45px] h-[74px]  top-[226px] left-[60px]"
            />
            <BodyPart
              handleChooseSpot={(e) => handleChooseSpot(e, 'FRK')}
              className="absolute z-10 w-[46px] h-[32px]  top-[300px] left-[56px]"
            />
            <BodyPart
              handleChooseSpot={(e) => handleChooseSpot(e, 'FLK')}
              className="absolute z-10 w-[46px] h-[32px]  top-[300px] right-[56px]"
            />
            <BodyPart
              handleChooseSpot={(e) => handleChooseSpot(e, 'FRLL')}
              className="absolute z-10 w-[33px] h-[70px]  top-[332px] left-[54px]"
            />
            <BodyPart
              handleChooseSpot={(e) => handleChooseSpot(e, 'FLLL')}
              className="absolute z-10 w-[33px] h-[70px]  top-[332px] right-[54px]"
            />
            <BodyPart
              handleChooseSpot={(e) => handleChooseSpot(e, 'FRF')}
              className="absolute z-10 w-[34px] h-[38px]  top-[402px] left-[46px]"
            />
            <BodyPart
              handleChooseSpot={(e) => handleChooseSpot(e, 'FLF')}
              className="absolute z-10 w-[34px] h-[38px] top-[402px] right-[46px]"
            />
            <BodyPart
              handleChooseSpot={(e) => handleChooseSpot(e, 'FRA')}
              className="absolute z-10 w-[30px] h-[183px]  top-[80px] left-[18px] rotate-[18deg] rounded-tr-[40px]"
            />
            <BodyPart
              handleChooseSpot={(e) => handleChooseSpot(e, 'FLA')}
              className="absolute z-10 w-[30px] h-[183px] top-[80px] right-[18px] -rotate-[18deg] rounded-tl-[40px]"
            />
          </div>
        ) : (
          // 16 parts of back body
          <div
            ref={parentRef}
            className="bg-back-body relative w-[214px] h-[440px] bg-no-repeat bg-center cursor-pointer duration-150"
          >
            {formValues.injuryArea && !formValues.isFront && (
              <InjurySpot
                spot={formValues.injuryPosition}
                level={scaleToNum(formValues.painLevel)}
              />
            )}
            <BodyPart
              handleChooseSpot={(e) => handleChooseSpot(e, 'BLH')}
              className="absolute z-10 w-[21px] h-[20px]  top-0 left-[86px] rounded-tl-full"
            />
            <BodyPart
              handleChooseSpot={(e) => handleChooseSpot(e, 'BRH')}
              className="absolute z-10 w-[21px] h-[20px] top-0 right-[86px] rounded-tr-full"
            />
            <BodyPart
              handleChooseSpot={(e) => handleChooseSpot(e, 'BRUB')}
              className="absolute z-10 w-[40px] h-[116px] top-[80px] right-[67px]"
            />
            <BodyPart
              handleChooseSpot={(e) => handleChooseSpot(e, 'BLUB')}
              className="absolute z-10 w-[40px] h-[116px]  top-[80px] left-[67px]"
            />
            <BodyPart
              handleChooseSpot={(e) => handleChooseSpot(e, 'BLHIP')}
              className="absolute z-10 w-[33px] h-[30px]  top-[196px] left-[64px]"
            />
            <BodyPart
              handleChooseSpot={(e) => handleChooseSpot(e, 'BRHIP')}
              className="absolute z-10 w-[33px] h-[30px]  top-[196px] right-[65px]"
            />
            <BodyPart
              handleChooseSpot={(e) => handleChooseSpot(e, 'BRUL')}
              className="absolute z-10 w-[45px] h-[74px]  top-[226px] right-[60px]"
            />
            <BodyPart
              handleChooseSpot={(e) => handleChooseSpot(e, 'BLUL')}
              className="absolute z-10 w-[45px] h-[74px]  top-[226px] left-[60px]"
            />
            <BodyPart
              handleChooseSpot={(e) => handleChooseSpot(e, 'BLK')}
              className="absolute z-10 w-[46px] h-[32px]  top-[300px] left-[56px]"
            />
            <BodyPart
              handleChooseSpot={(e) => handleChooseSpot(e, 'BRK')}
              className="absolute z-10 w-[46px] h-[32px]  top-[300px] right-[56px]"
            />
            <BodyPart
              handleChooseSpot={(e) => handleChooseSpot(e, 'BLLL')}
              className="absolute z-10 w-[33px] h-[70px]  top-[332px] left-[54px]"
            />
            <BodyPart
              handleChooseSpot={(e) => handleChooseSpot(e, 'BRLL')}
              className="absolute z-10 w-[33px] h-[70px]  top-[332px] right-[54px]"
            />
            <BodyPart
              handleChooseSpot={(e) => handleChooseSpot(e, 'BLF')}
              className="absolute z-10 w-[34px] h-[38px]  top-[402px] left-[46px]"
            />
            <BodyPart
              handleChooseSpot={(e) => handleChooseSpot(e, 'BRF')}
              className="absolute z-10 w-[34px] h-[38px] top-[402px] right-[46px]"
            />
            <BodyPart
              handleChooseSpot={(e) => handleChooseSpot(e, 'BLA')}
              className="absolute z-10 w-[30px] h-[183px]  top-[80px] left-[18px] rotate-[18deg] rounded-tr-[40px]"
            />
            <BodyPart
              handleChooseSpot={(e) => handleChooseSpot(e, 'BRA')}
              className="absolute z-10 w-[30px] h-[183px] top-[80px] right-[18px] -rotate-[18deg] rounded-tl-[40px]"
            />
          </div>
        )}
        <div className="w-full space-y-9">
          <MyTextArea
            value={formValues.description}
            onChange={(e) =>
              setFormValues((prev) => ({
                ...prev,
                description: e.target.value,
              }))
            }
            placeholder="Injury description (Describe your injury in text)"
          />
          <MySlider
            label="Pain level"
            onChange={(e) =>
              setFormValues((prev) => ({ ...prev, painLevel: numToScale(e) }))
            }
            isScale
            step={25}
            value={scaleToNum(formValues.painLevel)}
            labelClass="text-[#A2A5AD]"
          />
          <MyTextArea
            value={formValues.treatment}
            placeholder="Injury treatment (Describe your rehab and how you treat your injury)"
            onChange={(e) =>
              setFormValues((prev) => ({ ...prev, treatment: e.target.value }))
            }
          />
          <MyInputChips
            label="Injury tags"
            labelClass="text-[#A2A5AD]"
            value={formValues.injuryTags}
            setTags={(e) =>
              setFormValues((prev) => ({ ...prev, injuryTags: e }))
            }
          />
        </div>
      </div>
      <ModalMui isOpen={isOpenModal} onClose={setIsOpenModal}>
        <div className="flex flex-col items-center">
          <p className="text-[26px] font-medium mb-[25px]">Delete injury</p>
          <p className="text-[16px] font-bold mb-[10px]">
            Are you sure you want to delete this?
          </p>
          <p className="text-[16px] font-normal mb-[15px]">
            Your data will forever lost!
          </p>
          <div className="flex justify-between mt-[20px] space-x-8">
            <MyButton
              type="button"
              label="Cancel"
              onClick={() => setIsOpenModal(false)}
            />
            <Button
              type="button"
              loadingColor="#09E099"
              className="border-2 border-[#09E099] px-[61px]  py-[9px] rounded-[8px]"
              labelClass="text-[#09E099]"
              onClick={handleDeleteInjury}
              label="Delete"
              isLoading={isDeleting}
            />
          </div>
        </div>
      </ModalMui>
      <div className="flex space-x-5">
        <Button
          type="submit"
          label="Update injury"
          isLoading={isUpdating}
          onClick={handleUpdateInjury}
          className="bg-[#4654EA] px-[45px] py-[11px] rounded-[8px]"
        />
        <Button
          type="button"
          label="Delete injury"
          isLoading={isDeleting}
          onClick={() => setIsOpenModal(true)}
          className="bg-[#D60C0C] px-[45px] py-[11px] rounded-[8px]"
        />
      </div>
    </div>
  )
}
