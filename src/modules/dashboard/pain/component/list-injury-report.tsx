import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import { isMobile } from 'react-device-detect'
import SimpleBar from 'simplebar-react'
import { ModalMui } from 'src/components/ModalMui'
import { COLOR_DIARY } from 'src/constants/mocks/colors.constants'
import { InjuryReportType } from 'src/constants/types/dashboard/pain.types'
import { ChevronRight } from 'src/icons/chevron-right'
import { SvgAbove, SvgBelow } from 'src/imports/svgs'
import { getListInjuryReport } from 'src/service/dashboard/pain.service'
import { PainModal } from './modal-injury'

interface ListInjuryReportProp {}

export const ListInjuryReport = () => {
  const [limit, setLimit] = useState<number>(10)
  const [startAfter, setStartAfter] = useState<number>(null)
  const [sorted, setSorted] = useState<string>('desc')
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false)
  const [checkUpdate, setCheckUpdate] = useState<boolean>(false)
  const [items, setItems] = useState<InjuryReportType[]>([
    {
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
    },
  ])
  const [pain, setPain] = useState<InjuryReportType>({
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

  useEffect(() => {
    getListInjuryReport({
      limit: limit,
      startAfter: startAfter,
      sorted: sorted,
    }).then((res) => {
      if (res.status === 200) {
        setItems(res.data)
      }
    })
  }, [limit, startAfter, sorted, checkUpdate])

  const handleChangeShow = () => {
    if (sorted === 'asc') {
      setSorted('desc')
    } else {
      setSorted('asc')
    }
  }

  const handleOnClick = (item: InjuryReportType) => {
    setPain(item && item)
    setIsOpenModal(true)
  }

  const displayShow = (str: string, right: boolean): any => {
    if (str === 'N/A' && str) {
      return (
        <p
          className={`col-span-3 ${right ? 'flex justify-between' : ''}`}
          style={{
            color: '#A2A5AD',
          }}
        >
          N/A
          {right && <ChevronRight />}
        </p>
      )
    } else if (str && str !== 'N/A') {
      return (
        <p
          className={`col-span-3 ${right ? 'flex justify-between' : ''}`}
          style={{
            color: COLOR_DIARY[str].color,
          }}
        >
          {COLOR_DIARY[str].label}
          {right && (
            <div className="float-right">
              <ChevronRight />
            </div>
          )}
        </p>
      )
    }
  }

  return (
    <div>
      <div className="bg-[#13161A] text-[#A2A5AD] w-full h-[34px] grid grid-cols-12 items-center">
        <p className="cursor-pointer col-span-2" onClick={handleChangeShow}>
          <span className="ml-[12px] float-left">Date</span>{' '}
          <div className="mt-[3px]">
            {sorted === 'asc' ? <SvgAbove /> : <SvgBelow />}
          </div>
        </p>
        <p className="col-span-3">Area</p>
        <p className="col-span-3">Pain level</p>
        <p className="col-span-4">Tag</p>
      </div>
      <SimpleBar style={{ maxHeight: 350 }}>
        {items &&
          items.map((item, index) => (
            <div
              key={index}
              className="h-[44px] grid grid-cols-12 text-[12px] md:text-[14px] items-center cursor-pointer hover:bg-gray-500"
              onClick={() => handleOnClick(item)}
            >
              <p className="md:pl-[12px] col-span-2">
                {dayjs(item?.createdAt).format('DD/MM')}
              </p>
              <p className="col-span-3">{item.injuryArea}</p>
              {displayShow(item.painLevel, false)}
              <div className="col-span-4">
                {item.injuryTags &&
                  item.injuryTags.map((tag) => <span>{tag}</span>)}
                <div className="float-right">
                  <ChevronRight />
                </div>
              </div>
            </div>
          ))}
      </SimpleBar>
      <ModalMui
        sx={{
          padding: 0,
          top: '50%',
          width: isMobile ? '100%' : 700,
          overflow: 'auto',
        }}
        isOpen={isOpenModal}
        onClose={setIsOpenModal}
      >
        <SimpleBar style={{ maxHeight: 850 }}>
          <PainModal
            setIsOpenModal={setIsOpenModal}
            item={pain && pain}
            update
            setCheckUpdate={setCheckUpdate}
          />
        </SimpleBar>
      </ModalMui>
    </div>
  )
}
