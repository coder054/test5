export type DashboardUpdatesType = {
  createdAt?: number
  training: {
    technics: number
    hoursOfPractice: number
    practiceTags: string[]
    mental: number
    physicallyStrain: string
    typeOfTraining: string
    physics: number
    tactics: number
    trainingMedia: string[]
  }
  diaryId: string
}

export type DashboardTrainingType = Partial<{
  personalSessions: AverageSessionsType
  averageSessions: AverageSessionsType
  personalTrainingHours: AverageSessionsType
  averageTrainingHours: AverageSessionsType
  personalTrainingCategory: AverageTrainingCategoryType
  averageTrainingCategory: AverageTrainingCategoryType
  trainingType: TrainingType
  personalTrainingCategoryOfTotalHours: AverageTrainingCategoryType
  averageTrainingCategoryOfTotalHours: AverageTrainingCategoryType
  personalTrainingTypeOfTotalHours: AverageSessionsType
  averageTrainingTypeOfTotalHours: AverageSessionsType
}>

export type DashboardTrainingAndMatchType = Partial<{
  personalTrainingHours: AverageSessionsType
  averageTrainingHours: AverageSessionsType
  personalMatchHours: MatchHours
  averageMatchHours: MatchHours
  personalTotalHours: TotalHours
  averageTotalHours: TotalHours
  trainingCategory: AverageTrainingCategoryType
  matchResults: MatchResultType
  dayUsage: DayUsageType
}>

export interface AverageSessionsType {
  group: number
  personal: number
  team: number
}

export interface AverageTrainingCategoryType {
  technical: number
  tactics: number
  mental: number
  physical: number
}

export interface TrainingType {
  group: number
  private: number
  team: number
}

export interface MatchHours {
  cupMatch: number
  friendlyMatch: number
  seriesMatch: number
}

export interface TotalHours {
  training: number
  matches: number
}

export interface MatchResultType {
  wins: number
  draws: number
  losses: number
}
export interface DayUsageType {
  training: number
  match: number
  rest: number
}

export type LastRangeDateType =
  | '7'
  | '30'
  | '90'
  | '180'
  | '365'
  | '1095'
  | 'All'
  | string
export type DashboardTabType = 'TOTAL' | 'TRAINING' | 'MATCH'
