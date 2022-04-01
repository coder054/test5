import { useAtom } from 'jotai'
import { dashboardTraining } from 'src/atoms/dashboardTrainingAtom'

const TrainingTable = () => {
  const [training] = useAtom(dashboardTraining)

  const sum = (object: any) => {
    return Object.values(object).reduce((a: number, b: number) => a + b, 0)
  }

  const renderCell = (
    type: string,
    ses: number,
    avg: number,
    hour: number,
    avgs: number,
    option: boolean
  ) => {
    return (
      <div className="text-[15px] font-normal grid grid-cols-5 p-4">
        <p>-{type}</p>
        <p>
          {ses}
          {option && '%'}
        </p>
        <p>
          {avg}
          {option && '%'}
        </p>
        <p>{hour}</p>
        <p>{avgs}</p>
      </div>
    )
  }

  return (
    <div className="bg-defaultBackGround rounded-lg w-full">
      <div className="p-10">
        <div className="bg-[#13161A] text-[#A2A5AD] text-[16px] font-medium grid grid-cols-5 px-4 py-2">
          <p>Type</p>
          <p>Ses.</p>
          <p>Avg.</p>
          <p>Hours</p>
          <p>Avg.</p>
        </div>
        <div className="text-[15px] font-normal grid grid-cols-5 p-4">
          <p>Training</p>
          <p>{sum(training.personalSessions)}</p>
          <p>{sum(training.averageSessions)}</p>
          <p>{sum(training.personalTrainingHours)}</p>
          <p>{sum(training.averageTrainingHours)}</p>
        </div>
        {renderCell(
          'Technical',
          training.personalTrainingCategory.technical,
          training.averageTrainingCategory.technical,
          training.personalTrainingCategoryOfTotalHours.technical,
          training.averageTrainingCategoryOfTotalHours.technical,
          true
        )}
        {renderCell(
          'Tactical',
          training.personalTrainingCategory.tactics,
          training.averageTrainingCategory.tactics,
          training.personalTrainingCategoryOfTotalHours.tactics,
          training.averageTrainingCategoryOfTotalHours.tactics,
          true
        )}
        {renderCell(
          'Physical',
          training.personalTrainingCategory.physical,
          training.averageTrainingCategory.physical,
          training.personalTrainingCategoryOfTotalHours.physical,
          training.averageTrainingCategoryOfTotalHours.physical,
          true
        )}
        {renderCell(
          'Mental',
          training.personalTrainingCategory.mental,
          training.averageTrainingCategory.mental,
          training.personalTrainingCategoryOfTotalHours.mental,
          training.averageTrainingCategoryOfTotalHours.mental,
          true
        )}
        {renderCell(
          'Team',
          training.personalSessions.team,
          training.averageSessions.team,
          training.personalTrainingHours.team,
          training.averageTrainingHours.team,
          false
        )}
        {renderCell(
          'Group',
          training.personalSessions.group,
          training.averageSessions.group,
          training.personalTrainingHours.group,
          training.averageTrainingHours.group,
          false
        )}
        {renderCell(
          'Personal',
          training.personalSessions.personal,
          training.averageSessions.personal,
          training.personalTrainingHours.personal,
          training.averageTrainingHours.personal,
          false
        )}
      </div>
    </div>
  )
}

export default TrainingTable
