import { Chip, TextField } from '@mui/material'
import clsx from 'clsx'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

type MyInputChipsProps = {
  label: string
  labelClass?: string
  value?: string[]
  onChange?: (value: string[]) => void
}

export const MyInputChips = ({
  label,
  labelClass,
  value,
  onChange,
}: MyInputChipsProps) => {
  const [currentValue, setCurrentValue] = useState<string>()
  const [chips, setChips] = useState<string[]>([])
  const [isFocus, setIsFocus] = useState<boolean>(false)

  const handleDelete = (chip: string) => {
    setChips((prev) => [...prev].filter((x) => x !== chip))
  }

  const handleSubmit = (event: any) => {
    if (event.key === 'Enter') {
      event.preventDefault()
      if (!chips.includes(currentValue)) {
        let newArr = [...chips]
        newArr.push(currentValue)
        setChips(newArr)
        setCurrentValue('')
      } else {
        toast.error('Tag already exists!')
      }
    }
  }

  useEffect(() => {
    onChange && onChange(chips)
  }, [chips])

  useEffect(() => {
    value && setChips(value)
  }, [value])

  return (
    <div>
      <p className={clsx('text-[16px] font-normal', labelClass)}>{label}</p>
      <div className="flex flex-wrap  items-center py-3">
        {chips.map((chip) => (
          <Chip
            size="medium"
            label={`#${chip}`}
            onDelete={() => handleDelete(chip)}
            sx={{
              fontWeight: 400,
              fontSize: 7,
              margin: '5px',
            }}
          />
        ))}
        <form className="flex-1 w-full" onKeyPress={handleSubmit}>
          <input
            value={currentValue}
            type="text"
            className="custom-input"
            onChange={(e) => setCurrentValue(e.target.value)}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
          />
        </form>
      </div>
      <div className="h-[2px] bg-[#6B7280] relative">
        <span
          className={clsx(
            'absolute mx-auto input-chips',
            isFocus && 'input-chips-animate'
          )}
        ></span>
      </div>
    </div>
  )
}
