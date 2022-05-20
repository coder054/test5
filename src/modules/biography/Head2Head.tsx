import { capitalize, isEmpty } from 'lodash'
import clsx from 'clsx'
import { CircularProgress } from '@mui/material'
import queryString from 'query-string'
import { useEffect, useMemo, useState } from 'react'
import { useIdHead2HeadQuery } from 'src/atoms/biographyAtom'
import { Stars } from 'src/components/common/Stars'
import { BioRadarChart } from 'src/components/specific/BioRadarChart'
import { axios } from 'src/utils/axios'
import { equalStr, getErrorMessage, getStr } from 'src/utils/utils'
import { API_ACHIEVEMENTS_TROPHY } from 'src/constants/api.constants'
import { ItemAward, ItemTrophy } from './InfoWithImages'
import { SvgFilter, SvgFilter3Line } from 'src/imports/svgs'

export const Head2Head = () => {
  const { idHead2Head, setIdHead2Head } = useIdHead2HeadQuery()
  const [data, setData] = useState<IHead2Head>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    ;(async function () {
      // https://dev.api.zporter.co/biographies/players/head-2-head?limit=10&startAfter=1&sorted=asc&statsTab=Total&startDate=2022-04-18T10%3A04%3A46%2B00%3A00&endDate=2022-05-18T10%3A04%3A46%2B00%3A00&userIdQuery=008a5eab-1837-4121-8975-9ec94159b685

      try {
        setLoading(true)
        let startDate = new Date()
        startDate.setDate(startDate.getDate() - 365)
        const params = {
          limit: 1,
          startAfter: 1,
          sorted: 'asc',
          statsTab: 'Total',
          startDate: startDate.toISOString(),
          endDate: new Date().toISOString(),
          userIdQuery: idHead2Head,
        }

        const { data: dataResp } = await axios.get(
          `/biographies/players/head-2-head?${queryString.stringify(params)}`
        )

        setData(dataResp)
      } catch (error) {
        alert(getErrorMessage(error))
      } finally {
        setLoading(false)
      }
    })()

    return () => {}
  }, [])

  const bios = useMemo(() => {
    if (isEmpty(data)) {
      return []
    }

    return [data?.bioCompare?.userA, data?.bioCompare?.userB]
  }, [data])

  const trophies = useMemo(() => {
    if (isEmpty(data)) {
      return []
    }

    return [data?.trophiesCompare?.userA, data?.trophiesCompare?.userB]
  }, [data])
  const awards = useMemo(() => {
    if (isEmpty(data)) {
      return []
    }

    return [data?.awardsCompare?.userA, data?.awardsCompare?.userB]
  }, [data])
  const caps = useMemo(() => {
    if (isEmpty(data)) {
      return []
    }

    return [data?.capsCompare?.userA, data?.capsCompare?.userB]
  }, [data])

  const matches = useMemo(() => {
    if (isEmpty(data)) {
      return []
    }

    const arr1 = Object.entries(data.matchesCompare)
    const arr2: {
      userA: number
      totalUserA: number
      userB: number
      totalUserB: number
      title: string
    }[] = arr1.map((o) => ({ ...o[1], title: o[0] }))
    return arr2
  }, [data])

  const trainings = useMemo(() => {
    if (isEmpty(data)) {
      return []
    }

    const arr1 = Object.entries(data.trainingsCompare)
    const arr2: {
      userA: number
      totalUserA: number
      userB: number
      totalUserB: number
      title: string
    }[] = arr1.map((o) => ({ ...o[1], title: o[0] }))
    return arr2
  }, [data])

  const dataChart = useMemo(() => {
    if (isEmpty(bios)) {
      return []
    }

    const {
      attacking: attackingA,
      pace: paceA,
      shooting: shootingA,
      passing: passingA,
      defending: defendingA,
      tackling: tacklingA,
      heading: headingA,
      dribbling: dribblingA,
    } = bios[0].playerRadarSkills

    const {
      attacking: attackingB,
      pace: paceB,
      shooting: shootingB,
      passing: passingB,
      defending: defendingB,
      tackling: tacklingB,
      heading: headingB,
      dribbling: dribblingB,
    } = bios[1].playerRadarSkills

    return [
      {
        subject: 'ATTACKING',
        userA: attackingA,
        userB: attackingB,
        fullMark: 100,
      },
      {
        subject: 'PACE',
        userA: paceA,
        userB: paceB,
        fullMark: 100,
      },
      {
        subject: 'SHOOTING',
        userA: shootingA,
        userB: shootingB,
        fullMark: 100,
      },
      {
        subject: 'PASSING',
        userA: passingA,
        userB: passingB,
        fullMark: 100,
      },
      {
        subject: 'DEFENDING',
        userA: defendingA,
        userB: defendingB,
        fullMark: 100,
      },
      {
        subject: 'TACKLING',
        userA: tacklingA,
        userB: tacklingB,
        fullMark: 100,
      },
      {
        subject: 'HEADING',
        userA: headingA,
        userB: headingB,
        Coach: 0,
        fullMark: 100,
      },
      {
        subject: 'DRIBBLING',
        userA: dribblingA,
        userB: dribblingB,
        Coach: 0,
        fullMark: 100,
      },
    ]
  }, [bios])

  if (loading) {
    return (
      <div className="flex justify-center mt-[20px]  ">
        <CircularProgress />
      </div>
    )
  }

  if (isEmpty(data)) {
    return null
  }

  return (
    <>
      <div className="inline-flex w-[200px] items-center gap-x-[24px] p-3  ">
        <svg
          onClick={() => {
            setIdHead2Head(undefined)
          }}
          xmlns="http://www.w3.org/2000/svg"
          className="h-[30px] w-[30px] cursor-pointer hover:bg-[#006699] "
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 19l-7-7 7-7"
          />
        </svg>
        <div className="font-bold ">Head 2 head</div>
      </div>

      <div className="px-4 max-w-[500px] mx-auto w-full ">
        <div className="flex  gap-x-[16px] w-full max-w-[1500px] justify-between ">
          {bios.map((bio) => {
            return (
              <div
                key={bio.userId}
                style={{ width: 'calc(50% - 16px )' }}
                className=""
              >
                <div
                  className="text-Grey
            text-[12px] sm:text-[12px] md:text-[12px] lg:text-[12px] xl:text-[12px] 2xl:text-[12px]
            mx-auto text-center
            "
                >
                  {bio.lastUpdatedDate}
                </div>

                <div
                  className="text-14px sm:text-14px md:text-14px lg:text-14px xl:text-14px 2xl:text-14px
              font-bold mx-auto text-center
              "
                >
                  <span className="text-Green ">{bio.firstName}</span>
                  <span className="text-white ">{bio.lastName}</span>
                </div>

                <div
                  className="text-Grey
              text-[13px] sm:text-[13px] md:text-[13px] lg:text-[13px] xl:text-[13px] 2xl:text-[13px]
              mx-auto text-center
              "
                >
                  #{bio.username}
                </div>

                {/* image and stars */}
                <div className="mx-auto text-center w-[120px] h-[120px] bg-Black rounded-full relative ">
                  <div className=" absolute inset-0 z-10 bg-[#00000033] "></div>
                  <img
                    src={bio.faceImageUrl}
                    className="w-[120px] h-[120px] object-cover rounded-full "
                    alt=""
                  />

                  <Stars
                    numberOfStars={bio.starRating}
                    className={
                      'gap-x-[2px] justify-center absolute bottom-[20px] left-1/2 transform -translate-x-1/2 '
                    }
                    svgStarFull={
                      <img
                        src={'/biography/starfull.png'}
                        className="
                        w-[16px] sm:w-[16px] md:w-[16px] lg:w-[16px] xl:w-[16px] 2xl:w-[16px]
                        h-[16px] sm:h-[16px] md:h-[16px] lg:h-[16px] xl:h-[16px] 2xl:h-[16px]
                      "
                        alt=""
                      />
                    }
                    svgStarHalf={
                      <img
                        src={'/biography/starhalf.png'}
                        className="
                        w-[16px] sm:w-[16px] md:w-[16px] lg:w-[16px] xl:w-[16px] 2xl:w-[16px]
                        h-[16px] sm:h-[16px] md:h-[16px] lg:h-[16px] xl:h-[16px] 2xl:h-[16px]
                      "
                        alt=""
                      />
                    }
                    svgStarEmpty={
                      <img
                        src={'/biography/starempty.png'}
                        className="
                        w-[16px] sm:w-[16px] md:w-[16px] lg:w-[16px] xl:w-[16px] 2xl:w-[16px]
                        h-[16px] sm:h-[16px] md:h-[16px] lg:h-[16px] xl:h-[16px] 2xl:h-[16px]
                      "
                        alt=""
                      />
                    }
                  />
                </div>
                {/* image and stars */}

                {/* info */}
                <div className="grid grid-cols-2 gap-x-[16px] ">
                  <div className="text-right ">
                    <div className="text-white font-bold text-[14px] ">
                      {bio.position}
                    </div>
                    <div className="text-Grey text-[11px] font-medium ">
                      POSITION
                    </div>
                  </div>

                  <div className="text-left ">
                    <div className="text-white font-bold text-[14px] ">
                      {bio.age}
                    </div>
                    <div className="text-Grey text-[11px] font-medium ">
                      AGE
                    </div>
                  </div>
                </div>

                <div className="h-[8px] "></div>
                <div className="grid grid-cols-2 gap-x-[16px] ">
                  <div className="text-right ">
                    <img
                      src={bio.currentClubIconUrl}
                      className="w-[25px] h-[25px] rounded-full object-cover ml-auto "
                      alt=""
                    />
                    <div className="text-Grey text-[11px] font-medium ">
                      2022/03
                    </div>
                  </div>
                  <div className="text-left ">
                    <img
                      src={bio.countryFlagUrl}
                      className="w-[25px] h-[25px] rounded-full object-cover "
                      alt=""
                    />
                    <div className="text-Grey text-[11px] font-medium ">
                      08/01/01
                    </div>
                  </div>
                </div>

                <div className="h-[8px] "></div>
                <div className="grid grid-cols-2 gap-x-[16px] ">
                  <div className="text-right ">
                    <div className="text-white font-bold text-[13px] ">
                      {bio.estMarketValue || '?'} M€
                    </div>
                    <div className="text-Grey text-[11px] font-medium ">
                      VALUE
                    </div>
                  </div>
                  <div className="text-left ">
                    <div className="text-white font-bold text-[13px] ">
                      {bio.height} cm
                    </div>
                    <div className="text-Grey text-[11px] font-medium ">
                      HEIGHT
                    </div>
                  </div>
                </div>

                <div className="h-[8px] "></div>
                <div className="grid grid-cols-2 gap-x-[16px] ">
                  <div className="text-right ">
                    <div className="text-white font-bold text-[12px] ">
                      {bio.bestFoot === 'TWO_FOOTED'
                        ? 'left&right'
                        : bio.bestFoot}
                    </div>
                    <div className="text-Grey text-[11px] font-medium ">
                      FOOT
                    </div>
                  </div>
                  <div className="text-left ">
                    <div className="text-white font-bold text-[12px]">
                      {bio.weight} kg
                    </div>
                    <div className="text-Grey text-[11px] font-medium ">
                      WEIGHT
                    </div>
                  </div>
                </div>
                {/* info */}
              </div>
            )
          })}
        </div>
        {/* player profile benchmark */}
        <div className="text-Grey font-bold text-center  mt-[40px] mb-[40px] ">
          PLAYER PROFILE BENCHMARK
        </div>

        <div className="bioradarchart sm:max-w-[466px] mx-auto relative mb-[32px] text-center  ">
          <div className="bioradarchartsmall flex sm:hidden justify-center mx-auto ">
            <BioRadarChart
              type="small"
              data={dataChart}
              head2head={true}
            ></BioRadarChart>
          </div>

          <div className="bioradarchartnormal hidden sm:block ">
            <BioRadarChart
              type="normal"
              data={dataChart}
              head2head={true}
            ></BioRadarChart>
          </div>
        </div>

        <div className=" grid grid-cols-2 mt-[-150px] gap-x-[16px] ">
          {bios.map((bio, index) => (
            <div key={bio.userId} className=" text-center ">
              <div
                className={clsx(
                  ` mb-[30px] `,
                  index === 0 ? ' text-Green ' : ' text-purple-600 '
                )}
              >
                {index === 0 ? 'You' : 'Other Player'}{' '}
              </div>
              <div className="text-white font-bold text-[14px] ">LEFT FOOT</div>
              <Stars
                numberOfStars={bio.leftFoot}
                className={'gap-x-[2px] justify-center mt-[8px] mb-[16px] '}
                svgStarFull={
                  <img
                    src={'/biography/starfull.png'}
                    className="
                        w-[16px] sm:w-[16px] md:w-[16px] lg:w-[16px] xl:w-[16px] 2xl:w-[16px]
                        h-[16px] sm:h-[16px] md:h-[16px] lg:h-[16px] xl:h-[16px] 2xl:h-[16px]
                      "
                    alt=""
                  />
                }
                svgStarHalf={
                  <img
                    src={'/biography/starhalf.png'}
                    className="
                        w-[16px] sm:w-[16px] md:w-[16px] lg:w-[16px] xl:w-[16px] 2xl:w-[16px]
                        h-[16px] sm:h-[16px] md:h-[16px] lg:h-[16px] xl:h-[16px] 2xl:h-[16px]
                      "
                    alt=""
                  />
                }
                svgStarEmpty={
                  <img
                    src={'/biography/starempty.png'}
                    className="
                        w-[16px] sm:w-[16px] md:w-[16px] lg:w-[16px] xl:w-[16px] 2xl:w-[16px]
                        h-[16px] sm:h-[16px] md:h-[16px] lg:h-[16px] xl:h-[16px] 2xl:h-[16px]
                      "
                    alt=""
                  />
                }
              />
              <div className="text-white font-bold text-[14px]">RIGHT FOOT</div>
              <Stars
                numberOfStars={bio.rightFoot}
                className={'mt-[8px] mb-[16px] gap-x-[2px] justify-center'}
                svgStarFull={
                  <img
                    src={'/biography/starfull.png'}
                    className="
                        w-[16px] sm:w-[16px] md:w-[16px] lg:w-[16px] xl:w-[16px] 2xl:w-[16px]
                        h-[16px] sm:h-[16px] md:h-[16px] lg:h-[16px] xl:h-[16px] 2xl:h-[16px]
                      "
                    alt=""
                  />
                }
                svgStarHalf={
                  <img
                    src={'/biography/starhalf.png'}
                    className="
                        w-[16px] sm:w-[16px] md:w-[16px] lg:w-[16px] xl:w-[16px] 2xl:w-[16px]
                        h-[16px] sm:h-[16px] md:h-[16px] lg:h-[16px] xl:h-[16px] 2xl:h-[16px]
                      "
                    alt=""
                  />
                }
                svgStarEmpty={
                  <img
                    src={'/biography/starempty.png'}
                    className="
                        w-[16px] sm:w-[16px] md:w-[16px] lg:w-[16px] xl:w-[16px] 2xl:w-[16px]
                        h-[16px] sm:h-[16px] md:h-[16px] lg:h-[16px] xl:h-[16px] 2xl:h-[16px]
                      "
                    alt=""
                  />
                }
              />
            </div>
          ))}
        </div>
        {/* player profile benchmark */}

        {/* SPECIALITIES */}
        <div className="text-Grey font-bold text-center  mt-[40px] mb-[40px] ">
          SPECIALITIES
        </div>
        <div className="grid grid-cols-2 gap-x-[30px] ">
          {bios.map((bio, index) => (
            <div
              key={bio.userId}
              className={clsx(
                ` flex justify-start gap-x-[4px] `,
                index === 0 ? ' justify-start ' : ' justify-end '
              )}
            >
              {bio.specialities.map((spe) => (
                <span
                  key={spe}
                  className="text-white rounded-[16px] bg-purple-600 flex items-center justify-center h-[30px] px-2 "
                >
                  #{spe}
                </span>
              ))}
            </div>
          ))}
        </div>
        {/* SPECIALITIES */}

        {/* TROPHYS ETC. */}
        <div className="text-Grey font-bold text-center  mt-[40px] mb-[40px] ">
          TROPHYS ETC.
        </div>
        <div className="grid grid-cols-2 gap-x-[30px] ">
          {trophies.map((trophy, index) => (
            <div
              key={index}
              className={clsx(
                ` flex justify-start gap-x-[4px] `,
                index === 0 ? ' justify-start ' : ' justify-end '
              )}
            >
              {trophy.cupTrophyCount > 0 && (
                <ItemTrophy
                  label="Cup"
                  image="/biography/trophy/trophy_cup.svg"
                  number={trophy.cupTrophyCount}
                />
              )}
              {trophy.otherTrophyCount > 0 && (
                <ItemTrophy
                  label="Other"
                  image="/biography/trophy/trophy_other.svg"
                  number={trophy.otherTrophyCount}
                />
              )}
              {trophy.serieTrophyCount > 0 && (
                <ItemTrophy
                  label="Serie"
                  image="/biography/trophy/trophy_serie.svg"
                  number={trophy.serieTrophyCount}
                />
              )}
            </div>
          ))}
        </div>
        {/* TROPHYS ETC. */}

        {/* AWARD */}
        <div className="text-Grey font-bold text-center  mt-[40px] mb-[40px] ">
          AWARD
        </div>

        <div className="grid grid-cols-2 gap-x-[30px] ">
          {awards.map(({ DT, GOC, GOL, MVP, POM, POW, POY, SOM }, index) => (
            <div
              key={index}
              className={clsx(
                ` flex justify-start gap-x-[4px] `,
                index === 0 ? ' justify-start ' : ' justify-end '
              )}
            >
              {DT > 0 && (
                <ItemAward
                  quantity={DT}
                  src={'/biography/award/medal-goal.svg'}
                  title={'D.T'}
                />
              )}
              {GOC > 0 && (
                <ItemAward
                  quantity={GOC}
                  src={'/biography/award/medal-goal.svg'}
                  title={'G.O.C'}
                />
              )}
              {GOL > 0 && (
                <ItemAward
                  quantity={GOL}
                  src={'/biography/award/medal-goal.svg'}
                  title={'G.O.L'}
                />
              )}
              {MVP > 0 && (
                <ItemAward
                  quantity={MVP}
                  src={'/biography/award/medal-mvp.svg'}
                  title={'M.V.P'}
                />
              )}
              {POM > 0 && (
                <ItemAward
                  quantity={POM}
                  src={'/biography/award/medal-pom.svg'}
                  title={'P.O.M'}
                />
              )}
              {POW > 0 && (
                <ItemAward
                  quantity={POW}
                  src={'/biography/award/medal-pow.svg'}
                  title={'P.O.W'}
                />
              )}
              {POY > 0 && (
                <ItemAward
                  quantity={POY}
                  src={'/biography/award/medal-goal.svg'}
                  title={'P.O.Y'}
                />
              )}
              {SOM > 0 && (
                <ItemAward
                  quantity={SOM}
                  src={'/biography/award/medal-goal.svg'}
                  title={'S.O.M'}
                />
              )}
            </div>
          ))}
        </div>

        {/* AWARD */}

        {/* CAPS */}
        <div className="text-Grey font-bold text-center  mt-[40px] mb-[40px] ">
          CAPS
        </div>

        <div className="grid grid-cols-2 gap-x-[30px] ">
          {caps.map((capArr, index) => (
            <div
              key={index}
              className={clsx(
                ` flex justify-start gap-x-[4px] `,
                index === 0 ? ' justify-start ' : ' justify-end '
              )}
            >
              {/*  */}
              {(isEmpty(capArr) ? [] : capArr).map((o, index) => (
                <div key={index}>
                  <div className="bg-[#1f1f1f] px-2 py-1 rounded-[8px] mb-2 mt-2 w-[58px] h-[58px]">
                    <div className="text-white text-[10px] text-center ">
                      {capitalize(o.type.toLowerCase())}
                    </div>
                    <img
                      src={'/biography/cap/Cap_National.svg'}
                      className="text-center mx-auto mb-1 "
                      alt=""
                    />
                    <div className="text-white text-[8px] text-center ">
                      {o.teamName}
                    </div>
                  </div>

                  <div className="text-white text-[13px] text-center">
                    {o.count}x
                  </div>
                </div>
              ))}
              {/*  */}
            </div>
          ))}
        </div>
        {/* CAPS */}

        {/* PROGRAMS */}
        <div className="text-Grey font-bold text-center  mt-[40px] mb-[40px] ">
          PROGRAMS
        </div>
        {/* PROGRAMS */}

        {/* CHALLENGES */}
        <div className="text-Grey font-bold text-center  mt-[40px] mb-[40px] ">
          CHALLENGES
        </div>
        {/* CHALLENGES */}

        {/* STATS BENCHMARK */}
        <div className="text-Grey font-bold text-center  mt-[40px] mb-[40px] ">
          STATS BENCHMARK
        </div>
        {/* STATS BENCHMARK */}

        <div className=" flex justify-between items-center ">
          <span className="text-Green  ">2022 - Last 365 days</span>
          <SvgFilter3Line className={''} onClick={() => {}} />
        </div>

        <div className="text-Grey ">Matches in total</div>
        {matches.map(({ title, totalUserA, totalUserB }, index) => (
          <ItemMatch
            key={title}
            title={title}
            userAValue={totalUserA}
            userBValue={totalUserB}
          ></ItemMatch>
        ))}

        <div className="text-Grey ">Training in total</div>
        {trainings.map(({ title, totalUserA, totalUserB }, index) => (
          <ItemMatch
            key={title}
            title={title}
            userAValue={totalUserA}
            userBValue={totalUserB}
          ></ItemMatch>
        ))}
      </div>
    </>
  )
}

// Generated by https://quicktype.io

export interface IHead2Head {
  bioCompare: BioCompare
  trophiesCompare: TrophiesCompare
  awardsCompare: AwardsCompare
  capsCompare: CapsCompare
  matchesCompare: MatchesCompare
  trainingsCompare: TrainingsCompare
}

export interface AwardsCompare {
  userA: AwardsCompareUserA
  userB: AwardsCompareUserA
}

export interface AwardsCompareUserA {
  MVP: number
  POW: number
  SOM: number
  POM: number
  POY: number
  DT: number
  GOL: number
  GOC: number
}

export interface BioCompare {
  userA: BioCompareUserA
  userB: BioCompareUserA
}

export interface BioCompareUserA {
  userId: string
  lastUpdatedDate: string
  username: string
  firstName: string
  lastName: null | string
  faceImageUrl: string
  bodyImageUrl: null | string
  starRating: number
  circleCompleted: number
  position: string
  currentClubIconUrl: string
  contractedUntil: string
  estMarketValue: number | null
  leftFoot: number
  rightFoot: number
  bestFoot: string
  height: number
  weight: number
  countryFlagUrl: string
  birthDay: string
  age: number
  summary: null | string
  socialLinks: SocialLinks
  topVideoLinks: TopVideoLink[]
  playerRadarSkills: PlayerRadarSkills
  radarUpdatedByCoach: PlayerRadarSkills
  specialities: string[]
  isPublic: boolean
  userRole: string
  bioUrl: string
  teamIds: string[]
}

export interface PlayerRadarSkills {
  shooting: number
  pace: number
  attacking: number
  passing: number
  tackling: number
  heading: number
  defending: number
  dribbling: number
}

export interface SocialLinks {
  facebook: string
  youtube: string
  tiktok: string
  twitter: string
  instagram: string
  veoHighlites: string
}

export interface TopVideoLink {
  source: string
  thumbnailUrl: string
  url: string
}

export interface CapsCompare {
  userA: UserA[]
  userB: any[]
}

export interface UserA {
  type: string
  teamName: string
  count: number
}

export interface MatchesCompare {
  matches: Assists
  points: Assists
  hours: Assists
  goals: Assists
  assists: Assists
  yel: Assists
  red: Assists
}

export interface Assists {
  userA: number
  totalUserA: number
  userB: number
  totalUserB: number
}

export interface TrainingsCompare {
  sessions: Assists
  hours: Assists
  technical: Assists
  tactics: Assists
  physical: Assists
  mental: Assists
}

export interface TrophiesCompare {
  userA: TrophiesCompareUserA
  userB: TrophiesCompareUserA
}

export interface TrophiesCompareUserA {
  serieTrophyCount: number
  cupTrophyCount: number
  otherTrophyCount: number
}

const ItemMatch = ({ title, userAValue, userBValue }) => {
  let color = ''
  if (equalStr(title, 'yel')) {
    color = 'bg-yellow-400'
  } else if (equalStr(title, 'red')) {
    color = 'bg-red-400'
  } else {
    color = 'bg-Green'
  }
  return (
    <div className="mb-2">
      <div className="grid grid-cols-3 ">
        <div className="text-white font-bold text-left "> {userAValue} </div>
        <div className="text-white font-bold text-[14px] uppercase text-center ">
          {equalStr(title, 'yel') ? 'yellow' : title}
        </div>
        <div className="text-white font-bold text-right "> {userBValue} </div>
      </div>
      <div
        className={clsx(
          ` h-[24px] sm:h-[30px]
          w-full`,
          color
        )}
      ></div>
    </div>
  )
}
