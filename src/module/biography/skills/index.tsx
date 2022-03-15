import { TextField } from '@mui/material'
import _ from 'lodash'
import React, { useCallback, useState } from 'react'
import { MyButton } from 'src/components/MyButton'
import { MyInputChips } from 'src/components/MyInputChips'
import { MySlider } from 'src/components/MySlider'
import { MyTextArea } from 'src/components/MyTextarea'
import { BackGround } from 'src/module/account-settings/common-components/Background'

type FootBallSkillTypes = {
  technics: number
  tactics: number
  physics: number
  mental: number
}

type RadarChartTypes = {
  attacking: number
  defending: number
  turnovers: number
  setPieces: number
  analytics: number
  playerDevelopment: number
}

const tagsClass =
  'text-white bg-[#13161A] laptopM:py-[10px] laptopM:pl-[10px] laptopM:pr-[20px] mobileM:p-[10px] rounded-[8px]'

export const Skills = () => {
  const [tags, setTags] = useState<string[]>([])
  const [summary, setSummary] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [footballSkills, setFootBallSkills] = useState<FootBallSkillTypes>({
    technics: 60,
    tactics: 25,
    physics: 85,
    mental: 90,
  })

  const [radarChart, setRadarChart] = useState<RadarChartTypes>({
    attacking: 70,
    defending: 55,
    turnovers: 65,
    setPieces: 80,
    analytics: 70,
    playerDevelopment: 75,
  })

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

  const handleSubmit = async () => {}

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
              // onChange={setTags}
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
