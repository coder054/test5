import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { MyInput } from 'src/components'
import { ListImageVideo } from 'src/components/list-image-video'
import { MyButton } from 'src/components/MyButton'
import { MyDatePicker } from 'src/components/MyDatePicker'
import { MySelect } from 'src/components/MySelect'
import { MySelectCountry } from 'src/components/MySelectCountry'
import { MySlider } from 'src/components/MySlider'
import { MyTextArea } from 'src/components/MyTextarea'
import { UploadMutilImageVideo } from 'src/components/upload-mutil-image-video'
import {
  CountryType,
  DevelopmentNoteType,
  HistoricCareerType,
  ImageVideoType,
} from 'src/constants/types'
import { ClubType } from 'src/constants/types/settingsType.type'
import { useIncrementNumber } from 'src/hooks/useIncrementNumber'
import { SvgCamera, SvgVideo } from 'src/imports/svgs'
import { BackGround } from 'src/module/account-settings/common-components/Background'
import { InfiniteScrollClub } from 'src/module/account-settings/football/components/InfiniteScrollClub'
import { OptionPlayer } from 'src/module/authen/types'
import {
  createCareerHistoric,
  getListDevelopmentNotes,
} from 'src/service/biography-update'

interface DevelopmentProps {
  playerId?: string
}
interface FormValuesType {
  season?: string
  fromDate?: string
  toDate?: string
  country?: CountryType
  league?: string
  club?: string
  team?: string
  role?: string
  serie?: number
  cup?: number
  friend?: number
  won?: number
  lost?: number
  draw?: number
  madeTeam?: number
  letInTeamGoal?: number
  yourGoals?: number
  yourAssist?: number
  yourYellowCard?: number
  yourRedCard?: number
  yourEstimated?: number
  summary?: string
  contractedClub?: ClubType
}

const tagsClass =
  'text-white bg-[#13161A] laptopM:py-[10px] laptopM:pl-[10px] laptopM:pr-[20px] mobileM:p-[10px] rounded-[8px]'

export const Historic = ({ playerId }: DevelopmentProps) => {
  const [loading, setLoading] = useState<boolean>(false)
  const [images, setImages] = useState([])
  const [arrayFile, setArrayFile] = useState([])
  const [formValues, setFormValues] = useState<FormValuesType>({
    season: '',
    fromDate: null,
    toDate: null,
    country: {
      alpha2Code: '',
      alpha3Code: '',
      flag: '',
      name: '',
      phoneCode: '',
      region: '',
    },
    league: '',
    club: '',
    team: '',
    role: '',
    serie: null,
    cup: null,
    friend: null,
    won: null,
    lost: null,
    draw: null,
    madeTeam: null,
    letInTeamGoal: null,
    yourGoals: null,
    yourAssist: null,
    yourYellowCard: null,
    yourRedCard: null,
    yourEstimated: null,
    summary: '',
    contractedClub: {
      arena: '',
      city: '',
      clubId: '',
      clubName: '',
      country: '',
      logoUrl: '',
      nickName: '',
      websiteUrl: null,
    },
  })

  const seasonOption = useIncrementNumber({
    startNumber: 1971,
    endNumber: 2072,
  })

  useEffect(() => {
    arrayFile.forEach((item) => {
      setImages((prev) => [
        ...prev,
        {
          type: 'IMAGE',
          url: item,
        },
      ])
    })
  }, [arrayFile])

  const handleChangeForm = (type: keyof FormValuesType, value) => {
    setFormValues((prev) => ({ ...prev, [type]: value }))
  }

  const setSelectedClub = (value: ClubType) => {
    setFormValues((prev) => ({
      ...prev,
      contractedClub: value,
      clubId: value.clubId,
      yourClub: value.clubName,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    const valueHistoric: HistoricCareerType = {
      season: formValues.season,
      fromTime: formValues.fromDate,
      toTime: formValues.toDate,
      country: formValues.country,
      league: {
        name: formValues.league,
      },
      clubId: formValues.contractedClub.clubId,
      team: {
        teamName: formValues.team,
        clubId: formValues.contractedClub.clubId,
      },
      role: formValues.role,
      serieMatches: +formValues.serie,
      cupMatches: +formValues.cup,
      friendlyMatches: +formValues.friend,
      wonMatches: +formValues.won,
      lostMatches: +formValues.lost,
      drawMatches: +formValues.draw,
      madeTeamGoals: +formValues.madeTeam,
      letInTeamGoals: +formValues.letInTeamGoal,
      yourGoals: +formValues.yourGoals,
      yourAssists: +formValues.yourAssist,
      yourYellowCards: +formValues.yourYellowCard,
      yourRedCards: +formValues.yourRedCard,
      yourEstPlayTime: +formValues.yourEstimated,
      summary: formValues.summary,
      mediaLinks: images as [{ type: string; url: string }],
    }

    try {
      createCareerHistoric(valueHistoric).then((data) => {
        console.log('data', data)
        if (data.status === 201) {
          window.scroll(0, 0)
          toast.success(data.data)
          setLoading(false)
        }
      })
    } catch (error) {
      toast.error('error')
    }

    setTimeout(() => {
      setLoading(false)
    }, 1000)
  }

  return (
    <div className="space-y-5">
      <BackGround
        label="Historic Career Data"
        className="2xl:w-3/5"
        contentClass="xl:w-[600px]"
      >
        <div className="space-y-7">
          <MySelect
            label="Season"
            onChange={(e) => handleChangeForm('season', e.target.value)}
            arrOption={seasonOption}
            value={formValues.season}
            // defauleValue={date.getFullYear() + ''}
          />

          <div className="flex w-full mt-7">
            <div className="flex-1 mr-[10px]">
              <MyDatePicker
                label="From"
                onChange={(e) => handleChangeForm('fromDate', e)}
                value={formValues.fromDate}
              />
            </div>
            <div className="flex-1 ml-[10px]">
              <MyDatePicker
                label="From"
                onChange={(e) => handleChangeForm('toDate', e)}
                value={formValues.toDate}
              />
            </div>
          </div>

          <MySelectCountry
            label="Country"
            onChange={(_, value) => handleChangeForm('country', value)}
            val={formValues.country}
          />

          <MyInput
            label="League"
            onChange={(e) => handleChangeForm('league', e.target.value)}
            className=""
          />

          <InfiniteScrollClub
            initialValue={formValues.contractedClub}
            handleSetClub={setSelectedClub}
          />

          <MyInput
            label="Team"
            onChange={(e) => handleChangeForm('team', e.target.value)}
          />

          <MySelect
            label="Role"
            onChange={(e) => handleChangeForm('role', e.target.value)}
            arrOption={OptionPlayer}
            // value={}
          />

          <MyInput
            label="Serie matches"
            onChange={(e) => handleChangeForm('serie', e.target.value)}
            value={formValues.serie}
          />
          <MyInput
            label="Cup matches"
            onChange={(e) => handleChangeForm('cup', e.target.value)}
            value={formValues.cup}
          />
          <MyInput
            label="Friendly matches"
            onChange={(e) => handleChangeForm('friend', e.target.value)}
            value={formValues.friend}
          />
          <MyInput
            label="Won matches"
            onChange={(e) => handleChangeForm('won', e.target.value)}
            value={formValues.won}
          />
          <MyInput
            label="Lost matches"
            onChange={(e) => handleChangeForm('lost', e.target.value)}
            value={formValues.lost}
          />
          <MyInput
            label="Draw matches"
            onChange={(e) => handleChangeForm('draw', e.target.value)}
            value={formValues.draw}
          />
          <MyInput
            label="Made Team Goals"
            onChange={(e) => handleChangeForm('madeTeam', e.target.value)}
            value={formValues.madeTeam}
          />
          <MyInput
            label="Let in Team Goals"
            onChange={(e) => handleChangeForm('letInTeamGoal', e.target.value)}
            value={formValues.letInTeamGoal}
          />
          <MyInput
            label="Your Goals"
            onChange={(e) => handleChangeForm('yourGoals', e.target.value)}
            value={formValues.yourGoals}
          />
          <MyInput
            label="Your assist"
            onChange={(e) => handleChangeForm('yourAssist', e.target.value)}
            value={formValues.yourAssist}
          />
          <MyInput
            label="Your Yellow Card"
            onChange={(e) => handleChangeForm('yourYellowCard', e.target.value)}
            value={formValues.yourYellowCard}
          />
          <MyInput
            label="Your Red Card"
            onChange={(e) => handleChangeForm('yourRedCard', e.target.value)}
            value={formValues.yourRedCard}
          />
          <MyInput
            label="Your Estimated Play Time"
            onChange={(e) => handleChangeForm('yourEstimated', e.target.value)}
            value={formValues.yourEstimated}
          />
          <MyTextArea
            placeholder="Write a short summary of your time at this Club"
            onChange={(e) => handleChangeForm('summary', e.target.value)}
            value={formValues.summary}
          />
          <div className="w-full flex mb-[12.5px] mt-[11.75px]">
            <UploadMutilImageVideo
              image
              arrayFiles={arrayFile}
              setArrayFiles={setArrayFile}
            />
            <div className="ml-[31px]">
              <UploadMutilImageVideo
                arrayFiles={arrayFile}
                setArrayFiles={setArrayFile}
              />
            </div>
          </div>

          <ListImageVideo arrayFile={arrayFile} setArrayFile={setArrayFile} />
        </div>
      </BackGround>
      <MyButton
        onClick={handleSubmit}
        isLoading={loading}
        type="submit"
        label="Save"
        className="mt-[24px] mb-[181px]"
      />
    </div>
  )
}
