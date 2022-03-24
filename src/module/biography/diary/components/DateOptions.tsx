import { MenuItem, Select } from '@mui/material'
import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import { MyDatePicker, MyInput } from 'src/components'
import { DiaryType } from 'src/constants/types/diary.types'
import {
  flexingFormatDate,
  getDefaultDay,
  getToday,
  upperFirst,
} from 'src/hooks/functionCommon'

type DateOptionsProps = {
  diaryUpdate?: DiaryType[]
  date?: string | Date
  onChange?: (value: string | Date) => void
  onChangeDiary?: (value: DiaryType) => void
}

export const DateOptions = ({
  diaryUpdate,
  date,
  onChange,
  onChangeDiary,
}: DateOptionsProps) => {
  const [value, setValue] = useState<string>('')

  useEffect(() => {
    setValue(getDefaultDay(date))
  }, [date])

  return (
    <div className="grid grid-cols-2 gap-x-20">
      <MyInput
        sx={{
          '& fieldset': {
            padding: '12px 12px 12px 12px',
          },
        }}
        size="small"
        label="Period"
        select
        value={value}
        onChange={(e: any) => setValue(e.target.value)}
      >
        <MenuItem
          onClick={() =>
            onChangeDiary({
              eatAndDrink: 'NORMAL',
              energyLevel: 'NORMAL',
              sleep: 'NORMAL',
              typeOfDiary: 'TRAINING',
            })
          }
          value={getDefaultDay(date)}
        >
          {getDefaultDay(date)}
        </MenuItem>
        {(diaryUpdate || []).map((it: DiaryType) => (
          <MenuItem
            key={it.diaryId}
            value={it.diaryId}
            onClick={() => onChangeDiary(it)}
          >
            {`${flexingFormatDate(it.createdAt, 'HH:mm')} - ${upperFirst(
              it.typeOfDiary
            )}`}
          </MenuItem>
        ))}
      </MyInput>
      <MyDatePicker
        label="Date"
        size="small"
        isNextable
        maxDate={dayjs(getToday()).toDate()}
        value={date}
        onChange={onChange}
      />
    </div>
  )
}
