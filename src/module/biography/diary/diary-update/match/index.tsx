import { MenuItem } from '@mui/material'
import * as React from 'react'
import { useState, useCallback } from 'react'
import { MyDatePicker, MyInput } from 'src/components'
import { MinusIcon, PlusIcon } from 'src/components/icons'
import { MyNormalInput } from 'src/components/MyNormalInput'
import { MySelectCountry } from 'src/components/MySelectCountry'
import { MySlider } from 'src/components/MySlider'
import { MyTextArea } from 'src/components/MyTextarea'
import {
  EVENT,
  MATCH_LENGTH,
  MINUTES,
} from 'src/constants/mocks/match-length.constants'
import { POSITION } from 'src/constants/mocks/position.constants'
import { CountryType } from 'src/constants/types'
import { EventType, MatchType, StatType } from 'src/constants/types/match.types'
import { InfiniteScrollClub } from 'src/module/account-settings/football/components/InfiniteScrollClub'
import { InfiniteScrollTeam } from 'src/module/account-settings/football/components/InfiniteScrollTeam'

type FormValues = {
  date: string | Date
  country?: CountryType
}

type FormArrayType = {
  stats: StatType[]
  events: EventType[]
}

export const Match = () => {
  const [formValues, setFormValues] = useState<MatchType>({
    stats: [
      {
        minutesPlayed: 90,
        role: 'CB',
      },
      {
        minutesPlayed: 10,
        role: 'GK',
      },
    ],
    events: [
      {
        minutes: 21,
        event: 'GOAL',
      },
    ],
    dateTime: new Date(),
    length: 90,
    typeOfGame: 'SERIES',
    country: {
      alpha2Code: '',
      alpha3Code: '',
      phoneCode: '',
      flag: '',
      name: '',
      region: '',
    },
  })

  const handleChange = (
    value: string | number | CountryType,
    type: keyof FormValues
  ) => {
    setFormValues((prev) => ({ ...prev, [type]: value }))
  }

  const handleAddForm = useCallback(
    (type: keyof FormArrayType, initialValue: any) => {
      if (formValues[type].length <= 10) {
        let arr = [...formValues[type]]
        arr.push(initialValue)
        setFormValues((prev) => ({ ...prev, [type]: arr }))
      }
    },
    [JSON.stringify(formValues)]
  )

  const handleRemoveForm = useCallback(
    (type: keyof FormArrayType, i: number) => {
      /* @ts-ignore */
      const arr = formValues[type].filter((_, index) => {
        return [i].indexOf(index) == -1
      })
      setFormValues((prev) => ({ ...prev, [type]: arr }))
    },
    [JSON.stringify(formValues)]
  )

  return (
    <div className="space-y-10 ">
      <div className="space-y-9">
        <div className="grid grid-cols-2 gap-x-6">
          <MyDatePicker
            label="Date"
            maxDate={false}
            value={formValues.dateTime}
            onChange={(e) => handleChange(e, 'date')}
          />
          <MySelectCountry
            label="Country"
            val={formValues.country}
            onChange={(_, e: CountryType) => handleChange(e, 'country')}
          />
        </div>
        <MyInput value={formValues.typeOfGame} label="Type of Game" select>
          <MenuItem value="SERIES">Series</MenuItem>
          <MenuItem value="CUP">Cup</MenuItem>
          <MenuItem value="FRIENDLY">Friendly</MenuItem>
          <MenuItem value="OTHER">Other</MenuItem>
        </MyInput>
        <div className="grid grid-cols-2 gap-x-6">
          <MyInput select label="Match Length">
            {MATCH_LENGTH.map((it) => (
              <MenuItem key={it} value={it}>
                {`${it} min`}
              </MenuItem>
            ))}
          </MyInput>
          <MyInput select label="Place">
            {MATCH_LENGTH.map((it) => (
              <MenuItem key={it} value={it}>
                {`${it} min`}
              </MenuItem>
            ))}
          </MyInput>
        </div>
        <InfiniteScrollClub label="Your Club" />
        <InfiniteScrollTeam label="Your Team" />
        <MySelectCountry label="Opponent country/region" />
        <InfiniteScrollTeam label="Opponent Team" />
        <MyInput label="Arena" />
      </div>
      <div className="space-y-3">
        <p className="text-[#A2A5AD] font-normal text-[16px]">Match result</p>
        <div className="flex justify-between items-center space-x-6">
          <MyNormalInput
            label="Your Team Goals"
            type="number"
            inputOptions={{ min: '0' }}
          />
          <p className="text-[25px]">:</p>
          <MyNormalInput
            label="Opponent Goals"
            type="number"
            inputOptions={{ min: '0' }}
          />
        </div>
      </div>
      <p className="text-[18px] font-normal">Your Ztar of the Match goes to:</p>
      <div className="space-y-3">
        <div className="space-y-9">
          <InfiniteScrollTeam label="Your Team" />
          <InfiniteScrollTeam label="Opponent Team" />
        </div>
      </div>
      <p className="text-[18px] font-normal">Your match stats & events</p>
      <div className="space-y-3">
        <p className="text-[#A2A5AD] font-normal text-[16px]">Your stats</p>
        <div className="space-y-9">
          {formValues.stats.map((item, index) => (
            <div key={index} className="flex items-center space-x-2">
              <div className="flex-1 grid grid-cols-2 gap-x-6">
                <MyInput value={item.minutesPlayed} select label="Played">
                  {MATCH_LENGTH.map((it) => (
                    <MenuItem key={it} value={it}>
                      {`${it} min`}
                    </MenuItem>
                  ))}
                </MyInput>
                <MyInput value={item.role} select label="Role">
                  {POSITION.map((it) => (
                    <MenuItem key={it} value={it}>
                      {it}
                    </MenuItem>
                  ))}
                </MyInput>
              </div>
              {index === formValues.stats.length - 1 ? (
                <span
                  onClick={() =>
                    handleAddForm('stats', { minutesPlayed: null, role: '' })
                  }
                  className="cursor-pointer"
                >
                  <PlusIcon />
                </span>
              ) : (
                <span
                  onClick={() => handleRemoveForm('stats', index)}
                  className="cursor-pointer"
                >
                  <MinusIcon />
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="space-y-3">
        <p className="text-[#A2A5AD] font-normal text-[16px]">Your events</p>
        <div className="space-y-9">
          {formValues.events.map((item, index) => (
            <div key={index} className="flex items-center space-x-2">
              <div className="flex-1 grid grid-cols-2 gap-x-6">
                <MyInput value={item.minutes} select label="Minute">
                  {MINUTES.map((it) => (
                    <MenuItem key={it} value={it}>
                      {`${it} min`}
                    </MenuItem>
                  ))}
                </MyInput>
                <MyInput value={item.event} select label="Event">
                  {EVENT.map((it) => (
                    <MenuItem key={it.key} value={it.key}>
                      {it.label}
                    </MenuItem>
                  ))}
                </MyInput>
              </div>
              {index === formValues.events.length - 1 ? (
                <span
                  onClick={() =>
                    handleAddForm('events', { minutes: null, event: '' })
                  }
                  className="cursor-pointer"
                >
                  <PlusIcon />
                </span>
              ) : (
                <span
                  onClick={() => handleRemoveForm('events', index)}
                  className="cursor-pointer"
                >
                  <MinusIcon />
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
      <p className="text-[18px] font-normal">Your match review</p>
      <div className="space-y-9">
        <MySlider
          label="How was your Team performance?"
          //   onChange={(e) =>
          //     setDiary((prev) => ({
          //       ...prev,
          //       energyLevel: generateRateByNumber(e),
          //     }))
          //   }
          isAdjective
          step={25}
          //   value={generateRateByString(diary.energyLevel)}
          labelClass="text-[#A2A5AD]"
        />
        <MyTextArea placeholder="Your Teams game review (Describe what you’re team did well and what you’re team could have done better)" />
        <MySlider
          label="How physically strain, was it?"
          //   onChange={(e) =>
          //     setDiary((prev) => ({
          //       ...prev,
          //       energyLevel: generateRateByNumber(e),
          //     }))
          //   }
          isScale
          step={25}
          //   value={generateRateByString(diary.energyLevel)}
          labelClass="text-[#A2A5AD]"
        />
        <MySlider
          label="How was your match performance? "
          //   onChange={(e) =>
          //     setDiary((prev) => ({
          //       ...prev,
          //       energyLevel: generateRateByNumber(e),
          //     }))
          //   }
          isAdjective
          step={25}
          //   value={generateRateByString(diary.energyLevel)}
          labelClass="text-[#A2A5AD]"
        />
        <MyTextArea placeholder="Your game review (Describe what you did well and what you could have done better)" />
      </div>
    </div>
  )
}
