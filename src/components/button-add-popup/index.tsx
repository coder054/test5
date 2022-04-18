import { useRouter } from 'next/router'
import { useState } from 'react'
import { ButtonAdd } from 'src/components/ButtonAdd'
import { PopupAdd } from 'src/components/popup-add'

export const ButtonAddPopup = () => {
  const [add, setAdd] = useState<boolean>(true)
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
                  router.push('/development')
                }}
              >
                <p className="ml-[12px]">Development update</p>
              </div>
              <div className="w-full h-[36px] cursor-pointer hover:bg-[#64748B] flex justify-between items-center ">
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
    </div>
  )
}
