export type itemLandingType = {
  idItem?: number
  title?: string
  content?: string
  image: string
}

export type itemEventHeadlineType = {
  avatar?: string
  background?: string
  fullName?: string
  time?: string
  favorite?: number
  comment?: number
  content?: string
  price?: number
}

export interface OptionType {
  label: string
  value: string | number
}

export interface mediaLinksTypes {
  type: string
  uniqueKey: string
  url: string
}

export interface providerInfoType {
  isFollowed?: boolean
  logo?: string
  name?: string
  providerId?: string
  typeOfProvider?: string
  region?: string
}
export interface NewsType {
  countComments?: number
  countLikes?: number
  createdAt?: number
  excerptText?: string
  headline?: string
  hrefId?: string
  isLiked?: boolean
  link?: string
  mediaLinks: mediaLinksTypes[]
  postId?: string
  providerId?: string
  providerInfo?: providerInfoType
  typeOfPost?: string
  updatedAt?: number
}

export type CountryType = {
  alpha2Code: string
  alpha3Code: string
  flag: string
  name: string
  phoneCode: string
  region: string
}