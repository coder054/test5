import clsx from 'clsx'
import { OptionType } from 'src/constants/types'
import { ChevronDown, ChevronUp } from 'src/imports/svgs'
import { useEffect, useRef, useState } from 'react'
const cls = require('./select.module.css')
import { OptionProps, SelectProps } from './type'

const Option = ({ title, value, onSelect }: OptionProps) => {
  const liRef = useRef(null)

  const handleClickgetData = (event: any) => {
    const optionValue = event.currentTarget.getAttribute('data-value')
    const optionTitle = event.currentTarget.textContent
    if (optionTitle && optionValue) {
      onSelect(optionTitle, optionValue)
    }
  }

  return (
    <li
      ref={liRef}
      className="text-base text-[#FFFFFF] pl-[12px] w-full h-[48px] flex items-center cursor-pointer hover:bg-[#4654EA]"
      data-value={value}
      onMouseDown={handleClickgetData}
    >
      {title}
    </li>
  )
}

export const Select = ({
  className,
  size,
  placeholder,
  disable,
  options,
  defaultValue,
  onChange,
}: SelectProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [displayText, setDisplayText] = useState<string | null>('')
  const [value, setValue] = useState<string>('')
  const selectRef = useRef<HTMLDivElement>(null)

  const styles = clsx(className && className)

  useEffect(() => {
    function handleClickCloseSelect(event: Event) {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickCloseSelect)

    return () =>
      document.removeEventListener('mousedown', handleClickCloseSelect)
  }, [selectRef])

  useEffect(() => {
    if (defaultValue) {
      const defaultOption = options?.find(
        (item: OptionType) => item.value === defaultValue
      )
      if (defaultOption) {
        setDisplayText(defaultOption?.label)
      }
    }
  }, [defaultValue, options])

  const handleClickOpenSelect = (e) => {
    e.preventDefault()
    if (disable) {
      return
    }
    setIsOpen(!isOpen)
  }

  const handleClickSelectOption = (title: string, value: string | null) => {
    value && setValue(value)
    setDisplayText(title)
    onChange && onChange(title, value)
    setIsOpen(!isOpen)
  }

  return (
    <div className={`${size ? '' : 'w-[220px] h-[54px]'}`}>
      <div className={clsx(styles, 'relative')}>
        <div
          className={`w-[220px] h-[54px] text-base text-[#818389] cursor-pointer ${cls.select}`}
          role={'button'}
          onClick={handleClickOpenSelect}
          ref={selectRef}
        >
          <span className="absolute top-[15px]">
            {displayText || placeholder}
          </span>

          <div className="absolute right-4 top-4">
            {isOpen ? (
              <div>
                <ChevronUp />
              </div>
            ) : (
              <div>
                <ChevronDown />
              </div>
            )}
          </div>
        </div>

        {isOpen && (
          <ul className="w-full border border-[#252627] rounded-[8px]">
            {options?.map((item: OptionType) => (
              <Option
                key={item.value}
                title={item.label}
                value={item.value}
                onSelect={handleClickSelectOption}
              />
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
