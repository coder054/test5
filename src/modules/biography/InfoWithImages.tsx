import { useAtom } from 'jotai'
import { chain, get, isEmpty } from 'lodash'
import { useEffect } from 'react'
import { dataStatsAtom } from 'src/atoms/biographyAtom'
import { TitleCollapse } from 'src/components/common/TitleCollapse'
import { capitalize, getStr } from 'src/utils/utils'
import { IDataStats } from './InfoWithNumbers'

export const InfoWithImages = () => {
  let dataStats: IDataStats
  let setDataStats: any
    //@ts-ignore: Unreachable code error
  ;[dataStats, setDataStats] = useAtom(dataStatsAtom)
  // const { totalTrophies, totalAwards, totalCaps } = dataStats

  useEffect(() => {
    // console.log('aaa dataStats: ', dataStats)
  }, [dataStats])

  useEffect(() => {
    console.log('aaa dataStats: ', dataStats)
  }, [dataStats])

  if (
    isEmpty(dataStats?.totalCaps) &&
    isEmpty(
      chain(Object.values(get(dataStats, 'totalAwards') || {}))
        .compact()
        .uniq()
        .value()
    ) &&
    isEmpty(
      chain(Object.values(get(dataStats, 'totalTrophies') || {}))
        .compact()
        .uniq()
        .value()
    )
  ) {
    return (
      <div className="my-[120px] sm:my-[200px] ">
        <img
          src={'/biography/nodata.png'}
          className="w-[131px] sm:w-[171px] mx-auto"
          alt=""
        />
        <div className="text-[24px] text-center mt-6 ">No data yet</div>
      </div>
    )
  }

  return (
    <>
      <TitleCollapse title={'TROPHIES ETC.'} alwayShowContent={undefined}>
        <div className=" flex gap-x-[16px] ">
          {get(dataStats, 'totalTrophies.cupTrophyCount') > 0 && (
            <ItemTrophy
              label="Cup"
              image="/biography/trophy/trophy_cup.svg"
              number={get(dataStats, 'totalTrophies.cupTrophyCount')}
            />
          )}
          {get(dataStats, 'totalTrophies.otherTrophyCount') > 0 && (
            <ItemTrophy
              label="Other"
              image="/biography/trophy/trophy_other.svg"
              number={get(dataStats, 'totalTrophies.otherTrophyCount')}
            />
          )}
          {get(dataStats, 'totalTrophies.serieTrophyCount') > 0 && (
            <ItemTrophy
              label="Serie"
              image="/biography/trophy/trophy_serie.svg"
              number={get(dataStats, 'totalTrophies.serieTrophyCount')}
            />
          )}
        </div>

        <div className="text-Grey font-semibold text-[16px] mt-[16px] ">
          AWARDS
        </div>
        <div className=" flex gap-x-[16px] ">
          {get(dataStats, 'totalAwards.DT') > 0 && (
            <ItemAward
              quantity={getStr(dataStats, 'totalAwards.DT')}
              src={'/biography/award/medal-goal.svg'}
              title={'D.T'}
            />
          )}
          {get(dataStats, 'totalAwards.GOC') > 0 && (
            <ItemAward
              quantity={getStr(dataStats, 'totalAwards.GOC')}
              src={'/biography/award/medal-goal.svg'}
              title={'G.O.C'}
            />
          )}
          {get(dataStats, 'totalAwards.GOL') > 0 && (
            <ItemAward
              quantity={getStr(dataStats, 'totalAwards.GOL')}
              src={'/biography/award/medal-goal.svg'}
              title={'G.O.L'}
            />
          )}
          {get(dataStats, 'totalAwards.MVP') > 0 && (
            <ItemAward
              quantity={getStr(dataStats, 'totalAwards.MVP')}
              src={'/biography/award/medal-mvp.svg'}
              title={'M.V.P'}
            />
          )}
          {get(dataStats, 'totalAwards.POM') > 0 && (
            <ItemAward
              quantity={getStr(dataStats, 'totalAwards.POM')}
              src={'/biography/award/medal-pom.svg'}
              title={'P.O.M'}
            />
          )}
          {get(dataStats, 'totalAwards.POW') > 0 && (
            <ItemAward
              quantity={getStr(dataStats, 'totalAwards.POW')}
              src={'/biography/award/medal-pow.svg'}
              title={'P.O.W'}
            />
          )}
          {get(dataStats, 'totalAwards.POY') > 0 && (
            <ItemAward
              quantity={getStr(dataStats, 'totalAwards.POY')}
              src={'/biography/award/medal-goal.svg'}
              title={'P.O.Y'}
            />
          )}
          {get(dataStats, 'totalAwards.SOM') > 0 && (
            <ItemAward
              quantity={getStr(dataStats, 'totalAwards.SOM')}
              src={'/biography/award/medal-goal.svg'}
              title={'S.O.M'}
            />
          )}
        </div>

        <div className="text-Grey font-semibold text-[16px] mt-[16px] ">
          CAPS
        </div>
        <div className=" flex gap-x-[16px] ">
          {(get(dataStats, 'totalCaps') || []).map((o) => (
            <div>
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
        </div>
      </TitleCollapse>
    </>
  )
}

const ItemAward = ({ quantity, src, title }) => (
  <div className=" ">
    <div className="bg-[#1f1f1f] px-2 py-1 rounded-[8px] mb-2 mt-2 w-[58px] h-[58px]">
      <div className="text-white text-[12px] text-center mb-1 ">{title}</div>
      <img src={src} className="mb-1 mx-auto text-center " alt="" />
    </div>
    <div className="text-white text-[13px] text-center ">{quantity}x</div>
  </div>
)

const ItemTrophy = ({ label, image, number }) => (
  <div className=" ">
    <div className="bg-[#1f1f1f] px-2 py-1 rounded-[8px] mb-2 mt-2 w-[58px] h-[58px] ">
      <div className="text-white text-[12px] text-center mb-1 ">{label}</div>
      <img src={image} className="mb-1 mx-auto text-center " alt="" />
    </div>
    <div className="text-white text-[13px] text-center ">{number}x</div>
  </div>
)
