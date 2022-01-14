import clsx from 'clsx'
import Image from 'next/image'

export const MyImage = ({
  src,
  className,
}: {
  src: string | StaticImageData
  className: string
}) => {
  return (
    <div className={clsx(`relative`, className)}>
      <Image
        src={src}
        alt=""
        layout="fill" // required
        objectFit="cover"
      />
    </div>
  )
}
