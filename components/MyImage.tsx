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
  let classNameWidth = 'w-[' + width + ']px'
  let classNameHeght = 'h-[' + height + ']px'
  return (
    <div
      className={clsx(
        `relative flex-shrink-0 overflow-hidden`,
        className,
        classNameWidth,
        classNameHeght
      )}
    >
      <Image src={src} alt="" width={width} height={height} />
    </div>
  )
}
