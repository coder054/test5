import { EventType, ResultType, ReviewType, StatType } from './match.types'
import { CountryType } from '../types'

export type CapType = Partial<{
  typeOfGame: string
  typeOfCap: string
  country: CountryType
  dateTime: string | Date
  length: number
  yourTeam: string
  opponentCountry: CountryType
  opponentTeam: string
  arena: string
  result: ResultType
  stats: StatType[]
  events: EventType[]
  review: ReviewType
  capMedia: any[]
  place: string
}>
