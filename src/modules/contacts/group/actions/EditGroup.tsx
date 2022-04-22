import React, { useState } from 'react'
import { ModalMui } from 'src/components/ModalMui'

interface EditGroupProps {
  isClose: (value: string) => void
}

export default function EditGroup({ isClose }: EditGroupProps) {
  const [isOpen, setIsOpen] = useState<boolean>(true)

  return (
    <ModalMui isOpen={isOpen} onClose={setIsOpen}>
      <p>Edit Group</p>
    </ModalMui>
  )
}
