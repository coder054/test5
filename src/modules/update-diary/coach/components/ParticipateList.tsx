import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace'
import { Skeleton } from '@mui/material'
import React, { Fragment, useEffect, useState } from 'react'
import { isMobile } from 'react-device-detect'
import { useInView } from 'react-intersection-observer'
import { useInfiniteQuery } from 'react-query'
import { MiniLoading } from 'src/components/mini-loading'
import { ModalMui } from 'src/components/ModalMui'
import { QUERIES_DIARY } from 'src/constants/query-keys/query-keys.constants'
import { ParticipateType, TypeOfDiaries } from 'src/constants/types/diary.types'
import { fetchParticipate } from 'src/service/diary-update'
import ParticipateItem from './ParticipateItem'
import BlockIcon from '@mui/icons-material/Block'
import { useAtom } from 'jotai'
import { COACH_DIARY_ATOM } from 'src/atoms/diaryAtoms'

interface ParticipateList {
  isOpen: boolean
  date: Date | string
  onClose: (value: boolean) => void
  currentTab: TypeOfDiaries | string
}

export default function ParticipateList({
  date,
  currentTab,
  onClose,
  isOpen,
}: ParticipateList) {
  const { ref, inView } = useInView()
  const [queries] = useState({
    limit: 10,
    startAfter: 1,
    sorted: 'asc',
  })
  const [, setSelectedParticipate] = useAtom(COACH_DIARY_ATOM)

  const { data, isFetchingNextPage, fetchNextPage, isLoading } =
    useInfiniteQuery(
      [QUERIES_DIARY[currentTab], date],
      async ({ pageParam = 1 }) => {
        const res = await fetchParticipate({
          ...queries,
          createdAt: date,
          startAfter: pageParam,
          typeOfDiary: currentTab,
        })
        return res.data
      },
      {
        getNextPageParam: (lastPage, page) => {
          if (lastPage.length < queries.limit) {
            return undefined
          } else {
            return page.length + 1
          }
        },
      }
    )

  useEffect(() => {
    if (inView) {
      fetchNextPage()
    }
  }, [inView])

  return (
    <ModalMui
      sx={{
        p: { xl: 0, xs: 0 },
        top: '50%',
        width: isMobile ? '100%' : 800,
        height: isMobile ? '100%' : 'auto',
        overflow: 'auto',
      }}
      isOpen={isOpen}
      onClose={onClose}
      hideBackdrop
    >
      <div className="tabletM:h-[850px] overflow-y-auto tabletM:p-8 mobileM:py-2 mobileM:pb-24">
        <button
          className="flex items-center space-x-2 text-gray-400  hover:text-white duration-150"
          onClick={() => onClose(false)}
        >
          <KeyboardBackspaceIcon className="text-inherit" />
          <span className="text-lg font-semibold underline ">Diary update</span>
        </button>
        <div className="py-6 space-y-6">
          <p className="text-[24px] font-medium">
            Choose what Team activities you participated in
          </p>

          {isLoading ? (
            <Fragment>
              {Array(6)
                .fill(0)
                .map(() => ({}))
                .map((_, index) => (
                  <div
                    key={index}
                    className="h-[80px] bg-[#121212] p-4 rounded-lg"
                  >
                    <Skeleton className="w-2/5" />
                    <Skeleton />
                  </div>
                ))}
            </Fragment>
          ) : (
            <Fragment>
              <button
                onClick={() => {
                  /* @ts-ignore */
                  setSelectedParticipate(undefined)
                  onClose(false)
                }}
                className="bg-black border-2 border-transparent hover:border-gray-500 active:bg-gray-600 active:text-gray-300 duration-150 text-gray-400 text-base font-medium h-[86px] w-full rounded-lg"
              >
                None <BlockIcon className="text-lg" />
              </button>
              {(data?.pages || []).map((page, index) => (
                <Fragment key={index}>
                  {page.map((item: ParticipateType) => (
                    <ParticipateItem
                      value={item}
                      currentTab={currentTab}
                      key={item.originalDiaryId}
                    />
                  ))}
                </Fragment>
              ))}
              <p
                className="flex justify-center py-2 font-semibold text-[16px]"
                ref={ref}
              >
                {isFetchingNextPage && (
                  <MiniLoading color="#09E099" size={18} />
                )}
              </p>
            </Fragment>
          )}
        </div>
      </div>
    </ModalMui>
  )
}
