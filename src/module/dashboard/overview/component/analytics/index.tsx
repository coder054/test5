import { Chart } from 'src/components/chart'
import { FC, useState, useEffect } from 'react'
import type { ApexOptions } from 'apexcharts'
import { alpha, useTheme } from '@mui/material/styles'
import { DataAnalytic } from 'src/constants/types'
import { Box, Card, Grid, Typography } from '@mui/material'
import {
  SvgAddFriend,
  SvgDeincrement,
  SvgEye,
  SvgFan,
  SvgFavorite,
  SvgIncrement,
  SvgVisitor,
} from 'src/imports/svgs'
import { AnalyticItem } from 'src/components'
import { useQuery } from 'react-query'
import { QUERIES_DASHBOARD } from 'src/constants/query-keys/query-keys.constants'
import {
  getDashboardFansStat,
  getDashboardFriendStat,
  getDashboardVisitorStat,
  getDashboardVisitStat,
} from 'src/service/dashboard-overview'
import { useAtom } from 'jotai'
import {
  dashboardFanAtom,
  dashboardFriendAtom,
  dashboardVisitAtom,
  dashboardVisitorAtom,
} from 'src/atoms/dashboard'
const cls = require('../../overview.module.css')

interface AnalyticsProps {
  lastDateRange?: string
  setLastDateRange?: (lastDate: string) => void
}

export const Analytics = ({
  lastDateRange,
  setLastDateRange,
}: AnalyticsProps) => {
  const [dateRange, setdateRange] = useState<string>(lastDateRange)

  const [visitAtom, setVisitAtom] = useAtom(dashboardVisitAtom)
  const [visitorAtom, setVisitorAtom] = useAtom(dashboardVisitorAtom)
  const [fanAtom, setFanAtom] = useAtom(dashboardFanAtom)
  const [friendAtom, setFriendAtom] = useAtom(dashboardFriendAtom)

  const { isLoading: loadingVisit, data: dataVisit } = useQuery(
    [QUERIES_DASHBOARD.DASHBOARD_VISIT, lastDateRange],
    () => getDashboardVisitStat(lastDateRange)
  )

  const { isLoading: loadingVisitor, data: dataVisitor } = useQuery(
    [QUERIES_DASHBOARD.DASHBOARD_VISITOR, lastDateRange],
    () => getDashboardVisitorStat(lastDateRange)
  )

  const { isLoading: loadingFan, data: dataFan } = useQuery(
    [QUERIES_DASHBOARD.DASHBOARD_FAN, lastDateRange],
    () => getDashboardFansStat(lastDateRange)
  )

  const { isLoading: loadingFriend, data: dataFiend } = useQuery(
    [QUERIES_DASHBOARD.DASHBOARD_FRIEND, lastDateRange],
    () => getDashboardFriendStat(lastDateRange)
  )

  useEffect(() => {
    dataVisit && setVisitAtom(dataVisit)
  }, [dataVisit, lastDateRange])
  useEffect(() => {
    dataVisitor && setVisitorAtom(dataVisitor)
  }, [dataVisitor, lastDateRange])
  useEffect(() => {
    dataFan && setFanAtom(dataFan)
  }, [dataFan, lastDateRange])
  useEffect(() => {
    dataFiend && setFriendAtom(dataFiend)
  }, [dataFiend, lastDateRange])

  return (
    <Grid
      container
      className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 lg:gap-6"
    >
      <Grid>
        <AnalyticItem
          loading={loadingVisit}
          data={visitAtom}
          color="#E85CFF"
          backgroundColor="bg-[#E85CFF]"
          title="Visits"
          icon={<SvgEye />}
        />
      </Grid>
      <Grid spacing={4}>
        <AnalyticItem
          loading={loadingVisitor}
          data={visitorAtom}
          color="#4654EA"
          backgroundColor="bg-[#4654EA]"
          title="Visitors"
          icon={<SvgVisitor />}
        />
      </Grid>

      <Grid spacing={4}>
        <AnalyticItem
          loading={loadingFan}
          data={fanAtom}
          color="#07E1FF"
          backgroundColor="bg-[#07E1FF]"
          title="Fans"
          icon={<SvgFan />}
        />
      </Grid>

      <Grid spacing={4}>
        <AnalyticItem
          loading={loadingFriend}
          data={friendAtom}
          color="#09E099"
          backgroundColor="bg-[#09E099]"
          title="Friends"
          icon={<SvgAddFriend />}
        />
      </Grid>
    </Grid>
  )
}
