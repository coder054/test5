import clsx from 'clsx'
import React, { Fragment, useEffect, useState } from 'react'
import { FloatingAdd, FloatingRemove } from 'src/components/icons'

type FloatingButtonProps = {
  children: React.ReactElement
  onClose?: boolean
}

export default function FloatingButton({
  children,
  onClose,
}: FloatingButtonProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  useEffect(() => {
    onClose && setIsOpen(false)
  }, [onClose])

  return (
    <Fragment>
      {isOpen ? (
        <button
          onClick={() => setIsOpen(false)}
          className={clsx(
            'active:scale-90 duration-150 fixed bottom-5 right-5 '
          )}
        >
          <span className="relative">
            <div
              className={clsx(
                'absolute text-left w-[246px] bg-[#13161A] border-2 border-gray-600 rounded-lg -bottom-11 -left-52 py-1.5 '
              )}
            >
              {children}
            </div>
            <FloatingRemove />
          </span>
        </button>
      ) : (
        <button className="active:scale-90 duration-150 fixed bottom-5 right-5 hover:opacity-90">
          <FloatingAdd onClick={() => setIsOpen(true)} />
        </button>
      )}
    </Fragment>
  )
}
