import dayjs from 'dayjs'
import { Fragment, ReactNode, useEffect, useState } from 'react'
import { isMobile } from 'react-device-detect'
import { useInView } from 'react-intersection-observer'
import { useInfiniteQuery } from 'react-query'
import SimpleBar from 'simplebar-react'
import { MiniLoading } from 'src/components/mini-loading'
import { ModalMui } from 'src/components/ModalMui'
import { ASC, DESC } from 'src/constants/constants'
import { COLOR_DIARY } from 'src/constants/mocks/colors.constants'
import { QUERIES_DASHBOARD } from 'src/constants/query-keys/query-keys.constants'
import { DevelopmentNoteType } from 'src/constants/types'
import { ChevronRight } from 'src/icons/chevron-right'
import { SvgAbove, SvgBelow } from 'src/imports/svgs'
import { getListDevelopmentNotes } from 'src/service/dashboard/development.service'
import { NoteModal } from './modal/note-modal'

export const ListDevelopment = () => {
  const { ref, inView } = useInView()
  const [limit, setLimit] = useState<number>(10)
  const [startAfter, setStartAfter] = useState<number>(null)
  const [sorted, setSorted] = useState<string>(DESC)
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false)
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

  const {
    isLoading: loading,
    data: dataNotes,
    isFetchingNextPage,
    fetchNextPage,
  } = useInfiniteQuery(
    [QUERIES_DASHBOARD.NOTE_DATA, limit, startAfter, sorted],
    async ({ pageParam = startAfter }) => {
      const res = await getListDevelopmentNotes(limit, pageParam, sorted)

      return res.data
    },
    {
      getNextPageParam: (lastPage) => {
        if (lastPage.length !== 0) {
          return lastPage[lastPage.length - 1].createdAt
        } else {
          return undefined
        }
      },
    }
  )

  useEffect(() => {
    if (inView) {
      fetchNextPage()
    }
  }, [inView])

  const handleChangeShow = () => {
    if (sorted === ASC) {
      setSorted(DESC)
    } else {
      setSorted(ASC)
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
            {sorted === ASC ? <SvgAbove /> : <SvgBelow />}
          </div>
        </p>
        <p className="col-span-5">You</p>
        <p className="col-span-5">Coach</p>
      </div>
      <SimpleBar style={{ maxHeight: 350 }}>
        {(dataNotes?.pages || []).map((page, indexNote) => (
          <Fragment key={indexNote}>
            {(page || []).map((item, index) => (
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
          </Fragment>
        ))}
        <p
          className="flex justify-center py-2 font-semibold text-[16px] h-[12px]"
          ref={ref}
        >
          {isFetchingNextPage ? (
            <MiniLoading color="#09E099" size={18} />
          ) : null}
        </p>
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
          />
        </SimpleBar>
      </ModalMui>
    </div>
  )
}
