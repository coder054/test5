import clsx from 'clsx'
import { Loading } from 'components/loading/loading'
import cls from './button-core.module.css'

interface ButtonProps {
  className?: string
  type?: string
  placeholder?: string
  text?: string
  submit?: boolean
  loading?: boolean
  disable?: boolean
  onClick?: () => void
}

export const Button = ({
  className,
  text,
  submit,
  loading,
  onClick,
}: ButtonProps) => {
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
      <button className="w-full h-full" type={submit ? 'submit' : 'button'}>
        {!loading ? (
          <span className="w-full h-full">{text}</span>
        ) : (
          <Loading size={20}></Loading>
        )}
      </button>
    </div>
  )
}
