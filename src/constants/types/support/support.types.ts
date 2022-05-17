export interface FAQsType {
  topics: Topic[]
  faqs: FAQ[]
}

export interface FAQ {
  question: string
  answer: string
  thumbnailUrl: null
  topic: Topic
  createdDate: number
  updatedDate: number | null
}

export enum Topic {
  AboutZporter = 'ABOUT ZPORTER',
  AccountSettings = 'ACCOUNT_SETTINGS',
  Biography = 'BIOGRAPHY',
  Diary = 'DIARY',
  Feed = 'FEED',
  MessagesNotifications = 'MESSAGES & NOTIFICATIONS',
  SignUpIn = 'SIGN_UP_IN',
}
