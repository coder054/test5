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
import {
  EventType,
  MatchType,
  ReviewType,
  StatType,
} from 'src/constants/types/match.types'
import {
  generateRateByNumber,
  generateRateByString,
} from 'src/hooks/functionCommon'
import { InfiniteScrollClub } from 'src/module/account-settings/football/components/InfiniteScrollClub'
import { InfiniteScrollMember } from 'src/module/account-settings/football/components/InfiniteScrollMember'
import { InfiniteScrollTeam } from 'src/module/account-settings/football/components/InfiniteScrollTeam'

type FormArrayType = {
  stats: StatType[]
  events: EventType[]
}

export const Match = () => {
  const [diary] = useAtom(diaryAtom)

  console.log('Data: ', diary)

  const [formValues, setFormValues] = useState<MatchType>({
    length: 90,
    review: {
      teamPerformance: 'NORMAL',
      teamReview: '',
      physicallyStrain: 'NORMAL',
      playerPerformance: 'NORMAL',
      yourReview: '',
    },
    yourTeam: {
      clubId: '',
      clubLogo: '',
      clubName: '',
      teamId: '',
      teamImage: '',
      teamName: '',
    },
    stats: [{ minutesPlayed: 90, role: '' }],
    typeOfGame: 'SERIES',
    dateTime: new Date(),
    matchMedia: [],
    mvp: {
      yourTeam: {},
      opponents: {},
    },
    arena: '',
    events: [{ minutes: 0, event: '' }],
    opponentClub: {
      clubName: '',
      fromTime: null,
      websiteUrl: null,
      contractedUntil: null,
      city: null,
      logoUrl: '',
      toTime: null,
      country: null,
      clubId: '',
    },
    opponentTeam: {
      clubId: '',
      clubLogo: '',
      clubName: '',
      teamId: '',
      teamImage: '',
      teamName: '',
    },
    result: {
      opponents: 0,
      yourTeam: 0,
    },
    club: {
      fromTime: null,
      clubName: '',
      websiteUrl: null,
      toTime: null,
      country: null,
      logoUrl: '',
      city: null,
      clubId: '',
      contractedUntil: null,
    },
    place: '',
    country: {
      alpha3Code: '',
      name: '',
      phoneCode: '',
      region: '',
      flag: '',
      alpha2Code: '',
    },
  })

  const handleChange = (
    value: string | number | CountryType,
    type: keyof MatchType
  ) => {
    setFormValues((prev) => ({ ...prev, [type]: value }))
  }

  const handleChangeReview = (
    value: string | number,
    type: keyof ReviewType
  ) => {
    setFormValues((prev) => ({
      ...prev,
      review: {
        ...formValues.review,
        [type]: typeof value === 'number' ? generateRateByNumber(value) : value,
      },
    }))
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

  useEffect(() => {
    const initialValues = {
      ...diary.match,
      events:
        diary.match?.events.length === 0
          ? [{ minutes: 0, event: '' }]
          : diary.match?.events,
      stats:
        diary.match?.stats.length === 0
          ? [{ minutesPlayed: 0, role: '' }]
          : diary.match?.stats,
    }
    diary.match && setFormValues(initialValues)
  }, [])

  return (
    <div className="space-y-10 ">
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
        <InfiniteScrollClub value={formValues.club} label="Your Club" />
        <InfiniteScrollTeam
          item={formValues.yourTeam}
          idClub={formValues.club.clubId}
          label="Your Team"
        />
        <InfiniteScrollClub
          value={formValues.opponentClub}
          label="Opponent Club"
        />
        <InfiniteScrollTeam
          idClub={formValues.opponentClub.clubId}
          item={formValues.opponentTeam}
          label="Opponent Team"
        />
        <MyInput value={formValues.arena} label="Arena" />
      </div>
      <div className="space-y-3">
        <p className="text-[#A2A5AD] font-normal text-[16px]">Match result</p>
        <div className="flex justify-between items-center space-x-6">
          <MyNormalInput
            value={formValues.result.yourTeam}
            label="Your Team Goals"
            type="number"
            inputOptions={{ min: '0' }}
          />
          <p className="text-[25px]">:</p>
          <MyNormalInput
            value={formValues.result.opponents}
            label="Opponent Goals"
            type="number"
            inputOptions={{ min: '0' }}
          />
        </div>
      </div>
      <p className="text-[18px] font-normal">Your Ztar of the Match goes to:</p>
      <div className="space-y-3">
        <div className="space-y-9">
          <InfiniteScrollMember
            teamId={formValues.yourTeam.teamId}
            value={formValues.mvp.yourTeam}
            label="Your Team"
          />
          <InfiniteScrollMember
            teamId={formValues.opponentTeam.teamId}
            value={formValues.mvp.opponents}
            label="Opponent Team"
          />
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
          onChange={(e) => handleChangeReview(e, 'teamPerformance')}
          isAdjective
          step={25}
          value={generateRateByString(formValues.review.teamPerformance)}
          labelClass="text-[#A2A5AD]"
        />
        <MyTextArea
          value={formValues.review.teamReview}
          onChange={(e) => handleChangeReview(e, 'teamReview')}
          placeholder="Your Teams game review (Describe what you’re team did well and what you’re team could have done better)"
        />
        <MySlider
          label="How physically strain, was it?"
          onChange={(e) => handleChangeReview(e, 'physicallyStrain')}
          isScale
          step={25}
          value={generateRateByString(formValues.review.physicallyStrain)}
          labelClass="text-[#A2A5AD]"
        />
        <MySlider
          label="How was your match performance? "
          onChange={(e) => handleChangeReview(e, 'playerPerformance')}
          isAdjective
          step={25}
          value={generateRateByString(formValues.review.playerPerformance)}
          labelClass="text-[#A2A5AD]"
        />
        <MyTextArea
          value={formValues.review.yourReview}
          onChange={(e) => handleChangeReview(e, 'yourReview')}
          placeholder="Your game review (Describe what you did well and what you could have done better)"
        />
      </div>
    </div>
  )
}
