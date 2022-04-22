export interface InjuryReportType {
  createdAt: number
  description: string
  isFront: boolean
  injuryPosition: {
    y: number
    x: number
  }
  injuryTags: []
  injuryArea: string
  painLevel: string
  updatedAt: number
  treatment: string
  userId: string
  injuryMedia: []
  injuryId: string
  diaryId: string
}
