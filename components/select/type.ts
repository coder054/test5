import { OptionType } from 'constants/types'

export interface SelectProps {
  className?: string
  placeholder?: string
  defaultValue?: string
  options?: OptionType[]
  isOpen?: boolean
  disable?: boolean
  label?: boolean
  size?: boolean
  error?: string | number | boolean
  required?: boolean
  scrollIntoView?: boolean
  onChange: (title: string, value: string | null) => void
}

export interface OptionProps {
  option?: OptionType
  scrollIntoView?: boolean
  title?: string
  value?: string
  onSelect: (title: string, value: string | null) => void
}
