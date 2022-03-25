import clsx from 'clsx'
import { IconArrowBack } from 'src/imports/svgs'
import { useRouter } from 'next/router'

interface GoBackProps {
  label?: string
  className?: string
  goBack?: string
  textBlack?: boolean
}

export const GoBack = ({
  label,
  className,
  goBack,
  textBlack,
}: GoBackProps) => {
  const router = useRouter()
  const styles = clsx(className && className)

  return (
    <div
      onClick={() => {
        goBack && router.push(goBack)
      }}
      className={`${(clsx(styles), 'float-left px-4 py-2 cursor-pointer')}`}
    >
      <div className="float-left cursor-pointer">
        <IconArrowBack textBlack={textBlack} />
      </div>
      <span
        className={`ml-[13px] select-none ${
          textBlack ? 'text-[#1E1F24]' : 'text-[#FFFFFF]'
        } text-base float-left`}
      >
        {label}
      </span>
    </div>
  )
}
