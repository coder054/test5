import { SnackbarOrigin } from '@mui/material/Snackbar'
import useMouse from '@react-hook/mouse-position'
import { useAtom } from 'jotai'
import { useEffect, useRef, useState } from 'react'
import { Slide, toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
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
import { scaleToNum } from 'src/hooks/functionCommon'
import { BodyPart } from './BodyPart'
import { BooleanOption } from './BooleanOption'
import { InjurySpot } from './InjurySpot'
export interface State extends SnackbarOrigin {
  open: boolean
}

type InjuryReportProps = {
  onChange?: (value: PointsType) => void
}

export const InjuryReport = ({ onChange }: InjuryReportProps) => {
  const [diary] = useAtom(diaryAtom)

  const [tags, setTags] = useState<string[]>([])
  const [side, setSide] = useState<boolean>(true)
  const [painLevel, setPainLevel] = useState<number>(0)
  const parentRef = useRef(null)
  const mouse = useMouse(parentRef, {
    enterDelay: 100,
    leaveDelay: 100,
  })

  const [response, setResponse] = useState<InjuryType[]>([])
  const [overallSpot, setOverallSpot] = useState<PointsType>({
    x: null,
    y: null,
    name: '',
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

  useEffect(() => {
    setOverallSpot((prev) => ({
      ...prev,
      x: mouse.x,
      y: mouse.y,
      name: spot.name,
    }))
  }, [JSON.stringify(spot)])

  useEffect(() => {
    onChange && onChange(overallSpot)
  }, [JSON.stringify(overallSpot)])

  useEffect(() => {
    setResponse(diary.injuries)
  }, [JSON.stringify(diary.injuries)])

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
        <ToastContainer transition={Slide} limit={0} />
        {side ? (
          // 16 parts of front body
          <div
            ref={parentRef}
            className="bg-front-body  relative w-[214px] h-[440px] bg-no-repeat bg-center cursor-pointer duration-150"
          >
            {overallSpot.name && (
              <InjurySpot
                isDeletable
                level={painLevel}
                spot={overallSpot}
                handleDeleteSpot={() =>
                  setOverallSpot({
                    x: null,
                    y: null,
                    name: '',
                  })
                }
              />
            )}
            {(response || []).map((injury) => (
              <InjurySpot
                level={scaleToNum(injury.painLevel)}
                spot={injury.injuryPosition}
                handleDeleteSpot={() =>
                  setOverallSpot({
                    x: null,
                    y: null,
                    name: '',
                  })
                }
              />
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
            {overallSpot.name && (
              <InjurySpot spot={overallSpot} level={painLevel} />
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
          <MyTextArea placeholder="Injury description (Describe your injury in text)" />
          <MySlider
            label="Pain level"
            onChange={(e) => setPainLevel(e)}
            isScale
            step={25}
            value={painLevel}
            labelClass="text-[#A2A5AD]"
          />
          <MyTextArea placeholder="Injury treatment (Describe your rehab and how you treat your injury)" />
          <MyInputChips
            label="Injury tags"
            labelClass="text-[#A2A5AD]"
            value={tags}
            setTags={setTags}
          />
          {/* <InjuryList /> */}
        </div>
      </div>
    </div>
  )
}
