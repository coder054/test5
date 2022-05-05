import dayjs from 'dayjs'
import { useState } from 'react'
import { isMobile } from 'react-device-detect'
import { Button } from 'src/components/Button'
import { XIcon } from 'src/components/icons'
import { ModalMui } from 'src/components/ModalMui'
import { FEED_YOURS } from 'src/constants/mocks/common.constants'
import { CardFeedType } from 'src/constants/types/feed/yours'
import DiaryUpdate from 'src/modules/update-diary'
import SimpleBar from 'simplebar-react'

interface RemainDiaryUpdateProps {
  card: CardFeedType
}

export const RemainDiaryUpdate = ({ card }: RemainDiaryUpdateProps) => {
  const [openModalDiary, setOpenModalDiary] = useState<boolean>(false)

  return (
    <div className="w-full pl-[24px] pr-[24px]">
      <div className="w-full flex">
        {card?.data &&
          card?.data.map((item, index) => (
            <div className="flex-1">
              <p className="text-[14px] text-center">
                {dayjs(item?.day).format('ddd')}
              </p>
              <div
                className={`w-[28px] h-[28px] rounded-full ${
                  item?.type ? 'bg-[#09E099]' : 'bg-[#dddada]'
                } border border-[#A2A5AD] flex justify-center items-center mt-[4px] mx-auto`}
              >
                <p className="text-[14px] text-black font-bold">
                  {dayjs(item?.day).format('D')}
                </p>
              </div>
              <p className="text-[12px] text-center mt-[10px]">
                {FEED_YOURS[item?.type || '']?.value}
              </p>
            </div>
          ))}
      </div>

      <p className="text-[22px] text-center mt-[32px]">{card?.content}</p>

      <Button
        onClick={() => {
          setOpenModalDiary(true)
        }}
        label="Diary update"
        className="w-full text-[16px] font-semibold bg-[#4654EA] h-[42px] rounded-[8px] mt-[24px]"
        type="button"
      />

      <ModalMui
        sx={{
          padding: 0,
          top: '50%',
          width: isMobile ? '100%' : 700,
          overflow: 'auto',
        }}
        isOpen={openModalDiary}
        onClose={setOpenModalDiary}
      >
        {/* @ts-ignore: Unreachable code error */}
        <SimpleBar style={{ maxHeight: 850 }}>
          <div className="relative">
            <button
              type="button"
              onClick={() => setOpenModalDiary(false)}
              className="absolute z-50 right-6 top-5"
            >
              <XIcon />
            </button>
            <DiaryUpdate />
          </div>
        </SimpleBar>
      </ModalMui>
    </div>
  )
}
