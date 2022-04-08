import { SvgCloseAdd } from 'src/imports/svgs'

interface PopupAddProps {
  children?: any
}

export const PopupAdd = ({ children }: PopupAddProps) => {
  return (
    <div className="fixed right-[25px] bottom-[36px] ">
      <div className="w-full h-full relative">
        <div className="w-[231px] absolute bottom-[35px] right-[24px] rounded-[7px] border-[1px] border-[#484A4D] z-10">
          {children}
        </div>
        <div className="absolute z-20 w-[56px] h-[56px] bottom-[6px] right-[0px] cursor-pointer rounded-full flex justify-between items-center bg-[#1E1F24]">
          <div className="mx-auto mt-[8px]">
            <SvgCloseAdd />
          </div>
        </div>
      </div>
    </div>
  )
}
