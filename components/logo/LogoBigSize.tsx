import cls from './styles.module.css'

export const LogoBigSize = ({ className }: { className?: string }) => {
  return (
    <div
      className={`${cls.bigLogo} ${className} w-[386.7px] h-[87px] ml-[12%]`}
    ></div>
  )
}
