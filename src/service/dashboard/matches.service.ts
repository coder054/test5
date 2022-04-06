import { MatchesTrainingType } from 'src/constants/types/dashboard/matches.types'
import { LastRangeDateType } from 'src/constants/types/dashboard/training.types'
import { axios } from 'src/utils/axios'
import { toQueryString } from 'src/utils/common.utils'

export const fetchMatches = async ({
  range,
  type,
}: {
  range: LastRangeDateType
  type: MatchesTrainingType | string
}) => {
  return axios.get(
    toQueryString('dashboard/get-matches-chart', {
      lastDateRange: range,
      type: type,
    })
  )
}
