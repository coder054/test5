import { atom } from 'jotai'

export const notificationsAtom = atom([])
// const [notifications, setNotifications] = useAtom(notificationsAtom)
export const dataModalResponseGroupAtom = atom({})
export const dataModalResponseTeamAtom = atom({})
export const dataModalResponseDeleteFromTeamAtom = atom({})

export const dataModalResponseNotWantToBeDeletedFromTeamAtom = atom({})

export const dataModalResponseAskJoinGroupAtom = atom({})

export const dataModalResponseAskJoinTeamAtom = atom({})
export const dataModalResponseTeamTrainingAtom = atom({})
export const dataModalResponseMatchAtom = atom<any>(null)

export const dataModalResponseCoachReviewAtom = atom({})
// const [dataModalResponseCoachReview, setDataModalResponseCoachReview] = useAtom(dataModalResponseCoachReviewAtom)

// const [dataModalResponssMatch, setDataModalResponssMatch] = useAtom(
//   dataModalResponseMatchAtom
// )

// const [dataModalResponseTeamTraining, setDataModalResponseTeamTraining] = useAtom(dataModalResponseTeamTrainingAtom)

// const [dataModalResponseAskJoinTeam, setDataModalResponseAskJoinTeam] = useAtom(dataModalResponseAskJoinTeamAtom)
// const [dataModalResponseAskJoinGroup, setDataModalResponseAskJoinGroup] = useAtom(dataModalResponseAskJoinGroupAtom)

// const [
//   dataModalResponseNotWantToBeDeletedFromTeam,
//   setDataModalResponseNotWantToBeDeletedFromTeam,
// ] = useAtom(dataModalResponseNotWantToBeDeletedFromTeamAtom)

// const [dataModalResponseGroup, setDataModalResponseGroup] = useAtom(dataModalResponseGroupAtom)
// const [dataModalResponseTeam, setDataModalResponseTeam] = useAtom(dataModalResponseTeamAtom)
