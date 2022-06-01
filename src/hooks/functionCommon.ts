import { Rule } from 'antd/lib/form'
import dayjs from 'dayjs'
import _ from 'lodash'
import { DEFAULT_DATE } from 'src/constants/constants'
import { useTheme } from '@mui/material/styles'
import { ApexOptions } from 'apexcharts'

export const getCookieFromReq = (cookieString: string, cookieKey: string) => {
  const cookie = cookieString
    .split(';')
    .find((c) => c.trim().startsWith(`${cookieKey}=`))
  if (!cookie) {
  }
  if (!cookie) return undefined
  return cookie.split('=')[1]
}

export function getRulePassword(message?: string): Rule {
  return {
    pattern: new RegExp(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
    ),
    message: message ? message : 'Min 8 signs & 1 capital letter',
  }
}

export function numToEmotion(num: number) {
  switch (num) {
    case 0:
      return 'VERY_BAD'
    case 25:
      return 'BAD'
    case 50:
      return 'NORMAL'
    case 75:
      return 'GOOD'
    case 100:
      return 'VERY_GOOD'
    default:
      return
  }
}

export function numToScale(num: number) {
  switch (num) {
    case 0:
      return 'VERY_LOW'
    case 25:
      return 'LOW'
    case 50:
      return 'NORMAL'
    case 75:
      return 'HIGH'
    case 100:
      return 'VERY_HIGH'
    default:
      return
  }
}

export function emotionToNum(str: string) {
  switch (str) {
    case 'VERY_BAD':
      return 0
    case 'BAD':
      return 25
    case 'NORMAL':
      return 50
    case 'GOOD':
      return 75
    case 'VERY_GOOD':
      return 100
    default:
      return
  }
}
export function emotionlToStar(str: string) {
  switch (str) {
    case 'VERY_BAD':
      return 1
    case 'BAD':
      return 2
    case 'NORMAL':
      return 3
    case 'GOOD':
      return 4
    case 'VERY_GOOD':
      return 5
    default:
      return
  }
}

export function scaleToNum(str: string) {
  switch (str) {
    case 'VERY_LOW':
      return 0
    case 'LOW':
      return 25
    case 'NORMAL':
      return 50
    case 'HIGH':
      return 75
    case 'VERY_HIGH':
      return 100
    default:
      return
  }
}

export const scaleToColor = (str: string) => {
  switch (str) {
    case 'VERY_LOW':
      return 'text-[#4654EA]'
    case 'LOW':
      return 'text-[#07E1FF]'
    case 'NORMAL':
      return 'text-[#09E099]'
    case 'HIGH':
      return 'text-[#E85CFF]'
    case 'VERY_HIGH':
      return 'text-[#D60C0C]'
    default:
      return
  }
}
export const scaleToColorStrain = (str: string) => {
  switch (str) {
    case 'VERY_LOW':
      return 'bg-[#4654EA]'
    case 'LOW':
      return 'bg-[#4654EA]'
    case 'NORMAL':
      return 'bg-[#09E099]'
    case 'HIGH':
      return 'bg-[#FF9607]'
    case 'VERY_HIGH':
      return 'bg-[#D60C0C]'
    default:
      return
  }
}

export function formatDate(date: string | number | Date) {
  return dayjs(date).format(DEFAULT_DATE)
}

export function getStartOfDate(date: string | number | Date) {
  return dayjs(date).startOf('day').format(DEFAULT_DATE)
}

export function formatUnixDate(date: number, format: string) {
  return dayjs(date).format(format)
}

export function flexingFormatDate(
  date: string | number | Date,
  format: string
) {
  return dayjs(date).format(format)
}

export const getToday = () => {
  if (+dayjs(new Date()).format('HH') < 12) {
    return dayjs(new Date()).add(-1, 'day').format(DEFAULT_DATE)
  } else return new Date()
}

export const getNextYear = (number: number) => {
  return dayjs(new Date())
    .startOf('year')
    .add(+number, 'year')
    .format(DEFAULT_DATE)
}

export const upperFirst = (str: string) => {
  return _.upperFirst(str.toLowerCase().trim().replace('_', ' '))
}

export const getDefaultDay = (date: string | Date) => {
  if (
    dayjs(flexingFormatDate(date, 'MM/DD/YYYY')).isBefore(
      dayjs(flexingFormatDate(new Date(), 'MM/DD/YYYY'))
    )
  ) {
    return 'New diary'
  }
  if (
    flexingFormatDate(date, 'MM/DD/YYYY') ===
      flexingFormatDate(new Date(), 'MM/DD/YYYY') &&
    +flexingFormatDate(date, 'HH') >= 12
  ) {
    return 'Today'
  }
}

export const getPreviousDate = (date: string | number | Date) => {
  if (
    (flexingFormatDate(date, 'MM/DD/YYYY') ===
      flexingFormatDate(new Date(), 'MM/DD/YYYY') &&
      +flexingFormatDate(date, 'HH') < 12) ||
    flexingFormatDate(date, 'MM/DD/YYYY') <
      flexingFormatDate(new Date(), 'MM/DD/YYYY')
  ) {
    return `${flexingFormatDate(date, 'YYYY-MM-DD')}T23:59:00+07:00`
  }
}

export const lineChartOptions = (series: any, theme: any) => {
  return {
    chart: {
      background: 'transparent',
      stacked: false,
      toolbar: {
        show: false,
      },
    },
    colors: series.map((item) => item.color),
    fill: {
      opacity: 1,
    },
    legend: {
      show: true,
    },
    stroke: {
      curve: 'smooth',
      lineCap: 'butt',
      width: 2,
    },
    theme: {
      mode: theme.palette.mode,
    },
    grid: {
      xaxis: {
        lines: {
          show: false,
          offsetX: 0,
          offsetY: 0,
        },
      },
      yaxis: {
        lines: {
          show: false,
        },
      },
    },
  }
}
