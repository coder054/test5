import { ClickAwayListener } from '@mui/material'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { isMobile } from 'react-device-detect'
import SimpleBar from 'simplebar-react'
import { ButtonAdd } from 'src/components/ButtonAdd'
import { PopupAdd } from 'src/components/popup-add'
import { NoteModal } from 'src/modules/dashboard/development-dashboard/component/modal/note-modal'
import { HeightAndWeight } from 'src/modules/development/height-and-weight'
import { ModalFeed } from 'src/modules/feed/component/modal/modal-feed'
import DiaryUpdate from 'src/modules/update-diary'
import { XIcon } from '../icons'
import { ModalMui } from '../ModalMui'

interface ButtonAddFeedProps {}

export const ButtonAddFeed = () => {
  const [add, setAdd] = useState<boolean>(true)
  const [openModalFeed, setOpenModalFeed] = useState<boolean>(false)
  const [openModalDevelopmentNote, setOpenModalDevelopmentNote] =
    useState<boolean>(false)
  const [openModalHeightWeight, setOpenModalHeightWeight] =
    useState<boolean>(false)
  const [openModalDiaryUpdate, setOpenModalDiaryUpdate] =
    useState<boolean>(false)
  const router = useRouter()
  return (
    <div>
      {add ? (
        <div
          className=""
          onClick={() => {
            setAdd(false)
          }}
        >
          <ButtonAdd />
        </div>
      ) : (
        <div
          onClick={() => {
            setAdd(true)
          }}
        >
          <PopupAdd>
            <ClickAwayListener onClickAway={() => setAdd(true)}>
              <div className="w-full h-full bg-[#13161A] rounded-[7px]">
                <div
                  className="w-full h-[36px] cursor-pointer hover:rounded-[7px] hover:bg-[#64748B] flex justify-between items-center"
                  onClick={() => {
                    setOpenModalDiaryUpdate(true)
                  }}
                >
                  <p className="ml-[12px]">Diary update</p>
                </div>

                <div className="w-full h-[36px] cursor-pointer hover:rounded-[7px] hover:bg-[#64748B] flex justify-between items-center ">
                  <p className="ml-[32px]">- Training update</p>
                </div>

                <div className="w-full h-[36px] cursor-pointer hover:rounded-[7px] hover:bg-[#64748B] flex justify-between items-center ">
                  <p className="ml-[32px]">- Match update</p>
                </div>

                <div
                  className="w-full h-[36px] cursor-pointer hover:rounded-[7px] hover:bg-[#64748B] flex justify-between items-center "
                  onClick={() => {
                    router.push('/account-and-settings?type=health')
                  }}
                >
                  <p className="ml-[12px]">Height & Weight update</p>
                </div>

                <div
                  className="w-full h-[36px] cursor-pointer hover:rounded-[7px] hover:bg-[#64748B] flex justify-between items-center "
                  onClick={() => {
                    setOpenModalFeed(true)
                  }}
                >
                  <p className="ml-[12px]">Feed update</p>
                </div>

                <div
                  className="w-full h-[36px] cursor-pointer hover:rounded-[7px] hover:bg-[#64748B] flex justify-between items-center "
                  onClick={() => {
                    setOpenModalDevelopmentNote(true)
                  }}
                >
                  <p className="ml-[12px]">Development update</p>
                </div>
              </div>
            </ClickAwayListener>
          </PopupAdd>
        </div>
      )}

      <ModalMui
        sx={{
          padding: 0,
          top: '50%',
          width: isMobile ? '100%' : 720,
          overflow: 'auto',
        }}
        isOpen={openModalFeed}
        onClose={setOpenModalFeed}
      >
        <SimpleBar style={{ maxHeight: 850 }}>
          <ModalFeed setIsOpenModal={setOpenModalFeed} />
        </SimpleBar>
      </ModalMui>

      <ModalMui
        sx={{
          padding: 0,
          top: '50%',
          width: isMobile ? '100%' : 800,
          height: isMobile ? '100%' : 'auto',
          overflow: 'auto',
        }}
        isOpen={openModalDiaryUpdate}
        onClose={setOpenModalDiaryUpdate}
      >
        <div className="relative tabletM:h-[850px] mobileM:h-screen overflow-y-auto mobileM:py-2 mobileM:pb-24 tabletM:pb-0 tabletM:py-0">
          <button
            type="button"
            onClick={() => setOpenModalDiaryUpdate(false)}
            className="absolute z-50 right-6 top-5"
          >
            <XIcon />
          </button>
          <DiaryUpdate onClose={setOpenModalDiaryUpdate} />
        </div>
      </ModalMui>

      <ModalMui
        sx={{
          padding: 0,
          top: '50%',
          width: isMobile ? '100%' : 750,
          overflow: 'auto',
        }}
        isOpen={openModalDevelopmentNote}
        onClose={setOpenModalDevelopmentNote}
      >
        <SimpleBar style={{ maxHeight: 850 }}>
          <NoteModal setIsOpenModal={setOpenModalDevelopmentNote} create />
        </SimpleBar>
      </ModalMui>
    </div>
  )
}
