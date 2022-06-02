import { MenuItem, TextField } from '@mui/material'
import { useAtom } from 'jotai'
import { useCallback, useEffect, useState } from 'react'
import { COACH_DIARY_ATOM } from 'src/atoms/diaryAtoms'
import { MyDatePicker, MyInput } from 'src/components'
import { MyNormalInput } from 'src/components/MyNormalInput'
import { MySelectCountry } from 'src/components/MySelectCountry'
import { MySlider } from 'src/components/MySlider'
import { MATCH_LENGTH } from 'src/constants/mocks/match-length.constants'
import { CountryType } from 'src/constants/types'
import { CoachCapType, ParticipateType } from 'src/constants/types/diary.types'
import { ReviewType } from 'src/constants/types/match.types'
import { AccountSettingsType } from 'src/constants/types/settingsType.type'
import { emotionToNum, numToEmotion } from 'src/hooks/functionCommon'

type CapProps = {
  onChange?: (value: ParticipateType) => void
  userProfile: AccountSettingsType
}

const tagsClass =
  'text-white bg-[#13161A] laptopM:py-[10px] laptopM:pl-[10px] laptopM:pr-[20px] mobileM:p-[10px] rounded-[8px]'

const INITIAL_VALUES = {
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
  review: {
    teamPerformance: 'NORMAL',
    teamReview: '',
  },
  result: {
    opponents: 0,
    yourTeam: 0,
  },
}

export const Cap = ({ onChange, userProfile }: CapProps) => {
  const [participate] = useAtom(COACH_DIARY_ATOM)
  const [formValues, setFormValues] = useState<CoachCapType>(INITIAL_VALUES)

  const handleChange = (value: any, type: keyof CoachCapType) => {
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

  useEffect(() => {
    onChange &&
      onChange({
        ...participate,
        energyLevel: 'VERY_BAD',
        eatAndDrink: 'VERY_BAD',
        sleep: 'VERY_BAD',
        userType: 'COACH',
        cap: formValues,
      })
  }, [JSON.stringify(formValues)])

  useEffect(() => {
    ;(participate?.isParticipate || participate?.isPeriod) &&
      setFormValues(participate?.cap)
    if (!participate) {
      setFormValues({
        ...INITIAL_VALUES,
        country: userProfile.settings.country,
      })
    }
  }, [JSON.stringify(participate)])

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
          label="Opponent Team"
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
      <p className="text-[18px] font-normal">Your match review</p>
      <div className="space-y-9">
        <MySlider
          label="How was your Team performance?"
          onChange={(e) =>
            handleChangeReview(numToEmotion(e), 'teamPerformance')
          }
          isAdjective
          step={25}
          value={emotionToNum(formValues.review?.teamPerformance)}
          labelClass="text-[#A2A5AD]"
        />
        <TextField
          multiline
          rows={4}
          fullWidth
          value={formValues.review?.teamReview}
          onChange={(e) => handleChangeReview(e.target.value, 'teamReview')}
          placeholder="Your Teams game review (Describe what you’re team did well and what you’re team could have done better)"
        />
      </div>
    </div>
  )
}
