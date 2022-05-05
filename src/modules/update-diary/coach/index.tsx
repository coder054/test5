import { MenuItem, TextField } from '@mui/material'
import dayjs from 'dayjs'
import React, { useState } from 'react'
import { useQuery } from 'react-query'
import { MyDatePicker } from 'src/components'
import { getToday } from 'src/hooks/functionCommon'
import { useAuth } from 'src/modules/authentication/auth/AuthContext'
import { fetchDiary } from 'src/service/diary-update'
import { DiaryUpdateIcon } from 'src/components/icons/DiaryUpdateIcon'
import { Loading } from 'src/components'

export default function CoachDiary() {
  const { currentRoleName } = useAuth()
  const [initialDate, setInitialDate] = useState<string | Date>(getToday())

  const { isLoading: isGettingDiary, data: response } = useQuery(
    ['diary', initialDate],
    () => fetchDiary(initialDate, currentRoleName)
  )

  console.log('Data: ', response)

  return (
    <Loading isLoading={isGettingDiary}>
      <div className="space-y-5 p-9">
        <div className="w-full flex flex-col items-center space-y-2 pb-3">
          <DiaryUpdateIcon />
          <p className="text-[24px] font-medium text-white">Diary Update</p>
        </div>
        <div className="mobileL:grid mobileL:grid-cols-2 mobileL:gap-x-20 mobileM:flex mobileM:flex-col-reverse mobileM:gap-y-4">
          <TextField select size="small" fullWidth label="Period">
            <MenuItem value="new">New Diary</MenuItem>
            {/* {(response || []).map((item: any))} */}
          </TextField>
          <MyDatePicker
            label="Date"
            size="small"
            value={initialDate}
            onChange={setInitialDate}
            maxDate={dayjs(getToday()).toDate()}
            minDate={dayjs(new Date()).add(-7, 'day').toDate()}
          />
        </div>
      </div>
    </Loading>
  )
}
