import { MenuItem, TextField } from '@mui/material'
import { useAtom } from 'jotai'
import { debounce } from 'lodash'
import { useCallback, useEffect, useState } from 'react'
import { COACH_DIARY_ATOM, PlAYER_REVIEWS } from 'src/atoms/diaryAtoms'
import { MyDatePicker, MyInput } from 'src/components'
import { MySelectCountry } from 'src/components/MySelectCountry'
import { MATCH_LENGTH } from 'src/constants/mocks/match-length.constants'
import { CountryType } from 'src/constants/types'
import {
  ClubType,
  CoachMatchType,
  ParticipateType,
} from 'src/constants/types/diary.types'
import { MatchType } from 'src/constants/types/match.types'
import {
  AccountSettingsType,
  TeamType,
  UserType,
} from 'src/constants/types/settingsType.type'
import { InfiniteScrollClub } from 'src/modules/account-settings/football/components/InfiniteScrollClub'
import { InfiniteScrollMember } from 'src/modules/account-settings/football/components/InfiniteScrollMember'
import { InfiniteScrollTeam } from 'src/modules/account-settings/football/components/InfiniteScrollTeam'
import TeamPerformance from './TeamPerformance'

const INITIAL_VALUES = {
  dateTime: new Date(),
  country: null,
  typeOfGame: 'SERIES',
  length: 90,
  place: 'HOME',
  club: null,
  yourTeam: null,
  opponentClub: null,
  opponentTeam: null,
  arena: '',
  result: {
    yourTeam: 0,
    opponents: 0,
  },
  mvp: {
    yourTeam: null,
    opponents: null,
  },
  matchMedia: [],
  physicallyStrain: 'NORMAL',
  teamPerformance: 'NORMAL',
  playerReviews: [],
  stats: [],
  events: [],
  teamMatchReview: '',
}

interface MatchProps {
  userProfile: AccountSettingsType
  onChange: (value: ParticipateType) => void
  team: TeamType
}

export default function Match({ userProfile, team, onChange }: MatchProps) {
  const [participate] = useAtom(COACH_DIARY_ATOM)
  const [playerReviews] = useAtom(PlAYER_REVIEWS)
  const [formValues, setFormValues] = useState<CoachMatchType>(INITIAL_VALUES)

  const handleChange = useCallback(
    (value: any, type: keyof MatchType) => {
      setFormValues((prev) => ({
        ...prev,
        [type]: value,
      }))
    },
    [JSON.stringify(formValues)]
  )

  const handleTextFieldChange = useCallback(
    debounce((value: string, type: keyof MatchType) => {
      setFormValues((prev) => ({
        ...prev,
        [type]: value,
      }))
    }, 600),
    [
      JSON.stringify(formValues?.arena),
      JSON.stringify(formValues?.teamMatchReview),
    ]
  )

  const handleResultChange = (value: number, type: string) => {
    setFormValues((prev) => ({
      ...prev,
      result: {
        ...prev.result,
        [type]: value,
      },
    }))
  }

  const handleMVPChange = useCallback(
    (value: UserType, type: string) => {
      setFormValues((prev) => ({
        ...prev,
        mvp: {
          ...prev.mvp,
          [type]: value,
        },
      }))
    },
    [JSON.stringify(formValues.mvp)]
  )

  useEffect(() => {
    ;(participate?.isParticipate || participate?.isPeriod) &&
      setFormValues(participate?.match)
    if (!participate) {
      setFormValues({
        ...INITIAL_VALUES,
        club: userProfile.coachCareer.contractedClub as ClubType,
        country: userProfile.settings.country,
        yourTeam: team,
      })
    }
  }, [JSON.stringify({ participate, userProfile, team })])

  useEffect(() => {
    onChange &&
      onChange({ ...participate, match: { ...formValues, playerReviews } })
  }, [JSON.stringify(formValues)])

  return (
    <div className="space-y-9">
      <div className="space-y-9">
        <div className="grid grid-cols-2 gap-x-6">
          <MyDatePicker
            label="Date"
            maxDate={new Date()}
            value={formValues?.dateTime}
            onChange={(e) => handleChange(e, 'dateTime')}
          />
          <MySelectCountry
            label="Country"
            value={formValues?.country}
            onChange={(_, e: CountryType) => handleChange(e, 'country')}
          />
        </div>
        <MyInput
          onChange={(_, e) => handleChange(e.props.value, 'typeOfGame')}
          value={formValues?.typeOfGame}
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
            select
            value={formValues?.length}
            onChange={(_, e) => handleChange(e.props.value, 'length')}
            label="Match Length"
            name="length23232"
          >
            {MATCH_LENGTH.map((it) => (
              <MenuItem key={it} value={it}>
                {`${it} min`}
              </MenuItem>
            ))}
          </MyInput>
          <MyInput
            onChange={(_, e) => handleChange(e.props.value, 'place')}
            value={formValues?.place}
            select
            label="Place"
          >
            <MenuItem value="HOME">Home</MenuItem>
            <MenuItem value="AWAY">Away</MenuItem>
          </MyInput>
        </div>
        <InfiniteScrollClub
          handleSetClub={(e) => handleChange(e, 'club')}
          value={formValues?.club}
          label="Your Club"
        />
        <InfiniteScrollTeam
          handleSetTeam={(e) => handleChange(e, 'yourTeam')}
          item={formValues?.yourTeam}
          idClub={formValues?.club?.clubId}
          label="Your Team"
        />
        <InfiniteScrollClub
          handleSetClub={(e) => handleChange(e, 'opponentClub')}
          value={formValues?.opponentClub}
          label="Opponent Club"
        />
        <InfiniteScrollTeam
          handleSetTeam={(e) => handleChange(e, 'opponentTeam')}
          idClub={formValues?.opponentClub?.clubId}
          item={formValues?.opponentTeam}
          label="Opponent Team"
        />
        <TextField
          fullWidth
          label="Arena"
          key={`${formValues?.arena}`}
          defaultValue={formValues?.arena}
          onChange={(e) => handleTextFieldChange(e.target.value, 'arena')}
        />
      </div>
      <div className="space-y-3">
        <p className="text-[#A2A5AD] font-normal text-[16px]">Match result</p>
        <div className="flex justify-between items-center space-x-6">
          <TextField
            onChange={(e) => handleResultChange(+e.target.value, 'yourTeam')}
            InputProps={{ inputProps: { min: 0 } }}
            value={formValues?.result.yourTeam}
            fullWidth
            label="Your Team Goals"
            type="number"
          />
          <p className="text-[25px]">:</p>
          <TextField
            onChange={(e) => handleResultChange(+e.target.value, 'opponents')}
            InputProps={{ inputProps: { min: 0 } }}
            value={formValues?.result.opponents}
            fullWidth
            label="Opponent Goals"
            type="number"
          />
        </div>
      </div>
      <p className="text-lg font-normal">Your Ztar of the Match goes to:</p>
      <div className="space-y-3">
        <div className="space-y-9">
          <InfiniteScrollMember
            onChange={(e: UserType) => handleMVPChange(e, 'yourTeam')}
            teamId={formValues?.yourTeam?.teamId}
            value={formValues?.mvp?.yourTeam ?? undefined}
            label="Your Team"
            playerOnly
          />
          <InfiniteScrollMember
            onChange={(e: UserType) => handleMVPChange(e, 'opponents')}
            teamId={formValues?.opponentTeam?.teamId}
            value={formValues?.mvp?.opponents ?? undefined}
            label="Opponent Team"
            playerOnly
          />
          <TextField
            multiline
            fullWidth
            rows={4}
            label="Team Match review"
            onChange={(e) =>
              handleTextFieldChange(e.target.value, 'teamMatchReview')
            }
            key={`${formValues?.teamMatchReview}`}
            defaultValue={formValues?.teamMatchReview}
            placeholder="Describe what the Team did well and what it could have done."
          />
        </div>
      </div>
      {formValues?.yourTeam?.teamId && (
        <TeamPerformance
          value={participate?.match?.playerReviews}
          teamId={formValues?.yourTeam.teamId}
        />
      )}
    </div>
  )
}
