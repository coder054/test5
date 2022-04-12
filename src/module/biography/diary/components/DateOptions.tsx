import { MenuItem } from '@mui/material'
import dayjs from 'dayjs'
import { useAtom } from 'jotai'
import { useEffect, useState } from 'react'
import { diaryAtom } from 'src/atoms/diaryAtoms'
import { MyDatePicker, MyInput } from 'src/components'
import { DashboardUpdatesType } from 'src/constants/types/dashboard/training.types'
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
  isSelected?: DashboardUpdatesType
  onChange?: (value: string | Date) => void
  onChangeDiary?: (value: DiaryType) => void
}

export const DateOptions = ({
  diaryUpdate,
  date,
  onChange,
  isSelected,
  onChangeDiary,
}: DateOptionsProps) => {
  const [value, setValue] = useState<string>('')
  const [diary] = useAtom(diaryAtom)

  useEffect(() => {
    !diary?.diaryId && setValue(getDefaultDay(date))
  }, [date, JSON.stringify(diaryUpdate), JSON.stringify(diary)])

  useEffect(() => {
    if (isSelected && diaryUpdate) {
      onChangeDiary(
        diaryUpdate?.find((it) => it.diaryId === isSelected.diaryId)
      )
      setValue(isSelected.diaryId)
    }
  }, [JSON.stringify(isSelected), JSON.stringify(diaryUpdate)])

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
        readOnly={!!isSelected}
        isNextable={!isSelected}
        maxDate={dayjs(isSelected ? isSelected.createdAt : getToday()).toDate()}
        minDate={dayjs(isSelected ? isSelected.createdAt : new Date())
          .add(-7, 'day')
          .toDate()}
        value={date}
        onChange={onChange}
      />
    </div>
  )
}
