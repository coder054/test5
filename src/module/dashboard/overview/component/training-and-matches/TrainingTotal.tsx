import { useState } from 'react'
import { ChartTotal } from 'src/components/chart-total'

const cls = require('../../overview.module.css')

const ArrayTrainingMatchTotal = [
  {
    you: {
      T: 20,
      G: 60,
      P: 10,
    },
    avg: {
      T: 5,
      G: 30,
      P: 24,
    },
  },
  {
    you: {
      T: 10,
      G: 40,
      P: 20,
    },
    avg: {
      T: 5,
      G: 30,
      P: 24,
    },
  },
  {
    you: {
      T: 10,
      M: 30,
    },
    avg: {
      T: 5,
      M: 30,
    },
  },
]

export const TrainingTotal = () => {
  const [trainingTotal, setTrainingTotal] = useState(ArrayTrainingMatchTotal)

  return (
    <div className="grid grid-cols-3 gap-2">
      {trainingTotal &&
        trainingTotal.map((chart, index) => (
          <ChartTotal chart={chart} index={index + 1} />
        ))}
    </div>
  )
}
