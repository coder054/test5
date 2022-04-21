import React, { ReactElement } from 'react'
import { Button } from 'src/components/Button'
import { TrashCanIcon, XIcon } from 'src/components/icons'
import { ModalMui } from 'src/components/ModalMui'
import clsx from 'clsx'

interface ConfirmModalProps {
  label: string
  content: string
  icon: ReactElement
  actionLabel: string
  isOpen: boolean
  onClose: (value: boolean) => void
  isLoading?: boolean
  onSubmit: () => void
  actionLabelClass?: string
}

export default function ConfirmModal({
  icon,
  label,
  isOpen,
  content,
  onClose,
  onSubmit,
  isLoading,
  actionLabel,
  actionLabelClass,
}: ConfirmModalProps) {
  return (
    <ModalMui sx={{ width: 600 }} isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col items-center p-2 relative">
        <button
          type="button"
          onClick={() => onClose(false)}
          className="absolute top-0 right-0"
        >
          <XIcon />
        </button>
        <div className="flex flex-col items-center space-y-8 w-full">
          {icon}
          <p className="text-[26px] font-medium">{label}</p>
          <p className="text-[16px] font-normal">{content}</p>
          <div className="flex space-x-4 w-full">
            <Button
              type="button"
              label="Cancel"
              onClick={() => onClose(false)}
              className="py-3 block w-full rounded-lg bg-[#4654EA]"
            />
            <Button
              type="submit"
              label={actionLabel}
              isLoading={isLoading}
              onClick={() => onSubmit()}
              className={clsx(
                'py-3 block w-full rounded-lg ',
                actionLabelClass ? actionLabelClass : 'bg-[#D60C0C]'
              )}
            />
          </div>
        </div>
      </div>
    </ModalMui>
  )
}
