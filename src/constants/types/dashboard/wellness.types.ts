export type DashboardWellnessType =
  | 'sleep'
  | 'eatAndDrink'
  | 'energyLevel'
  | string

export type WellnessChartType = Partial<{
  personalDiaryRoutineChart: DiaryRoutineChart[]
  averageDiaryRoutineChart: DiaryRoutineChart[]
  personalDiaryRoutinePieChart: DiaryRoutinePieChart
  averageDiaryRoutinePieChart: DiaryRoutinePieChart
}>

export interface DiaryRoutineChart {
  index: number
  value: number
  day: Date
}

export interface DiaryRoutinePieChart {
  veryBad: number
  bad: number
  normal: number
  good: number
  veryGood: number
}
