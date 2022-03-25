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
  }, [date, JSON.stringify(diaryUpdate)])

  return (
    <div className="mobileL:grid mobileL:grid-cols-2 mobileL:gap-x-20 mobileM:flex mobileM:flex-col-reverse mobileM:gap-y-4">
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
        minDate={dayjs(new Date()).add(-7, 'day').toDate()}
        value={date}
        onChange={onChange}
      />
    </div>
  )
}
