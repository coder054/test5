import clsx from 'clsx'
import cls from './button-core.module.css'

interface ButtonProps {
  className: string
  type?: string
  placeholder?: string
  text?: string
}

export const Button = ({ className, text }: ButtonProps) => {
  const styles = clsx(className && className)
  return (
    <div
      className={clsx(
        styles,
        cls.button,
        'flex items-center justify-between cursor-pointer'
      )}
    >
      <span className="w-full">{text}</span>
    </div>
  )
}
