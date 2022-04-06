import { useEffect, useMemo, useState } from 'react'
import { useQuery } from 'react-query'
import { Loading } from 'src/components'
import { QUERIES_DASHBOARD } from 'src/constants/query-keys/query-keys.constants'
import { MatchesTableType } from 'src/constants/types/match.types'
import { fetchTraining } from 'src/service/dashboard/training.service'
import Ticket from '../components/Ticket'
import { upperFirst } from 'src/hooks/functionCommon'

type MatchesTableProps = {
  range: string
}

export const MatchesTable = ({ range }: MatchesTableProps) => {
  const [formValues, setFormValues] = useState<MatchesTableType>({
    matchStatisticAverage: {
      totalMatchType: {
        cupMatch: 0,
        friendlyMatch: 0,
        seriesMatch: 0,
      },
      netScore: 0,
      averagePoint: 0,
      averagePlayingTime: 0,
      averageGoal: 0,
      averageAssist: 0,
      averageCard: 0,
      role: '',
    },
    matchInTotalStatistic: {
      hours: 0,
      matches: 0,
      points: 0,
      goals: 0,
      assists: 0,
      yel: 0,
      red: 0,
    },
  })

  const { isLoading: isGettingMatches, data: responseDisplay } = useQuery(
    [QUERIES_DASHBOARD.MATCHES_TABLE, range],
    () => fetchTraining({ range: range, tab: 'MATCH' })
  )

  const totalMatch = useMemo(() => {
    const shortCut = formValues.matchStatisticAverage.totalMatchType
    return `${shortCut.seriesMatch}/${shortCut.cupMatch}/${shortCut.friendlyMatch}`
  }, [JSON.stringify(formValues)])

  useEffect(() => {
    responseDisplay && setFormValues(responseDisplay.data)
  }, [JSON.stringify(responseDisplay)])

  return (
    <Loading
      isLoading={isGettingMatches}
      className="col-span-5 bg-defaultBackGround rounded-lg"
    >
      <div className="flex laptopM:flex-col space-y-9 p-8">
        <div className="flex-1 grid grid-cols-4 gap-y-6">
          <Ticket title="Ser/Cup/Fri" value={totalMatch} />
          <Ticket
            title="Av. Points"
            value={formValues.matchStatisticAverage.averagePoint}
          />
          <Ticket
            title="Net Score"
            value={formValues.matchStatisticAverage.netScore}
          />
          <Ticket title="Role" value={formValues.matchStatisticAverage.role} />
          <Ticket
            title="Play time"
            value={formValues.matchStatisticAverage.averagePlayingTime}
          />
          <Ticket
            title="Av. Goals"
            value={formValues.matchStatisticAverage.averageGoal}
          />
          <Ticket
            title="Av. Assists"
            value={formValues.matchStatisticAverage.averageAssist}
          />
          <Ticket
            title="Av. Cards"
            value={formValues.matchStatisticAverage.averageCard}
          />
        </div>
        <p className="font-bold text-[18px]">Matches</p>
        <div className="flex justify-between">
          {Object.keys(formValues.matchInTotalStatistic).map((it: string) => (
            <div className="flex flex-col space-y-4 items-center justify-center">
              <p className="text-[#A2A5AD] font-normal text-[16px]">
                {upperFirst(it)}
              </p>
              <p className="text-[24px] font-medium">
                {formValues.matchInTotalStatistic[it]}
              </p>
            </div>
          ))}
        </div>
      </div>
    </Loading>
  )
}
