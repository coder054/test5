import { useAuth } from '../authentication/auth/AuthContext'
import PlayerDiary from './player'
import CoachDiary from './coach'
import { DashboardUpdatesType } from 'src/constants/types/dashboard/training.types'

interface DiaryUpdateProps {
  selected?: DashboardUpdatesType
  onClose?: (value: boolean) => void
  isWellness?: boolean
}

const DiaryUpdate = ({ selected, onClose, isWellness }: DiaryUpdateProps) => {
  const { currentRoleName } = useAuth()
  switch (currentRoleName) {
    case 'PLAYER':
      return (
        <PlayerDiary
          onClose={onClose}
          selected={selected}
          isWellness={isWellness}
        />
      )
    case 'COACH':
      return <CoachDiary onClose={onClose} />
  }
}
export default DiaryUpdate
