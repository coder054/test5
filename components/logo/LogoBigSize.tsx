import cls from './styles.module.css'

export const LogoBigSize = ({ className }: { className?: string }) => {
  return (
    <div
      className={`${cls.bigLogo} ${className} w-[200px] mobileM:w-[240px] lg:w-[386.7px] h-[44px] mobileM:h-[54px] lg:h-[87px]`}
    ></div>
  )
}
