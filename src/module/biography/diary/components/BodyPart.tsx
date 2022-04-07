type BodyPartProps = {
  handleChooseSpot?: (e: React.MouseEvent<HTMLDivElement>) => void
  className?: string
}

export const BodyPart = ({ className, handleChooseSpot }: BodyPartProps) => {
  return <div onClick={handleChooseSpot} className={className}></div>
}
