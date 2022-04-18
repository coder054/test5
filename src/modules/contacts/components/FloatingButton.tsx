import React, { Fragment, useState } from 'react'
import { FloatingAdd, FloatingRemove } from 'src/components/icons'

type FloatingButtonProps = {
  children: React.ReactElement
}

export default function FloatingButton({ children }: FloatingButtonProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  return (
    <Fragment>
      {isOpen ? (
        <button
          onClick={() => setIsOpen(false)}
          className="active:scale-90 duration-150 fixed bottom-5 right-5"
        >
          <span className="relative">
            <div className="absolute text-left w-[246px] bg-[#13161A] border-2 border-gray-600 rounded-lg -top-20 -left-52 py-1.5 ">
              {children}
            </div>
            <FloatingRemove />
          </span>
        </button>
      ) : (
        <button className="active:scale-90 duration-150 fixed bottom-5 right-5">
          <FloatingAdd onClick={() => setIsOpen(true)} />
        </button>
      )}
    </Fragment>
  )
}
