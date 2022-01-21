import cls from './styles.module.css'

export const LogoLargeSize = ({ className }: { className?: string }) => {
  return (
    <div
      className={`${cls.largeLogo} ${className} w-[183px] h-[41.17px] ml-[12%]`}
    ></div>
  )
}
