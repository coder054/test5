import _ from 'lodash'
import React, { useCallback, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { MyButton } from 'src/components/MyButton'
import { MyInputChips } from 'src/components/MyInputChips'
import { MySlider } from 'src/components/MySlider'
import { MyTextArea } from 'src/components/MyTextarea'
import { API_PLAYER_SETTINGS } from 'src/constants/api.constants'
import { UpdateSkills } from 'src/constants/types'
import { BackGround } from 'src/module/account-settings/common-components/Background'
import { useAuth } from 'src/module/authen/auth/AuthContext'
import { getProfilePlayer } from 'src/service/dashboard/biography-update'
import { axios } from 'src/utils/axios'

type FootBallSkillTypes = {
  technics: number
  tactics: number
  physics: number
  mental: number
  leftFoot: number
  rightFoot: number
}

type RadarChartTypes = {
  attacking: number
  dribbling: number
  passing: number
  shooting: number
  heading: number
  defending: number
  tackling: number
  pace: number
}

interface SkillProps {
  playerId?: string
}

const tagsClass =
  'text-white bg-[#13161A] laptopM:py-[10px] laptopM:pl-[10px] laptopM:pr-[20px] mobileM:p-[10px] rounded-[8px]'

export const Skills = ({ playerId }: SkillProps) => {
  const { currentRoleName } = useAuth()
  const [tags, setTags] = useState<string[]>([])
  const [summary, setSummary] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [footballSkills, setFootBallSkills] = useState<FootBallSkillTypes>({
    technics: 0,
    tactics: 0,
    physics: 0,
    mental: 0,
    leftFoot: 0,
    rightFoot: 0,
  })

  const [radarChart, setRadarChart] = useState<RadarChartTypes>({
    attacking: 0,
    dribbling: 0,
    passing: 0,
    shooting: 0,
    heading: 0,
    defending: 0,
    tackling: 0,
    pace: 0,
  })

  useEffect(() => {
    if (currentRoleName === 'PLAYER') {
      try {
        const res = getProfilePlayer()
        res.then((data) => {
          setFootBallSkills({
            technics: data.data.playerSkills.overall.technics * 20,
            tactics: data.data.playerSkills.overall.tactics * 20,
            physics: data.data.playerSkills.overall.physics * 20,
            mental: data.data.playerSkills.overall.mental * 20,
            leftFoot: data.data.playerSkills.overall.leftFoot * 20,
            rightFoot: data.data.playerSkills.overall.rightFoot * 20,
          })
          setRadarChart({
            attacking: data.data.playerSkills.radar.attacking,
            dribbling: data.data.playerSkills.radar.dribbling,
            passing: data.data.playerSkills.radar.passing,
            shooting: data.data.playerSkills.radar.shooting,
            heading: data.data.playerSkills.radar.heading,
            defending: data.data.playerSkills.radar.defending,
            tackling: data.data.playerSkills.radar.tackling,
            pace: data.data.playerSkills.radar.pace,
          })
          setSummary(data.data.playerCareer.summary)
          setTags(data.data.playerSkills.specialityTags)
        })
      } catch (error) {}
    }
  }, [playerId, currentRoleName])

  const handleChangeSkills = useCallback(
    (type: keyof FootBallSkillTypes, value: number) => {
      setFootBallSkills((prev) => ({ ...prev, [type]: value }))
    },
    [footballSkills]
  )

  const handleChangeChart = useCallback(
    (type: keyof RadarChartTypes, value: number) => {
      setRadarChart((prev) => ({ ...prev, [type]: value }))
    },
    [radarChart]
  )

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    const updateSkills: UpdateSkills = {
      playerSkills: {
        specialityTags: tags,
        overall: {
          mental: footballSkills.mental / 20,
          physics: footballSkills.physics / 20,
          tactics: footballSkills.tactics / 20,
          technics: footballSkills.technics / 20,
          leftFoot: footballSkills.leftFoot / 20,
          rightFoot: footballSkills.rightFoot / 20,
        },
        radar: {
          attacking: radarChart.attacking,
          defending: radarChart.defending,
          dribbling: radarChart.dribbling,
          passing: radarChart.passing,
          shooting: radarChart.shooting,
          pace: radarChart.pace,
          tackling: radarChart.tackling,
          heading: radarChart.heading,
        },
      },
      playerCareer: {
        summary: summary,
      },
    }

    try {
      const response = await axios.patch(API_PLAYER_SETTINGS, updateSkills)

      if (response.status === 200) {
        setLoading(false)
        toast.success(response.data)
        window.scroll(0, 0)
      }
    } catch (error) {
      setTimeout(() => {
        setLoading(false)
      }, 1000)
    }
    setTimeout(() => {
      setLoading(false)
    }, 1000)
  }

  return (
    <div className="space-y-5">
      <BackGround
        label="Player Skill update"
        className="2xl:w-3/5"
        contentClass="xl:w-[600px]"
      >
        <div className="space-y-12">
          <div className="space-y-7">
            <p className={tagsClass}>
              Update how your football skill, specialitites and attributes has
              developed lately compared to peers in your age?
            </p>
            <div className="space-y-1">
              {Object.keys(footballSkills).map((skill: string) => (
                <MySlider
                  isStar
                  key={skill}
                  step={5}
                  readOnly={true}
                  label={_.upperFirst(skill)}
                  onChange={(e) =>
                    handleChangeSkills(skill as keyof FootBallSkillTypes, e)
                  }
                  labelClass="text-[#A2A5AD]"
                  value={footballSkills[skill]}
                />
              ))}
            </div>
          </div>
          <div className="space-y-7">
            <p className={tagsClass}>
              And to be a bit more detailed, so we can update your radar chart
            </p>
            <div className="space-y-1">
              {Object.keys(radarChart).map((chart) => (
                <MySlider
                  step={1}
                  isPoint
                  key={chart}
                  label={_.upperFirst(chart)}
                  onChange={(e) =>
                    handleChangeChart(chart as keyof RadarChartTypes, e)
                  }
                  labelClass="text-[#A2A5AD]"
                  value={radarChart[chart]}
                />
              ))}
            </div>
          </div>
          <div className="space-y-7">
            <p className={tagsClass}>
              Now update the profile summary of yourself and your specialities
            </p>
            <MyTextArea
              placeholder="As for ex, - Fast, hard shooting, power forward and striker with an amazing left foot."
              value={summary}
              onChange={(e) => {
                setSummary(e.target.value)
              }}
            />
            <MyInputChips
              label="Speciality tags"
              labelClass="text-[#A2A5AD]"
              value={tags}
              setTags={setTags}
            />
          </div>
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
