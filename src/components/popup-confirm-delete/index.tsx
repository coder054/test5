import { MyButton } from '../MyButton'
import { Button } from 'src/components/Button'
import { useState } from 'react'

interface PopupConfirmDeleteProps {
  handleCancel?: () => void
  setIsOpenModal?: (value: boolean) => void
  handleConfirmDelete?: () => void
}

export const PopupConfirmDelete = ({
  handleCancel,
  handleConfirmDelete,
  setIsOpenModal,
}: PopupConfirmDeleteProps) => {
  const handleDeleteDiary = () => {
    handleConfirmDelete && handleConfirmDelete()
  }

  return (
    <div className="flex flex-col items-center">
      <p className="text-[26px] font-medium mb-[25px]">Delete Data</p>
      <p className="text-[16px] font-bold mb-[10px]">
        Are you sure you want to delete this?
      </p>
      <p className="text-[16px] font-normal mb-[15px]">
        Your data will forever lost!
      </p>
      <div className="flex justify-between mt-[20px] space-x-8">
        <MyButton
          type="button"
          label="Cancel"
          onClick={() => setIsOpenModal(false)}
        />
        <Button
          type="button"
          loadingColor="#09E099"
          className="border-2 border-[#09E099] px-[61px]  py-[9px] rounded-[8px]"
          labelClass="text-[#09E099]"
          onClick={handleDeleteDiary}
          label="Delete"
          // isLoading={isDeleting}
        />
      </div>
    </div>
  )
}
