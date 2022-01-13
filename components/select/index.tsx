import clsx from 'clsx'
import { OptionType } from 'constants/types'
import { ChevronDown } from 'imports/svgs'
import cls from './select.module.css'

interface OptionProps {
  option?: OptionType
}

const Option = () => {
  return <div></div>
}

interface SelectProps {
  className?: string
  placeholder?: string
  text?: string
  defaultValue?: string
  options?: OptionType[]
  onChange?: () => void
  isOpen?: boolean
}

export const Select = ({ className, isOpen }: SelectProps) => {
  const styles = clsx(className && className)

  return (
    <div
      className={clsx(
        styles,
        `w-[220px] h-[54px] text-base text-[#818389] relative ${cls.select}`
      )}
    >
      <span className="absolute top-[15px]">Select</span>

      {isOpen ? (
        <div>
          <ChevronDown />
        </div>
      ) : (
        <div>
          <ChevronDown />
        </div>
      )}
    </div>
  )
}
