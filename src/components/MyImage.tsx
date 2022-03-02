import clsx from 'clsx'
import Image from 'next/image'
import { ReactEventHandler } from 'react'

export const MyImage = ({
  src,
  className,
  onClick,
}: {
  src: any
  className: string
  onClick?: ReactEventHandler
}) => {
  return (
    <div onClick={onClick} className={clsx(`relative`, className)}>
      <Image
        src={src}
        alt=""
        layout="fill" // required
        objectFit="cover"
      />
    </div>
  )
}
