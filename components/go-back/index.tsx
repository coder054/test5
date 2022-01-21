import clsx from 'clsx'
import { IconArrowBack } from 'imports/svgs'
import { useRouter } from 'next/router'

interface GoBackProps {
  label?: string
  className?: string
  goBack?: string
}

export const GoBack = ({ label, className, goBack }: GoBackProps) => {
  const router = useRouter()
  const styles = clsx(className && className)

  return (
    <div className={`${(clsx(styles), 'float-left')}`}>
      <div
        className="float-left cursor-pointer"
        onClick={() => {
          goBack && router.push(goBack)
        }}
      >
        <IconArrowBack />
      </div>
      <span className="ml-[13px] text-[#FFFFFF] text-base float-left">
        {label}
      </span>
    </div>
  )
}
