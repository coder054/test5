import { TextField } from '@mui/material'
import _ from 'lodash'
import React, { useCallback, useState } from 'react'
import { MySlider } from 'src/components/MySlider'

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

export const Skills = () => {
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

  return (
    <div className="space-y-12">
      <div className="space-y-7">
        <p className="text-white bg-[#13161A] p-[10px] rounded-[8px]">
          Update how your football skill, specialitites and attributes has
          developed lately compared to peers in your age?
        </p>
        <div className="space-y-1">
          {Object.keys(footballSkills).map((skill: string) => (
            <MySlider
              isStar
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
        <p className="text-white bg-[#13161A] py-[10px] px-[14px] rounded-[8px]">
          And to be a bit more detailed, so we can update your radar chart
        </p>
        <div className="space-y-1">
          {Object.keys(radarChart).map((chart) => (
            <MySlider
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
        <p className="text-white bg-[#13161A] py-[10px] px-[14px] rounded-[8px]">
          Now update the profile summary of yourself and your specialities
        </p>
        <TextField
          sx={{
            '& .MuiOutlinedInput-root': {
              '& legend': {
                display: 'none',
              },
            },
            '& MuiOutlinedInput-input': {
              color: '#ffffff',
              fontSize: 12,
            },
          }}
          placeholder="As for ex, - Fast, hard shooting, power forward and striker with an amazing left foot."
          fullWidth
          multiline
          rows={6}
        />
      </div>
    </div>
  )
}
