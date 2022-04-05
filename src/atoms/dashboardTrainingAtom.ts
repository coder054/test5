import { atom } from 'jotai'
import {
  DashboardTrainingType,
  DashboardUpdatesType,
} from 'src/constants/types/dashboard/training.types'

export const dashboardTraining = atom<DashboardTrainingType>({
  personalSessions: {
    group: 0,
    personal: 0,
    team: 0,
  },
  averageSessions: {
    group: 0,
    personal: 0,
    team: 0,
  },
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
  personalTrainingCategory: {
    technical: 0,
    tactics: 0,
    mental: 0,
    physical: 0,
  },
  averageTrainingCategory: {
    technical: 0,
    tactics: 0,
    mental: 0,
    physical: 0,
  },
  trainingType: {
    group: 0,
    private: 0,
    team: 0,
  },
  personalTrainingCategoryOfTotalHours: {
    technical: 0,
    tactics: 0,
    mental: 0,
    physical: 0,
  },
  averageTrainingCategoryOfTotalHours: {
    technical: 0,
    tactics: 0,
    mental: 0,
    physical: 0,
  },
  personalTrainingTypeOfTotalHours: {
    group: 0,
    personal: 0,
    team: 0,
  },
  averageTrainingTypeOfTotalHours: {
    group: 0,
    personal: 0,
    team: 0,
  },
})

export const dashboardTrainingUpdates = atom<DashboardUpdatesType[]>([
  {
    createdAt: 0,
    training: {
      technics: 0,
      hoursOfPractice: 0,
      practiceTags: [''],
      mental: 0,
      physicallyStrain: '',
      typeOfTraining: '',
      physics: 0,
      tactics: 0,
    },
    diaryId: '',
  },
])

export const dashboardTags = atom<string[]>([''])
