import clsx from 'clsx'
import cls from './button-core.module.css'

interface ButtonProps {
  className?: string
  type?: string
  placeholder?: string
  text?: string
  submit?: boolean
  onClick?: () => void
}

export const Button = ({ className, text, submit, onClick }: ButtonProps) => {
  const styles = clsx(className && className)
  return (
    <div
      onClick={onClick}
      className={clsx(
        styles,
        cls.button,
        'flex items-center justify-between cursor-pointer text-center'
      )}
    >
      <button className="w-full" type={submit ? 'submit' : 'button'}>
        <span className="w-full">{text}</span>
      </button>
    </div>
  )
}
