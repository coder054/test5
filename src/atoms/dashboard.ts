import { atom } from 'jotai'
import { AnalyticsType } from 'src/constants/types'
import { DashboardTrainingAndMatchType } from 'src/constants/types/dashboard/training.types'

export const dashboardTrainingAndMatchAtom =
  atom<DashboardTrainingAndMatchType>({
    personalTrainingHours: {
      group: 0,
      personal: 0,
      team: 0,
    },
    averageTrainingHours: {
      group: 0,
      personal: 0,
      team: 0,
    },
    personalMatchHours: {
      cupMatch: 0,
      friendlyMatch: 0,
      seriesMatch: 0,
    },
    averageMatchHours: {
      cupMatch: 0,
      friendlyMatch: 0,
      seriesMatch: 0,
    },
    personalTotalHours: {
      training: 0,
      matches: 0,
    },
    averageTotalHours: {
      training: 0,
      matches: 0,
    },
    trainingCategory: {
      technical: 0,
      tactics: 0,
      mental: 0,
      physical: 0,
    },
    matchResults: {
      wins: 0,
      draws: 0,
      losses: 0,
    },
    dayUsage: {
      training: 0,
      match: 0,
      rest: 0,
    },
  })

export const dashboardVisitAtom = atom<AnalyticsType>({
  count: 0,
  chart: [
    {
      index: 0,
      value: 0,
      day: '',
    },
    {
      index: 0,
      value: 0,
      day: '',
    },
    {
      index: 0,
      value: 0,
      day: '',
    },
    {
      index: 0,
      value: 0,
      day: '',
    },
    {
      index: 0,
      value: 0,
      day: '',
    },
    {
      index: 0,
      value: 0,
      day: '',
    },
    {
      index: 0,
      value: 0,
      day: '',
    },
    {
      index: 0,
      value: 0,
      day: '',
    },
  ],
  percentChanged: 0,
})

export const dashboardVisitorAtom = atom<AnalyticsType>({
  count: 0,
  chart: [
    {
      index: 0,
      value: 0,
      day: '',
    },
    {
      index: 0,
      value: 0,
      day: '',
    },
    {
      index: 0,
      value: 0,
      day: '',
    },
    {
      index: 0,
      value: 0,
      day: '',
    },
    {
      index: 0,
      value: 0,
      day: '',
    },
    {
      index: 0,
      value: 0,
      day: '',
    },
    {
      index: 0,
      value: 0,
      day: '',
    },
    {
      index: 0,
      value: 0,
      day: '',
    },
  ],
  percentChanged: 0,
})
export const dashboardFanAtom = atom<AnalyticsType>({
  count: 0,
  chart: [
    {
      index: 0,
      value: 0,
      day: '',
    },
    {
      index: 0,
      value: 0,
      day: '',
    },
    {
      index: 0,
      value: 0,
      day: '',
    },
    {
      index: 0,
      value: 0,
      day: '',
    },
    {
      index: 0,
      value: 0,
      day: '',
    },
    {
      index: 0,
      value: 0,
      day: '',
    },
    {
      index: 0,
      value: 0,
      day: '',
    },
    {
      index: 0,
      value: 0,
      day: '',
    },
  ],
  percentChanged: 0,
})
export const dashboardFriendAtom = atom<AnalyticsType>({
  count: 0,
  chart: [
    {
      index: 0,
      value: 0,
      day: '',
    },
    {
      index: 0,
      value: 0,
      day: '',
    },
    {
      index: 0,
      value: 0,
      day: '',
    },
    {
      index: 0,
      value: 0,
      day: '',
    },
    {
      index: 0,
      value: 0,
      day: '',
    },
    {
      index: 0,
      value: 0,
      day: '',
    },
    {
      index: 0,
      value: 0,
      day: '',
    },
    {
      index: 0,
      value: 0,
      day: '',
    },
  ],
  percentChanged: 0,
})
