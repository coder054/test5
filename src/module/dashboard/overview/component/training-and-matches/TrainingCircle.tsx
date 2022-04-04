import { useState } from 'react'
import { ChartCircle } from 'src/components/chart-circle'

const cls = require('../../overview.module.css')

const ArrayTrainingMatchDay = [
  {
    tactital: 50,
    physical: 20,
    technical: 20,
    mental: 10,
  },
  {
    wins: 35,
    draws: 45,
    losses: 20,
  },
  {
    injured: 5,
    training: 45,
    match: 25,
    rest: 25,
  },
]

const ArrayColor = [
  ['#E85CFF', '#4654EA', '#07E1FF', '#09E099'],
  ['#E85CFF', '#4654EA', '#07E1FF'],
  ['#E85CFF', '#4654EA', '#07E1FF', '#09E099'],
]
const ArrayLabel = [
  ['Tactital', 'Physical', 'Technical', 'Mental'],
  ['Wins', 'Draws', 'Losses'],
  ['Injured', 'Training', 'Match', 'Rest'],
]
const ArrayPercent = [
  [10, 20, 20, 50],
  [30, 65, 5],
  [10, 20, 20, 50],
]

export const TrainingCircle = () => {
  const [trainingDay, setTrainingDay] = useState(ArrayTrainingMatchDay)

  return (
    <div className="grid grid-cols-3 gap-4">
      {trainingDay &&
        trainingDay.map((chart, index) => {
          return (
            <ChartCircle
              chart={chart}
              index={index}
              key={index}
              type={'training'}
              ArrayColor={ArrayColor}
              ArrayLabel={ArrayLabel}
              ArrayPercent={ArrayPercent}
            />
          )
        })}
    </div>
  )
}
