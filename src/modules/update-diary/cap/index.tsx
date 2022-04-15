import { MenuItem } from '@mui/material'
import { useAtom } from 'jotai'
import { useCallback, useEffect, useState } from 'react'
import { diaryAtom } from 'src/atoms/diaryAtoms'
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
import { CapType } from 'src/constants/types/cap.types'
import {
  EventType,
  ReviewType,
  StatType,
} from 'src/constants/types/match.types'
import {
  emotionlToNum,
  numToEmotional,
  numToScale,
  scaleToNum,
} from 'src/hooks/functionCommon'
import { useAuth } from 'src/modules/authentication/auth/AuthContext'
type FormArrayType = {
  stats: StatType[]
  events: EventType[]
}

type CapProps = {
  onChange?: (value: CapType) => void
}

const tagsClass =
  'text-white bg-[#13161A] laptopM:py-[10px] laptopM:pl-[10px] laptopM:pr-[20px] mobileM:p-[10px] rounded-[8px]'

export const Cap = ({ onChange }: CapProps) => {
  const [diary] = useAtom(diaryAtom)

  const [formValues, setFormValues] = useState<CapType>({
    arena: '',
    length: 90,
    country: null,
    yourTeam: 'U15',
    place: 'HOME',
    capMedia: [],
    opponentTeam: 'U15',
    opponentCountry: null,
    typeOfCap: 'REGIONAL',
    typeOfGame: 'SERIES',
    dateTime: new Date(),
    events: [{ minutes: 0, event: '' }],
    stats: [{ minutesPlayed: 90, role: '' }],
    review: {
      teamPerformance: 'NORMAL',
      teamReview: '',
      physicallyStrain: 'NORMAL',
      playerPerformance: 'NORMAL',
      yourReview: '',
    },
    result: {
      opponents: 0,
      yourTeam: 0,
    },
  })

  const handleChange = (value: any, type: keyof CapType) => {
    setFormValues((prev) => ({ ...prev, [type]: value }))
  }

  const handleChangeReview = useCallback(
    (value: string | number, type: keyof ReviewType) => {
      setFormValues((prev) => ({
        ...prev,
        review: {
          ...formValues.review,
          [type]: value,
        },
      }))
    },
    [JSON.stringify(formValues.review)]
  )

  const handleChangeArrayForm = useCallback(
    (
      formName: 'stats' | 'events',
      type: 'minutesPlayed' | 'role' | 'minutes' | 'event',
      value: string | number,
      index: string
    ) => {
      let newArr = [...(formValues[formName] || [])]
      /* @ts-ignore */
      newArr[+index][type] = value
      setFormValues((prev) => ({ ...prev, [formName]: newArr }))
    },
    [JSON.stringify(formValues.events), JSON.stringify(formValues.stats)]
  )

  const handleAddForm = useCallback(
    (type: keyof FormArrayType, initialValue: any) => {
      if (formValues[type].length <= 10) {
        let arr = [...formValues[type]]
        arr.push(initialValue)
        setFormValues((prev) => ({ ...prev, [type]: arr }))
      }
    },
    [JSON.stringify(formValues.events), JSON.stringify(formValues.stats)]
  )

  const handleRemoveForm = useCallback(
    (type: keyof FormArrayType, i: number) => {
      /* @ts-ignore */
      const arr = formValues[type].filter((_, index) => {
        return [i].indexOf(index) == -1
      })
      setFormValues((prev) => ({ ...prev, [type]: arr }))
    },
    [JSON.stringify(formValues.events), JSON.stringify(formValues.stats)]
  )

  useEffect(() => {
    onChange && onChange(formValues)
  }, [JSON.stringify(formValues)])

  useEffect(() => {
    const initialValues = {
      ...diary.cap,
      events:
        diary.cap?.events.length === 0
          ? [{ minutes: 0, event: '' }]
          : diary.cap?.events,
      stats:
        diary.cap?.stats.length === 0
          ? [{ minutesPlayed: 0, role: '' }]
          : diary.cap?.stats,
    }
    diary.cap && setFormValues(initialValues)
  }, [])

  return (
    <div className="space-y-10 ">
      <p className={tagsClass}>
        Add your Regional and National Caps to your Biography
      </p>
      <div className="space-y-9">
        <div className="grid grid-cols-2 gap-x-6">
          <MyDatePicker
            label="Date"
            maxDate={new Date()}
            value={formValues.dateTime}
            onChange={(e) => handleChange(e, 'dateTime')}
          />
          <MySelectCountry
            label="Country"
            value={formValues.country}
            onChange={(_, e: CountryType) => handleChange(e, 'country')}
          />
        </div>
        <MyInput
          onChange={(_, e) => handleChange(e.props.value, 'typeOfGame')}
          value={formValues.typeOfGame}
          label="Type of Game"
          select
        >
          <MenuItem value="SERIES">Series</MenuItem>
          <MenuItem value="CUP">Cup</MenuItem>
          <MenuItem value="FRIENDLY">Friendly</MenuItem>
          <MenuItem value="OTHER">Other</MenuItem>
        </MyInput>
        <div className="grid grid-cols-2 gap-x-6">
          <MyInput
            value={formValues.length}
            onChange={(_, e) => handleChange(e.props.value, 'length')}
            select
            label="Match Length"
          >
            {MATCH_LENGTH.map((it) => (
              <MenuItem key={it} value={it}>
                {`${it} min`}
              </MenuItem>
            ))}
          </MyInput>
          <MyInput
            onChange={(_, e) => handleChange(e.props.value, 'place')}
            value={formValues.place}
            select
            label="Place"
          >
            <MenuItem key="HOME" value="HOME">
              Home
            </MenuItem>
            <MenuItem key="AWAY" value="AWAY">
              Away
            </MenuItem>
          </MyInput>
        </div>
        <MyInput
          onChange={(_, e) => handleChange(e.props.value, 'typeOfCap')}
          value={formValues.typeOfCap}
          label="National/Regional"
          select
        >
          <MenuItem value="NATIONAL">National</MenuItem>
          <MenuItem value="REGIONAL">Regional</MenuItem>
        </MyInput>
        <MyInput
          onChange={(_, e) => handleChange(e.props.value, 'yourTeam')}
          value={formValues.yourTeam}
          label="Your Team"
          select
        >
          <MenuItem value="U15">U15</MenuItem>
          <MenuItem value="U16">U16</MenuItem>
          <MenuItem value="U17">U17</MenuItem>
          <MenuItem value="U19">U19</MenuItem>
          <MenuItem value="U21">U21</MenuItem>
          <MenuItem value="SENIOR">Senior</MenuItem>
        </MyInput>
        <MySelectCountry
          label="Opponent country/region"
          value={formValues.opponentCountry}
          onChange={(_, e: CountryType) => handleChange(e, 'opponentCountry')}
        />
        <MyInput
          onChange={(_, e) => handleChange(e.props.value, 'opponentTeam')}
          value={formValues.opponentTeam}
          label="Your Team"
          select
        >
          <MenuItem value="U15">U15</MenuItem>
          <MenuItem value="U16">U16</MenuItem>
          <MenuItem value="U17">U17</MenuItem>
          <MenuItem value="U19">U19</MenuItem>
          <MenuItem value="U21">U21</MenuItem>
          <MenuItem value="SENIOR">Senior</MenuItem>
        </MyInput>
        <MyInput
          value={formValues.arena}
          label="Arena"
          onChange={(e) => handleChange(e.target.value, 'arena')}
        />
      </div>
      <div className="space-y-3">
        <p className="text-[#A2A5AD] font-normal text-[16px]">Cap result</p>
        <div className="flex justify-between items-center space-x-6">
          <MyNormalInput
            onChange={(e) =>
              setFormValues((prev) => ({
                ...prev,
                result: { ...prev.result, yourTeam: +e.target.value },
              }))
            }
            value={formValues.result.yourTeam}
            label="Your Team Goals"
            type="number"
            inputOptions={{ min: '0' }}
          />
          <p className="text-[25px]">:</p>
          <MyNormalInput
            onChange={(e) =>
              setFormValues((prev) => ({
                ...prev,
                result: { ...prev.result, opponents: +e.target.value },
              }))
            }
            value={formValues.result.opponents}
            label="Opponent Goals"
            type="number"
            inputOptions={{ min: '0' }}
          />
        </div>
      </div>
      <div className="space-y-3">
        <p className="text-[#A2A5AD] font-normal text-[16px]">Your stats</p>
        <div className="space-y-9">
          {formValues.stats.map((item, index) => (
            <div key={index} className="flex items-center space-x-2">
              <div className="flex-1 grid grid-cols-2 gap-x-6">
                <MyInput
                  value={item.minutesPlayed}
                  select
                  label="Played"
                  onChange={(e) =>
                    handleChangeArrayForm(
                      'stats',
                      'minutesPlayed',
                      e.target.value,
                      index + ''
                    )
                  }
                >
                  {MATCH_LENGTH.map((it) => (
                    <MenuItem key={it} value={it}>
                      {`${it} min`}
                    </MenuItem>
                  ))}
                </MyInput>
                <MyInput
                  value={item.role}
                  select
                  label="Role"
                  onChange={(e) =>
                    handleChangeArrayForm(
                      'stats',
                      'role',
                      e.target.value,
                      index + ''
                    )
                  }
                >
                  {POSITION.map((it) => (
                    <MenuItem key={it} value={it}>
                      {it}
                    </MenuItem>
                  ))}
                </MyInput>
              </div>
              {index === 0 ? (
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
                <MyInput
                  value={item.minutes}
                  select
                  label="Minute"
                  onChange={(e) =>
                    handleChangeArrayForm(
                      'events',
                      'minutes',
                      e.target.value,
                      index + ''
                    )
                  }
                >
                  {MINUTES.map((it) => (
                    <MenuItem key={it} value={it}>
                      {`${it} min`}
                    </MenuItem>
                  ))}
                </MyInput>
                <MyInput
                  onChange={(e) =>
                    handleChangeArrayForm(
                      'events',
                      'event',
                      e.target.value,
                      index + ''
                    )
                  }
                  value={item.event}
                  select
                  label="Event"
                >
                  {EVENT.map((it) => (
                    <MenuItem key={it.key} value={it.key}>
                      {it.label}
                    </MenuItem>
                  ))}
                </MyInput>
              </div>
              {index === 0 ? (
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
          onChange={(e) =>
            handleChangeReview(numToEmotional(e), 'teamPerformance')
          }
          isAdjective
          step={25}
          value={emotionlToNum(formValues.review.teamPerformance)}
          labelClass="text-[#A2A5AD]"
        />
        <MyTextArea
          value={formValues.review.teamReview}
          onChange={(e) => handleChangeReview(e.target.value, 'teamReview')}
          placeholder="Your Teams game review (Describe what you’re team did well and what you’re team could have done better)"
        />
        <MySlider
          label="How physically strain, was it?"
          onChange={(e) =>
            handleChangeReview(numToScale(e), 'physicallyStrain')
          }
          isScale
          step={25}
          value={scaleToNum(formValues.review.physicallyStrain)}
          labelClass="text-[#A2A5AD]"
        />
        <MySlider
          label="How was your match performance? "
          onChange={(e) =>
            handleChangeReview(numToEmotional(e), 'playerPerformance')
          }
          isAdjective
          step={25}
          value={emotionlToNum(formValues.review.playerPerformance)}
          labelClass="text-[#A2A5AD]"
        />
        <MyTextArea
          value={formValues.review.yourReview}
          onChange={(e) => handleChangeReview(e.target.value, 'yourReview')}
          placeholder="Your game review (Describe what you did well and what you could have done better)"
        />
      </div>
    </div>
  )
}
