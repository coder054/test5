import clsx from 'clsx'

export const Stars = ({
  svgStarFull,
  svgStarHalf,
  svgStarEmpty,
  gap,
  numberOfStars,
  className,
}: {
  svgStarFull: any
  svgStarHalf: any
  svgStarEmpty: any
  gap: number
  numberOfStars: number
  className: string
}) => {
  const content = () => {
    switch (Math.round(numberOfStars * 2) / 2) {
      case 0:
        return (
          <>
            {svgStarEmpty}
            {svgStarEmpty}
            {svgStarEmpty}
            {svgStarEmpty}
            {svgStarEmpty}
          </>
        )

      case 0.5:
        return (
          <>
            {svgStarHalf}
            {svgStarEmpty}
            {svgStarEmpty}
            {svgStarEmpty}
            {svgStarEmpty}
          </>
        )

      case 1:
        return (
          <>
            {svgStarFull}
            {svgStarEmpty}
            {svgStarEmpty}
            {svgStarEmpty}
            {svgStarEmpty}
          </>
        )

      case 1.5:
        return (
          <>
            {svgStarFull}
            {svgStarHalf}
            {svgStarEmpty}
            {svgStarEmpty}
            {svgStarEmpty}
          </>
        )

      case 2:
        return (
          <>
            {svgStarFull}
            {svgStarFull}
            {svgStarEmpty}
            {svgStarEmpty}
            {svgStarEmpty}
          </>
        )

      case 2.5:
        return (
          <>
            {svgStarFull}
            {svgStarFull}
            {svgStarHalf}
            {svgStarEmpty}
            {svgStarEmpty}
          </>
        )

      case 3:
        return (
          <>
            {svgStarFull}
            {svgStarFull}
            {svgStarFull}
            {svgStarEmpty}
            {svgStarEmpty}
          </>
        )

      case 3.5:
        return (
          <>
            {svgStarFull}
            {svgStarFull}
            {svgStarFull}
            {svgStarHalf}
            {svgStarEmpty}
          </>
        )

      case 4:
        return (
          <>
            {svgStarFull}
            {svgStarFull}
            {svgStarFull}
            {svgStarFull}
            {svgStarEmpty}
          </>
        )

      case 4.5:
        return (
          <>
            {svgStarFull}
            {svgStarFull}
            {svgStarFull}
            {svgStarFull}
            {svgStarHalf}
          </>
        )

      case 5:
        return (
          <>
            {svgStarFull}
            {svgStarFull}
            {svgStarFull}
            {svgStarFull}
            {svgStarFull}
          </>
        )

      default:
        return (
          <>
            {svgStarFull}
            {svgStarFull}
            {svgStarFull}
            {svgStarFull}
            {svgStarFull}
          </>
        )
    }
  }
  return <div className={clsx(` flex `, className)}>{content()}</div>
}
