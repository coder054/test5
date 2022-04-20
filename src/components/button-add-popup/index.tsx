import { useRouter } from 'next/router'
import { useState } from 'react'
import { isMobile } from 'react-device-detect'
import SimpleBar from 'simplebar-react'
import { ButtonAdd } from 'src/components/ButtonAdd'
import { PopupAdd } from 'src/components/popup-add'
import { GoalModal } from 'src/modules/dashboard/development-dashboard/component/modal/goal-modal'
import { NoteModal } from 'src/modules/dashboard/development-dashboard/component/modal/note-modal'
import { ModalMui } from '../ModalMui'

interface ButtonAddPopupProps {}

export const ButtonAddPopup = () => {
  const [add, setAdd] = useState<boolean>(true)
  const [openModalGoal, setOpenModalGoal] = useState<boolean>(false)
  const [openModalNote, setOpenModalNote] = useState<boolean>(false)
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
            <div className="w-full h-full bg-[#13161A] rounded-[7px]">
              <div className="w-full h-[36px] cursor-pointer hover:bg-[#64748B] flex justify-between items-center">
                <p className="ml-[12px]">Diary update</p>
              </div>
              <div className="w-full h-[36px] cursor-pointer hover:bg-[#64748B] flex justify-between items-center ">
                <p className="ml-[32px]">- Training update</p>
              </div>
              <div className="w-full h-[36px] cursor-pointer hover:bg-[#64748B] flex justify-between items-center ">
                <p className="ml-[32px]">- Match update</p>
              </div>
              <div
                className="w-full h-[36px] cursor-pointer hover:bg-[#64748B] flex justify-between items-center "
                onClick={() => {
                  setOpenModalNote(true)
                }}
              >
                <p className="ml-[12px]">Development update</p>
              </div>
              <div
                className="w-full h-[36px] cursor-pointer hover:bg-[#64748B] flex justify-between items-center "
                onClick={() => {
                  setOpenModalGoal(true)
                }}
              >
                <p className="ml-[12px]">Goal update</p>
              </div>
              <div className="w-full h-[36px] cursor-pointer hover:bg-[#64748B] flex justify-between items-center ">
                <p className="ml-[12px]">Height & Weight update</p>
              </div>
              <div className="w-full h-[36px] cursor-pointer hover:bg-[#64748B] flex justify-between items-center ">
                <p className="ml-[12px]">Health update</p>
              </div>
            </div>
          </PopupAdd>
        </div>
      )}
      <ModalMui
        sx={{
          padding: 0,
          top: '50%',
          width: isMobile ? '100%' : 700,
          overflow: 'auto',
        }}
        isOpen={openModalGoal}
        onClose={setOpenModalGoal}
      >
        <SimpleBar style={{ maxHeight: 850 }}>
          <GoalModal setIsOpenModal={setOpenModalGoal} create />
        </SimpleBar>
      </ModalMui>

      <ModalMui
        sx={{
          padding: 0,
          top: '50%',
          width: isMobile ? '100%' : 700,
          overflow: 'auto',
        }}
        isOpen={openModalNote}
        onClose={setOpenModalNote}
      >
        <SimpleBar style={{ maxHeight: 850 }}>
          <NoteModal setIsOpenModal={setOpenModalNote} create />
        </SimpleBar>
      </ModalMui>
    </div>
  )
}
