import clsx from 'clsx'
import Image from 'next/image'

export const MyImage = ({
  width,
  height,
  src,
  className,
}: {
  width: number
  height: number
  src: string
  className: string
}) => {
  return (
    <div
      className={clsx(
        `relative flex-shrink-0 overflow-hidden`,
        `w-[${width}px]`,
        `h-[${height}px]`,
        className
      )}
    >
      <Image src={src} alt="" layout="fill" />
    </div>
  )
}
