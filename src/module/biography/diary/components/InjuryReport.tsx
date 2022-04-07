import { Snackbar } from '@mui/material'
import useMouse from '@react-hook/mouse-position'
import { useAtom } from 'jotai'
import { useEffect, useRef, useState } from 'react'
import { diaryAtom } from 'src/atoms/diaryAtoms'
import { MyInputChips } from 'src/components'
import { MySlider } from 'src/components/MySlider'
import { MyTextArea } from 'src/components/MyTextarea'
import {
  BODY_PART,
  InjuryType,
  PointsType,
  SPOT_KEY,
} from 'src/constants/types/diary.types'
import { numToScale, scaleToNum } from 'src/hooks/functionCommon'
import { BodyPart } from './BodyPart'
import { BooleanOption } from './BooleanOption'
import { InjurySpot } from './InjurySpot'

type InjuryReportProps = {
  onChange?: (value: InjuryType) => void
  diaryUpdate?: any
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

export const InjuryReport = ({ onChange, diaryUpdate }: InjuryReportProps) => {
  const [diary] = useAtom(diaryAtom)
  const parentRef = useRef(null)
  const mouse = useMouse(parentRef, {
    enterDelay: 100,
    leaveDelay: 100,
  })

  const [alert, setAlert] = useState({
    isOpen: false,
    message: '',
  })
  const [side, setSide] = useState<boolean>(true)
  const [response, setResponse] = useState<InjuryType[]>([])
  const [formValues, setFormValues] = useState<InjuryType>(INITIAL_FORM)
  const [spot, setSpot] = useState<PointsType>({
    x: null,
    y: null,
    name: '',
  })

  const handleChooseSpot = (
    e: React.MouseEvent<HTMLDivElement>,
    key: SPOT_KEY
  ) => {
    handleAlert(key)
    setSpot((prev) => ({
      ...prev,
      x: e.nativeEvent.offsetX,
      y: e.nativeEvent.offsetY,
      name: key,
    }))
  }

  const handleAlert = (key: SPOT_KEY) => {
    setAlert((prev) => ({
      ...prev,
      isOpen: true,
      message: `Hey, you’ve click on ${BODY_PART[key].injuryName}`,
    }))
    setTimeout(() => {
      setAlert((prev) => ({ ...prev, isOpen: false, message: '' }))
    }, 2000)
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
    onChange && onChange(formValues)
  }, [JSON.stringify(formValues)])

  useEffect(() => {
    setFormValues(INITIAL_FORM)
    diary.injuries && setResponse(diary.injuries)
  }, [JSON.stringify(diary.injuries), JSON.stringify(diaryUpdate)])

  return (
    <div>
      <BooleanOption
        label="Point the mark where your pain is"
        first="Front"
        second="Back"
        value={side}
        onChange={setSide}
      />
      <div className="flex flex-col items-center space-y-9 my-9">
        {side ? (
          // 16 parts of front body
          <div
            ref={parentRef}
            className="bg-front-body  relative w-[214px] h-[440px] bg-no-repeat bg-center cursor-pointer duration-150"
          >
            {formValues.injuryArea && (
              <InjurySpot
                isDeletable
                level={scaleToNum(formValues.painLevel)}
                spot={formValues.injuryPosition}
                handleDeleteSpot={() =>
                  setFormValues((prev) => ({
                    ...prev,
                    injuryPosition: { x: null, y: null },
                    injuryArea: '',
                  }))
                }
              />
            )}
            {(response || []).map((injury, index) => (
              <>
                {injury.isFront && (
                  <InjurySpot
                    level={scaleToNum(injury.painLevel)}
                    spot={injury.injuryPosition}
                    key={index}
                  />
                )}
              </>
            ))}
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
            {formValues.injuryArea && (
              <InjurySpot
                spot={formValues.injuryPosition}
                level={scaleToNum(formValues.painLevel)}
              />
            )}
            {(response || []).map((injury, index) => (
              <>
                {!injury.isFront && (
                  <InjurySpot
                    level={scaleToNum(injury.painLevel)}
                    spot={injury.injuryPosition}
                    key={index}
                  />
                )}
              </>
            ))}
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
        <Snackbar
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
          open={alert.isOpen}
          onClose={() =>
            setAlert((prev) => ({ ...prev, isOpen: false, message: '' }))
          }
          message={alert.message}
        />
      </div>
    </div>
  )
}
