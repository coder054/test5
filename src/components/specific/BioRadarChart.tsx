import { useEffect } from 'react'
import { Radar, RadarChart, PolarGrid, Legend, PolarAngleAxis } from 'recharts'

export const BioRadarChart = ({ data, type }) => {
  useEffect(() => {
    let els = Array.from(
      document.querySelectorAll('.bioradarchart .recharts-wrapper')
    )
    els.forEach((el) => {
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

      pathAverage.setAttribute('stroke-dasharray', '9,8')
      pathAverage.setAttribute('stroke-linecap', 'round')
      pathAverage.setAttribute('stroke-width', '3')
    })

    let el2s = Array.from(
      document.querySelectorAll('.bioradarchart .recharts-polar-grid-angle')
    )
    el2s.forEach((el2) => {
      let arr2 = Array.from(el2.querySelectorAll('line'))
      arr2.forEach((line) => {
        line.setAttribute('stroke', 'rgba(100, 116, 139, 0.4)')
        line.setAttribute('stroke-width', '2')
      })
    })

    let el3s = Array.from(
      document.querySelectorAll(
        '.bioradarchart .recharts-polar-grid-concentric'
      )
    )
    el3s.forEach((el3) => {
      let arr3 = Array.from(el3.querySelectorAll('circle'))
      arr3.forEach((circle) => {
        circle.setAttribute('stroke', 'rgba(100, 116, 139, 0.4)')
        circle.setAttribute('stroke-width', '2')
      })
    })

    let el4s = Array.from(
      document.querySelectorAll(
        '.bioradarchartnormal .recharts-layer .recharts-polar-angle-axis-ticks'
      )
    )

    el4s.forEach((el4) => {
      let arr4 = Array.from(el4.querySelectorAll('text'))
      arr4.forEach((text) => {
        text.setAttribute('stroke', '#ffffff')
        text.setAttribute('font-size', '13px')
      })
    })

    let el4ssmall = Array.from(
      document.querySelectorAll(
        '.bioradarchartsmall .recharts-layer .recharts-polar-angle-axis-ticks'
      )
    )

    el4ssmall.forEach((el4) => {
      let arr4 = Array.from(el4.querySelectorAll('text'))
      arr4.forEach((text) => {
        text.setAttribute('stroke', '#ffffff')
        text.setAttribute('font-size', '12px')
      })
    })

    let el5s = Array.from(
      document.querySelectorAll('.bioradarchart .recharts-default-legend')
    )

    el5s.forEach((el5) => {
      let arr5 = Array.from(el5.querySelectorAll('li'))
      arr5.forEach((li) => {
        li.style.marginRight = '32px'
      })
    })
  }, [data, type])

  if (type === 'small') {
    return (
      <RadarChart
        cx={160}
        cy={100}
        outerRadius={82}
        width={320}
        height={330}
        data={data}
        // 0,686695279 * 145
      >
        <PolarGrid gridType="circle" outerRadius={500} />
        <PolarAngleAxis
          dataKey="subject"
          cx={100}
          cy={2000}
          radius={5000}
          axisLineType="polygon"
          orient={'inner'}
        />
        {/* <PolarRadiusAxis angle={30} domain={[0, 10]} /> */}
        <Radar
          dot={false}
          name="Average"
          dataKey="Average"
          stroke="#ffffff"
          fill="#8884d8"
          fillOpacity={0}
          legendType="circle"
        />
        <Radar
          dot={false}
          name="Coach"
          dataKey="Coach"
          stroke="#4654EA"
          fill="#8884d8"
          fillOpacity={0}
          legendType="circle"
        />
        <Radar
          dot={false}
          name="You"
          dataKey="You"
          stroke="#09E099"
          fill="#8884d8"
          fillOpacity={0}
          legendType="circle"
        />
        <Legend />
      </RadarChart>
    )
  }

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
      />
      {/* <PolarRadiusAxis angle={30} domain={[0, 10]} /> */}
      <Radar
        dot={false}
        name="Average"
        dataKey="Average"
        stroke="#ffffff"
        fill="#8884d8"
        fillOpacity={0}
        legendType="circle"
      />
      <Radar
        dot={false}
        name="Coach"
        dataKey="Coach"
        stroke="#4654EA"
        fill="#8884d8"
        fillOpacity={0}
        legendType="circle"
      />
      <Radar
        dot={false}
        name="You"
        dataKey="You"
        stroke="#09E099"
        fill="#8884d8"
        fillOpacity={0}
        legendType="circle"
      />
      <Legend />
    </RadarChart>
  )
}
