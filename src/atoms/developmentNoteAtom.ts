import dayjs from 'dayjs'
import { atom } from 'jotai'

export const formValuesDevelopmentNodeAtom = atom({
  strengthPlayer: '',
  strengthCoach: '',
  weaknessesPlayer: '',
  weaknessesCoach: '',
  bestDevelopSkillsPlayer: '',
  bestDevelopSkillsCoach: '',
  skillsNeededToDevelopPlayer: '',
  skillsNeededToDevelopCoach: '',
  bestWayToDevelopPlayer: '',
  bestWayToDevelopCoach: '',
  shortTermGoalPlayer: '',
  shortTermGoalCoach: '',
  longTermGoalPlayer: '',
  longTermGoalCoach: '',
  otherCommentsPlayer: '',
  otherCommentsCoach: '',
  date: dayjs(new Date()).format('YYYY/MM/DD'),
  dateCoachComment: dayjs(new Date()).format('YYYY/MM/DD'),
  progress: 'NORMAL',
  contractedClub: {
    arena: '',
    city: '',
    clubId: '',
    clubName: '',
    country: '',
    logoUrl: '',
    websiteUrl: null,
  },
  currentTeams: '',
  player: {
    userId: '',
  },
})

// const [formValues, setFormValues]: [IDevelopmentFormValues, Function] = useAtom(
//   formValuesDevelopmentNodeAtom
// )
