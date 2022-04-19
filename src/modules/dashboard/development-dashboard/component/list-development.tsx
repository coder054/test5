import dayjs from 'dayjs'
import { ReactNode, useEffect, useState } from 'react'
import { isMobile } from 'react-device-detect'
import SimpleBar from 'simplebar-react'
import { ModalMui } from 'src/components/ModalMui'
import { COLOR_DIARY } from 'src/constants/mocks/colors.constants'
import { DevelopmentNoteType } from 'src/constants/types'
import { ChevronRight } from 'src/icons/chevron-right'
import { SvgAbove, SvgBelow } from 'src/imports/svgs'
import { getListDevelopmentNotes } from 'src/service/dashboard/development.service'
import { NoteModal } from './modal/note-modal'

export const ListDevelopment = () => {
  const [limit, setLimit] = useState<number>(10)
  const [startAfter, setStartAfter] = useState<number>(null)
  const [sorted, setSorted] = useState<string>('desc')
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false)
  const [checkUpdate, setCheckUpdate] = useState<boolean>(false)
  const [items, setItems] = useState<DevelopmentNoteType[]>([
    {
      shortTermGoal: {
        coachComment: '',
        playerContent: '',
      },
      updatedAt: 0,
      strength: {
        playerContent: '',
        coachComment: '',
      },
      createdAt: 0,
      bestDevelopSkills: {
        coachComment: '',
        playerContent: '',
      },
      playerDevelopmentProgress: '',
      skillsNeededToDevelop: {
        coachComment: '',
        playerContent: '',
      },
      weaknesses: {
        playerContent: '',
        coachComment: '',
      },
      otherComments: {
        coachComment: '',
        playerContent: '',
      },
      bestWayToDevelop: {
        playerContent: '',
        coachComment: '',
      },
      playerId: '',
      longTermGoal: {
        playerContent: '',
        coachComment: '',
      },
      playerNotedAt: new Date(),
      coachDevelopmentProgress: '',
      devTalkId: '',
    },
  ])
  const [note, setNote] = useState<DevelopmentNoteType>({
    shortTermGoal: {
      coachComment: '',
      playerContent: '',
    },
    updatedAt: 0,
    strength: {
      playerContent: '',
      coachComment: '',
    },
    createdAt: 0,
    bestDevelopSkills: {
      coachComment: '',
      playerContent: '',
    },
    playerDevelopmentProgress: '',
    skillsNeededToDevelop: {
      coachComment: '',
      playerContent: '',
    },
    weaknesses: {
      playerContent: '',
      coachComment: '',
    },
    otherComments: {
      coachComment: '',
      playerContent: '',
    },
    bestWayToDevelop: {
      playerContent: '',
      coachComment: '',
    },
    playerId: '',
    longTermGoal: {
      playerContent: '',
      coachComment: '',
    },
    playerNotedAt: new Date(),
    coachDevelopmentProgress: '',
    devTalkId: '',
  })

  useEffect(() => {
    getListDevelopmentNotes(limit, startAfter, sorted).then((res) => {
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

  const displayShow = (str: string, right: boolean): any => {
    if (str === 'N/A' && str) {
      return (
        <p
          className={`col-span-5 ${right ? 'flex justify-between' : ''}`}
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
          className={`col-span-5 ${right ? 'flex justify-between' : ''}`}
          style={{
            color: COLOR_DIARY[str].color,
          }}
        >
          {COLOR_DIARY[str].label}
          {right && <ChevronRight />}
        </p>
      )
    }
  }

  const handleOnClick = (item: DevelopmentNoteType) => {
    setNote(item && item)
    setIsOpenModal(true)
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
        <p className="col-span-5">You</p>
        <p className="col-span-5">Coach</p>
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

              {displayShow(item.playerDevelopmentProgress, false)}

              {displayShow(item.coachDevelopmentProgress, true)}
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
          <NoteModal
            setIsOpenModal={setIsOpenModal}
            item={note && note}
            update
            setCheckUpdate={setCheckUpdate}
          />
        </SimpleBar>
      </ModalMui>
    </div>
  )
}
