import { InputAdornment, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { ModalShowImage, MyInput } from 'src/components'
import { ListImageVideo } from 'src/components/list-image-video'
import { ModalShowVideo } from 'src/components/modal-show-video'
import { MyButton } from 'src/components/MyButton'
import { MyDatePicker } from 'src/components/MyDatePicker'
import { MyModal } from 'src/components/MyModal'
import { MySelect } from 'src/components/MySelect'
import { MySelectCountry } from 'src/components/MySelectCountry'
import { MyTextArea } from 'src/components/MyTextarea'
import { UploadMutilImageVideo } from 'src/components/upload-mutil-image-video'
import { END_YEAR, IMAGE, START_YEAR } from 'src/constants/constants'
import { CountryType, HistoricCareerType } from 'src/constants/types'
import { ClubType } from 'src/constants/types/settingsType.type'
import { useIncrementNumber } from 'src/hooks/useIncrementNumber'
import { BackGround } from 'src/modules/account-settings/common-components/Background'
import { InfiniteScrollClub } from 'src/modules/account-settings/football/components/InfiniteScrollClub'
import { OptionPlayer } from 'src/modules/authentication/types'
import {
  createCareerHistoric,
  getProfilePlayer,
} from 'src/service/dashboard/biography-update'

interface HistoricProps {
  playerId?: string
}
interface FormValuesType {
  season?: string
  fromDate?: string | Date
  toDate?: string | Date
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

export const Historic = ({ playerId }: HistoricProps) => {
  const date = new Date()
  const [loading, setLoading] = useState<boolean>(false)
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false)
  const [showUrl, setShowUrl] = useState('')
  const [images, setImages] = useState([])
  const [arrayFile, setArrayFile] = useState([])
  const [progress, setProgress] = useState<number>(0)

  var firstDay = new Date(date.getFullYear(), 0)
  var lastDay = new Date(date.getFullYear(), 11)

  const [formValues, setFormValues] = useState<FormValuesType>({
    season: date.getFullYear() + '',
    fromDate: firstDay,
    toDate: lastDay,
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
    role: 'RB',
    serie: 22,
    cup: 8,
    friend: 10,
    won: 20,
    lost: 10,
    draw: 10,
    madeTeam: 80,
    letInTeamGoal: 40,
    yourGoals: 10,
    yourAssist: 10,
    yourYellowCard: 0,
    yourRedCard: 0,
    yourEstimated: 50,
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

  useEffect(() => {
    const getProfile = async () => {
      try {
        await getProfilePlayer().then((data) => {
          setFormValues((prev) => ({
            ...prev,
            country: data.data.profile.birthCountry,
            contractedClub: data.data.playerCareer.contractedClub,
            team: data.data.playerCareer.currentTeams[0]?.teamName,
            role: data.data.playerCareer.favoriteRoles[0],
          }))
        })
      } catch (error) {}
    }

    getProfile()
  }, [])

  const seasonOption = useIncrementNumber({
    startNumber: START_YEAR,
    endNumber: END_YEAR,
  })

  useEffect(() => {
    arrayFile.forEach((item) => {
      setImages((prev) => [
        ...prev,
        {
          type: IMAGE,
          url: item,
        },
      ])
    })
  }, [arrayFile])

  const handleShow = (url: string) => {
    setIsOpenModal(true)
    setShowUrl(url)
  }

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
    if (!formValues.league) {
      toast.error('Required fields League must be filled in.')
      setTimeout(() => {
        setLoading(false)
      }, 1000)
      return
    }
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
    if (formValues.season !== formValues?.fromDate?.toString().slice(11, 15)) {
      toast.error('Make sure you enter a right timing for your historic club')
      setLoading(false)
      return
    }

    if (+formValues.yourEstimated < 1) {
      toast.error('Estimated Time must not be less than 1')
      setLoading(false)
      return
    }
    if (
      +formValues.serie + +formValues.cup + +formValues.friend !==
      +formValues.won + +formValues.lost + +formValues.draw
    ) {
      toast.error(
        'total of serieMatches + cupMatches + friendlyMatches has to equal to wonMatches + lostMatches + drawMatches'
      )
      setLoading(false)

      return
    }

    try {
      createCareerHistoric(valueHistoric).then((data) => {
        if (data?.status === 201) {
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
                label="To"
                onChange={(e) => handleChangeForm('toDate', e)}
                value={formValues.toDate}
                minDate={formValues.fromDate}
              />
            </div>
          </div>

          <MySelectCountry
            label="Country"
            onChange={(_, value) => handleChangeForm('country', value)}
            value={formValues.country}
          />

          <MyInput
            label="League"
            onChange={(e) => handleChangeForm('league', e.target.value)}
            className=""
          />

          <InfiniteScrollClub
            label="Club"
            value={formValues.contractedClub}
            handleSetClub={setSelectedClub}
          />

          <MyInput
            label="Team"
            onChange={(e) => handleChangeForm('team', e.target.value)}
            value={formValues.team}
            defaultValue={formValues.team}
          />

          <MySelect
            label="Role"
            onChange={(e) => handleChangeForm('role', e.target.value)}
            arrOption={OptionPlayer}
            value={formValues.role}
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
            defaultValue="10"
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

          <TextField
            fullWidth
            label="Resting pulse"
            value={formValues.yourEstimated}
            onChange={(e) => handleChangeForm('yourEstimated', e.target.value)}
            InputProps={{
              endAdornment: <InputAdornment position="end">%</InputAdornment>,
            }}
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
              setProgress={setProgress}
            />
            <div className="ml-[31px]">
              <UploadMutilImageVideo
                arrayFiles={arrayFile}
                setArrayFiles={setArrayFile}
                setProgress={setProgress}
              />
            </div>
          </div>
          <ListImageVideo
            arrayFile={arrayFile}
            setArrayFile={setArrayFile}
            progress={progress}
            setIsOpenModal={setIsOpenModal}
            handleShow={handleShow}
          />
        </div>
      </BackGround>
      <MyButton
        onClick={handleSubmit}
        isLoading={loading}
        type="submit"
        label="Save"
        className="mt-[24px] mb-[181px]"
      />

      <MyModal width={751} show={isOpenModal} setShow={setIsOpenModal}>
        {showUrl.includes('mp4') ? (
          <ModalShowVideo url={showUrl} setIsOpenModal={setIsOpenModal} />
        ) : (
          <ModalShowImage url={showUrl} setIsOpenModal={setIsOpenModal} />
        )}
      </MyModal>
    </div>
  )
}
