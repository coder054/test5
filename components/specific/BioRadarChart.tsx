import { useEffect } from 'react'
import { Radar, RadarChart, PolarGrid, Legend, PolarAngleAxis } from 'recharts'

const data = [
  {
    subject: 'ATTACKING',
    A: 7,
    B: 8,
    C: 6,
    fullMark: 10,
  },
  {
    subject: 'PACE',
    A: 6,
    B: 7,
    C: 8,
    fullMark: 10,
  },
  {
    subject: 'SHOOTING',
    A: 5,
    B: 2,
    C: 8,
    fullMark: 10,
  },
  {
    subject: 'PASSING',
    A: 4,
    B: 8,
    C: 7,
    fullMark: 10,
  },
  {
    subject: 'DEFENDING',
    A: 9,
    B: 9,
    C: 8,
    fullMark: 10,
  },
  {
    subject: 'TACKLING',
    A: 6,
    B: 8,
    C: 7,
    fullMark: 10,
  },
  {
    subject: 'HEADING',
    A: 6,
    B: 8,
    C: 7,
    fullMark: 10,
  },
  {
    subject: 'DRIBBLING',
    A: 6,
    B: 8,
    C: 7,
    fullMark: 10,
  },
]

export const BioRadarChart = () => {
  useEffect(() => {
    let el = document.querySelector('.bioradarchart .recharts-wrapper')
    if (!el) {
      return
    }

    let pathYou = el.querySelector('path[name=You]')
    if (!pathYou) {
      return
    }
    pathYou.setAttribute('stroke-width', '3')

    let pathCoach = el.querySelector('path[name=Coach]')
    if (!pathCoach) {
      return
    }
    pathCoach.setAttribute('stroke-dasharray', '9,8')
    pathCoach.setAttribute('stroke-linecap', 'round')
    pathCoach.setAttribute('stroke-width', '3')

    let pathAverage = el.querySelector('path[name=Average]')
    if (!pathAverage) {
      return
    }
    pathAverage.setAttribute('stroke-dasharray', '9,8')
    pathAverage.setAttribute('stroke-linecap', 'round')
    pathAverage.setAttribute('stroke-width', '3')

    let el2 = document.querySelector(
      '.bioradarchart .recharts-polar-grid-angle'
    )
    if (!el2) {
      return
    }

    let arr2 = Array.from(el2.querySelectorAll('line'))
    arr2.forEach((line) => {
      line.setAttribute('stroke', 'rgba(100, 116, 139, 0.4)')
      line.setAttribute('stroke-width', '2')
    })

    let el3 = document.querySelector(
      '.bioradarchart .recharts-polar-grid-concentric'
    )
    if (!el3) {
      return
    }

    let arr3 = Array.from(el3.querySelectorAll('circle'))
    arr3.forEach((circle) => {
      circle.setAttribute('stroke', 'rgba(100, 116, 139, 0.4)')
      circle.setAttribute('stroke-width', '2')
    })

    let el4 = document.querySelector(
      '.bioradarchart .recharts-layer .recharts-polar-angle-axis-ticks'
    )
    if (!el4) {
      return
    }

    let arr4 = Array.from(el4.querySelectorAll('text'))
    arr4.forEach((text) => {
      text.setAttribute('stroke', '#ffffff')
    })

    let el5 = document.querySelector('.bioradarchart .recharts-default-legend')
    if (!el5) {
      return
    }

    let arr5 = Array.from(el5.querySelectorAll('li'))
    arr5.forEach((li) => {
      li.style.marginRight = '32px'
    })
  }, [])

  return (
    <RadarChart
      cx={233}
      cy={145}
      outerRadius={120}
      width={466}
      height={410}
      data={data}
    >
      <PolarGrid gridType="circle" outerRadius={500} />
      <PolarAngleAxis
        dataKey="subject"
        cx={100}
        cy={2000}
        radius={5000}
        axisLineType="polygon"
        orient={'inner'}
        onClick={() => {
          alert(1)
        }}
      />
      {/* <PolarRadiusAxis angle={30} domain={[0, 10]} /> */}
      <Radar
        dot={false}
        name="Average"
        dataKey="A"
        stroke="#ffffff"
        fill="#8884d8"
        fillOpacity={0}
        legendType="circle"
      />
      <Radar
        dot={false}
        name="Coach"
        dataKey="B"
        stroke="#4654EA"
        fill="#8884d8"
        fillOpacity={0}
        legendType="circle"
      />
      <Radar
        dot={false}
        name="You"
        dataKey="C"
        stroke="#09E099"
        fill="#8884d8"
        fillOpacity={0}
        legendType="circle"
      />
      <Legend />
    </RadarChart>
  )
}
