import { useAtom } from 'jotai'
import { useState } from 'react'
import { dashboardTrainingAndMatchAtom } from 'src/atoms/dashboard'
import { ChartCircle } from 'src/components/chart-circle'

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
  ['#4654EA', '#07E1FF', '#09E099'],
]
interface TrainingCircleProps {
  loading?: boolean
  ArrayTrainingMatchDay?: any
}

export const TrainingCircle = ({
  loading,
  ArrayTrainingMatchDay,
}: TrainingCircleProps) => {
  const [data, setData] = useAtom(dashboardTrainingAndMatchAtom)

  return (
    <div className="grid grid-cols-3 md:gap-4">
      <ChartCircle
        index={0}
        type={'training'}
        ArrayColor={ArrayColor}
        ArrayLabel={Object.keys(data.trainingCategory)}
        ArrayPercent={Object.values(data.trainingCategory)}
      />
      <ChartCircle
        index={1}
        type={'training'}
        ArrayColor={ArrayColor}
        ArrayLabel={Object.keys(data.matchResults)}
        ArrayPercent={Object.values(data.matchResults)}
      />
      <ChartCircle
        index={2}
        type={'training'}
        ArrayColor={ArrayColor}
        ArrayLabel={Object.keys(data.dayUsage)}
        ArrayPercent={Object.values(data.dayUsage)}
      />
    </div>
  )
}
