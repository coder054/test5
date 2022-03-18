import { useEffect, useState } from 'react'
import { Text } from 'src/components/Text'
import { TitleCollapse } from 'src/components/common/TitleCollapse'

import { OneRowStat } from './InfoWithNumbers'
import clsx from 'clsx'

export interface IInfoClub {
  historicClubs: HistoricClub[]
  existingClub: ExistingClub
  futureClubs: any[]
}

export interface ExistingClub {
  clubInfo: ClubInfo
  statsItems: StatsItem[]
  matchInTotalStatistic: MatchInTotalStatistic
  trophies: Trophies
  summary: string
  mediaLinks: any[]
}

export interface ClubInfo {
  club: Club
  team: Team
  fromTime: string
  toTime: string
  league: League
  role: string
}

export interface Club {
  clubId: string
  city: string
  clubName: string
  arena: string
  logoUrl: string
  websiteUrl: null | string
  country: string
  nickName?: string
}

export interface League {
  name: string
}

export interface Team {
  clubId: string
  teamName: string
}

export interface MatchInTotalStatistic {
  matches: number
  hours: number
  points: number
  goals: number
  assists: number
  yel: number
  red: number
}

export interface StatsItem {
  title: string
  value: string
}

export interface Trophies {
  serieTrophyCount: number
  cupTrophyCount: number
  otherTrophyCount: number
}

export interface HistoricClub {
  careerId: string
  clubInfo: ClubInfo
  statsItems: StatsItem[]
  matchInTotalStatistic: MatchInTotalStatistic
  trophies: Trophies
  summary: string
  mediaLinks: any[]
  season: string
}

export const InfoClub = ({ dataClub }: { dataClub: IInfoClub }) => {
  useEffect(() => {
    // console.log('aaa dataClub: ', dataClub)
  }, [dataClub])
  return (
    <div className="">
      <div className="text-Grey text-[15px] font-medium mb-[8px] ">
        Historic
      </div>
      {dataClub.historicClubs.map((data) => {
        return <ItemClub key={data.careerId} data={data}></ItemClub>
      })}

      <div className="text-Grey text-[15px] font-medium mb-[8px] ">
        Existing
      </div>

      <ItemClub data={dataClub.existingClub}></ItemClub>

      <div className="text-Grey text-[15px] font-medium mb-[8px] ">Future</div>
      {dataClub.futureClubs.map((data, index) => {
        return <ItemClub key={data.careerId || index} data={data}></ItemClub>
      })}
    </div>
  )
}

const ItemClub = ({ data }: { data: ExistingClub | HistoricClub }) => {
  const { statsItems, matchInTotalStatistic, clubInfo, summary, trophies } =
    data
  const [show, setShow] = useState(false)
  return (
    <div
      style={{
        backgroundColor: 'rgba(5,5,5,0.9)',
      }}
      className="rounded-[8px] w-full min-h-[50px] mb-[16px] overflow-hidden "
    >
      <div className="flex items-center  px-[16px] py-[8px]  ">
        <img
          src={clubInfo.club.logoUrl}
          className="w-[40px] h-[40px] object-cover mr-[12px] rounded-[50%]"
          alt=""
        />

        <div className=" ">
          <div className="text-white font-medium ">
            {clubInfo.club.clubName} / {clubInfo.team.teamName}{' '}
          </div>
          <span className="text-Grey mr-2 text-[12px] font-medium ">
            {clubInfo.fromTime} - {clubInfo.toTime}{' '}
          </span>
          <span className="text-Grey mr-2 text-[12px] font-medium">
            {clubInfo.league.name}{' '}
          </span>
          <span className="text-Grey text-[12px] font-medium">
            {clubInfo.role}
          </span>
        </div>

        <div className="grow "></div>

        <svg
          className={clsx(
            ` cursor-pointer duration-200 transform`,
            show ? ' rotate-0 ' : '  -rotate-90 '
          )}
          onClick={() => {
            setShow(!show)
          }}
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7.41 8.58984L12 13.1698L16.59 8.58984L18 9.99984L12 15.9998L6 9.99984L7.41 8.58984Z"
            fill="#818389"
          />
        </svg>
      </div>

      <div className={clsx(`p-[16px]`, show ? '' : 'hidden')}>
        <>
          <div className="mt-[12px] mb-[36px]  ">
            <div className="flex mb-2 gap-x-[8px] justify-center ">
              {(statsItems || []).slice(0, 4).map((o, index) => (
                <OneRowStat key={index} title={o.title} value={o.value} />
              ))}
            </div>

            <div className="flex mb-2 gap-x-[8px] justify-center ">
              {(statsItems || []).slice(4, 8).map((o, index) => (
                <OneRowStat key={index} title={o.title} value={o.value} />
              ))}
            </div>
          </div>

          <Text name="Subtitle1" className="text-white mb-[12px] text-center ">
            Matches in total
          </Text>

          <div className="flex gap-x-[8px] xl:gap-x-[12px] overflow-x-auto pb-1 justify-center">
            {[
              { label: 'Matches', value: matchInTotalStatistic?.matches || 0 },
              {
                label: 'Hours',
                value: (matchInTotalStatistic?.hours || 0).toFixed(1),
              },
              {
                label: 'Point',
                value: (matchInTotalStatistic?.points || 0).toFixed(1),
              },
              { label: 'Goals', value: matchInTotalStatistic?.goals || 0 },
              { label: 'Assists', value: matchInTotalStatistic?.assists || 0 },
              { label: 'Yel', value: matchInTotalStatistic?.yel || 0 },
              { label: 'Red', value: matchInTotalStatistic?.red || 0 },
            ].map((o, index) => (
              <Match key={index} title={o.label} value={o.value} />
            ))}
          </div>

          <div className="h-[40px] "></div>

          <Text name="Subtitle1" className="text-white mb-[12px] text-center ">
            Trophies
          </Text>

          <div className="flex gap-x-[12px] mb-[20px] ">
            {[
              {
                label: 'Serie',
                value: !trophies ? '' : trophies.serieTrophyCount + 'x',
              },
              {
                label: 'Cup',
                value: !trophies ? '' : trophies.cupTrophyCount + 'x',
              },
              {
                label: 'Other',
                value: !trophies ? '' : trophies.otherTrophyCount + 'x',
              },
            ].map((o, index) => (
              <div key={'trophy' + index}>
                <div className="rounded-[8px] bg-[#1f1f1f] px-[8px] py-[5px] mb-1 ">
                  <div className="text-white text-[12px] text-center mb-1">
                    {o.label}
                  </div>
                  <svg
                    className="text-center "
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M16.8375 3.99243C15.89 3.04993 14.645 2.53076 13.33 2.53076C12.0942 2.53076 10.92 2.99076 10 3.8291C9.08003 2.99076 7.90669 2.53076 6.67002 2.53076C5.35502 2.53076 4.11002 3.04993 3.15919 3.99576C1.19836 5.96493 1.19919 9.04493 3.16086 11.0058L10 17.8449L16.8392 11.0058C18.8009 9.04493 18.8017 5.96493 16.8375 3.99243Z"
                      fill="#09E099"
                    />
                  </svg>
                </div>
                <div className="text-white text-center ">{o.value}</div>
              </div>
            ))}
          </div>

          <Text name="Subtitle1" className="text-white mb-[12px] text-center ">
            Summary
          </Text>

          <div className="min-h-[16px] mb-4 text-Grey text-[16px]">
            {summary}
          </div>
        </>
      </div>
    </div>
  )
}

const Match = ({ title, value }) => {
  return (
    <div className="flex flex-col justify-center items-center">
      <span className=" text-[13px] xl:text-[13px] leading-[150%] text-Grey mb-2 ">
        {title}
      </span>
      <span className="text-white text-[15px] xl:text-[21px] leading-[138%] font-semibold">
        {value}
      </span>
    </div>
  )
}
