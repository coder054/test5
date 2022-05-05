import { MenuItem } from '@mui/material'
import { useAtom } from 'jotai'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useQuery } from 'react-query'
import { diaryAtom } from 'src/atoms/diaryAtoms'
import { Loading, MyDatePicker, MyInput } from 'src/components'
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
  emotionlToNum,
  numToEmotional,
  numToScale,
  scaleToNum,
} from 'src/hooks/functionCommon'
import { InfiniteScrollClub } from 'src/modules/account-settings/football/components/InfiniteScrollClub'
import { InfiniteScrollMember } from 'src/modules/account-settings/football/components/InfiniteScrollMember'
import { InfiniteScrollTeam } from 'src/modules/account-settings/football/components/InfiniteScrollTeam'
import { useAuth } from 'src/modules/authentication/auth/AuthContext'
import { fetchSettings } from 'src/service/diary-update'

type FormArrayType = {
  stats: StatType[]
  events: EventType[]
}

type OnChangeFormType = MatchType & {
  yourTeam?: string
  opponentTeam?: string
  mvp?: {
    yourTeam?: string | null
    opponentTeam?: string | null
  } | null
}

type MatchProps = {
  onChange?: (value: OnChangeFormType) => void
  error: (err: string) => void
}

export const Match = ({ onChange, error }: MatchProps) => {
  const { currentRoleName } = useAuth()
  const [diary] = useAtom(diaryAtom)

  const { isLoading: isGettingSettings, data: accountSettings } = useQuery(
    ['settings', currentRoleName],
    () => fetchSettings(currentRoleName)
  )

  const [formValues, setFormValues] = useState<MatchType>({
    club: null,
    arena: '',
    length: 90,
    country: null,
    yourTeam: null,
    place: 'HOME',
    matchMedia: [],
    opponentClub: null,
    opponentTeam: null,
    typeOfGame: 'SERIES',
    dateTime: new Date(),
    events: [{ minutes: null, event: '' }],
    stats: [
      {
        minutesPlayed: 90,
        role: '',
      },
    ],
    review: {
      teamPerformance: 'NORMAL',
      teamReview: '',
      physicallyStrain: 'NORMAL',
      playerPerformance: 'NORMAL',
      yourReview: '',
    },
    mvp: null,
    result: {
      opponents: 0,
      yourTeam: 0,
    },
  })

  const handleChange = useCallback(
    (value: any, type: keyof MatchType) => {
      setFormValues((prev) => ({ ...prev, [type]: value }))
    },
    [JSON.stringify(formValues)]
  )

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
      if (formValues[type].length < (type === 'events' ? 30 : 5)) {
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

  // Variables

  const isFullfill = useMemo(() => {
    return (
      formValues.stats.reduce((a, b) => a + b.minutesPlayed, 0) <=
      formValues.length
    )
  }, [JSON.stringify(formValues.stats), JSON.stringify(formValues.length)])

  const lastStatValue = useMemo(() => {
    const flag = formValues.stats
    return {
      min: flag[flag.length - 1].minutesPlayed,
      role: flag[flag.length - 1].role,
    }
  }, [JSON.stringify(formValues.stats)])

  const lastEventValue = useMemo(() => {
    const flag = formValues.events
    return {
      min: flag[flag.length - 1].minutes,
      event: flag[flag.length - 1].event,
    }
  }, [JSON.stringify(formValues.events)])

  // Handle useEffect

  useEffect(() => {
    const getMvpValue = () => {
      if (formValues.mvp !== null && formValues.mvp?.opponents) {
        return { opponents: formValues.mvp.opponents.userId }
      } else if (formValues.mvp !== null && formValues.mvp?.yourTeam) {
        return { yourTeam: formValues.mvp.yourTeam.userId }
      } else if (
        formValues.mvp !== null &&
        formValues.mvp?.opponents &&
        formValues.mvp?.yourTeam
      ) {
        return {
          opponents: formValues.mvp.opponents.userId,
          yourTeam: formValues.mvp.yourTeam.userId,
        }
      }
      return null
    }
    !isFullfill
      ? error(
          'Your played minutes is over the match length. Please check it before saving'
        )
      : error('')
    onChange &&
      onChange({
        ...formValues,
        yourTeam: formValues.yourTeam?.teamId,
        opponentTeam: formValues.opponentTeam?.teamId,
        mvp: getMvpValue(),
        events: formValues.events[0].minutes === null ? [] : formValues.events,
      })
  }, [JSON.stringify(formValues), isFullfill])

  useEffect(() => {
    accountSettings &&
      setFormValues((prev) => ({
        ...prev,
        stats: [
          {
            minutesPlayed: 90,
            role:
              accountSettings.playerCareer.favoriteRoles?.length > 0
                ? accountSettings.playerCareer.favoriteRoles[0]
                : '',
          },
        ],
        club: accountSettings.playerCareer.contractedClub,
        country: accountSettings.settings.country,
      }))
  }, [JSON.stringify(accountSettings)])

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
  }, [JSON.stringify(diary)])

  return (
    <Loading isLoading={isGettingSettings}>
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
          <InfiniteScrollClub
            handleSetClub={(e) => handleChange(e, 'club')}
            value={formValues.club}
            label="Your Club"
          />
          <InfiniteScrollTeam
            handleSetTeam={(e) => handleChange(e, 'yourTeam')}
            item={formValues.yourTeam}
            idClub={formValues.club?.clubId}
            label="Your Team"
          />
          <InfiniteScrollClub
            handleSetClub={(e) => handleChange(e, 'opponentClub')}
            value={formValues.opponentClub}
            label="Opponent Club"
          />
          <InfiniteScrollTeam
            handleSetTeam={(e) => handleChange(e, 'opponentTeam')}
            idClub={formValues.opponentClub?.clubId}
            item={formValues.opponentTeam}
            label="Opponent Team"
          />

          <MyInput
            value={formValues.arena}
            label="Arena"
            onChange={(e) => handleChange(e.target.value, 'arena')}
          />
        </div>
        <div className="space-y-3">
          <p className="text-[#A2A5AD] font-normal text-[16px]">Match result</p>
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
        <p className="text-[18px] font-normal">
          Your Ztar of the Match goes to:
        </p>
        <div className="space-y-3">
          <div className="space-y-9">
            <InfiniteScrollMember
              onChange={(e) =>
                setFormValues((prev) => ({
                  ...prev,
                  mvp: { ...prev.mvp, yourTeam: e },
                }))
              }
              teamId={formValues.yourTeam?.teamId}
              value={formValues.mvp ? formValues.mvp.yourTeam : undefined}
              label="Your Team"
              playerOnly
            />
            <InfiniteScrollMember
              onChange={(e) =>
                setFormValues((prev) => ({
                  ...prev,
                  mvp: { ...prev.mvp, opponents: e },
                }))
              }
              teamId={formValues.opponentTeam?.teamId}
              value={formValues.mvp ? formValues.mvp.opponents : undefined}
              label="Opponent Team"
              playerOnly
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
                {index === formValues.stats.length - 1 ? (
                  <span
                    onClick={() =>
                      handleAddForm('stats', {
                        minutesPlayed: lastStatValue.min,
                        role: lastStatValue.role,
                      })
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
                    select
                    label="Minute"
                    defaultValue=""
                    value={item.minutes}
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
                    select
                    label="Event"
                    defaultValue=""
                    value={item.event}
                    onChange={(e) =>
                      handleChangeArrayForm(
                        'events',
                        'event',
                        e.target.value,
                        index + ''
                      )
                    }
                  >
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
                      handleAddForm('events', {
                        minutes: lastEventValue.min,
                        event: lastEventValue.event,
                      })
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
            value={emotionlToNum(formValues.review?.teamPerformance)}
            labelClass="text-[#A2A5AD]"
          />
          <MyTextArea
            value={formValues.review?.teamReview}
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
            value={scaleToNum(formValues.review?.physicallyStrain)}
            labelClass="text-[#A2A5AD]"
          />
          <MySlider
            label="How was your match performance? "
            onChange={(e) =>
              handleChangeReview(numToEmotional(e), 'playerPerformance')
            }
            isAdjective
            step={25}
            value={emotionlToNum(formValues.review?.playerPerformance)}
            labelClass="text-[#A2A5AD]"
          />
          <MyTextArea
            value={formValues.review?.yourReview}
            onChange={(e) => handleChangeReview(e.target.value, 'yourReview')}
            placeholder="Your game review (Describe what you did well and what you could have done better)"
          />
        </div>
      </div>
    </Loading>
  )
}
