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

interface AnalyticsProps {}

const arrayAnalytics = [
  {
    title: 'Visits',
    total: 2131,
    percent: 2.2,
    icon: null,
    data: [0, 60, 30, 60, 0, 30, 10, 30, 0],
    color: '#E85CFF',
  },
  {
    title: 'Visitors',
    total: 213,
    percent: 2.2,
    icon: null,
    data: [0, 60, 30, 60, 0, 30, 10, 30, 0],
    color: '#4654EA',
  },
  {
    title: 'Fans',
    total: 1131,
    percent: 5.2,
    icon: null,
    data: [0, 60, 30, 60, 0, 30, 10, 30, 0],
    color: '#07E1FF',
  },
  {
    title: 'Friends',
    total: 131,
    percent: 0.2,
    icon: null,
    data: [0, 60, 30, 60, 0, 30, 10, 30, 0],
    color: '#09E099',
  },
]

const arrayIcon = [
  {
    id: '0',
    icon: <SvgEye />,
    className: 'bg-[#E85CFF]',
  },
  {
    id: '1',
    icon: <SvgVisitor />,
    className: 'bg-[#4654EA]',
  },
  {
    id: '2',
    icon: <SvgFan />,
    className: 'bg-[#07E1FF]',
  },
  {
    id: '3',
    icon: <SvgAddFriend />,
    className: 'bg-[#09E099]',
  },
]

export const Analytics = () => {
  const [lastDateRange, setLastDateRange] = useState<string>('7')
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
  }, [dataVisit])
  useEffect(() => {
    dataVisitor && setVisitorAtom(dataVisitor)
  }, [dataVisitor])
  useEffect(() => {
    dataFan && setFanAtom(dataFan)
  }, [dataFan])
  useEffect(() => {
    dataVisit && setVisitAtom(dataVisit)
  }, [dataVisit])

  return (
    <div className="w-full">
      <Grid container spacing={4}>
        <AnalyticItem loading={loadingVisit} data={dataVisit} />
        {/* <AnalyticItem loading={loadingVisitor} data={dataVisitor} />
        <AnalyticItem loading={loadingFan} data={dataFan} />
        <AnalyticItem loading={loadingFriend} data={dataFiend} /> */}
      </Grid>
    </div>
  )
}
