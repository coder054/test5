import { useContext, useEffect, useMemo, useState } from 'react'
import { Text } from 'src/components/Text'
import { TitleCollapse } from 'src/components/common/TitleCollapse'
import { TabPanel, Tabs } from 'src/components/Tabs'
import { InfoClub } from './InfoClub'

enum Tab {
  Club = 'Club',
  Total = 'Total',
  '20/19' = '20/19',
  '19/18' = '19/18',
  '18/17' = '18/17',
}

const tabs = [
  { text: Tab.Club },
  { text: Tab.Total },
  { text: Tab['20/19'] },
  { text: Tab['19/18'] },
  { text: Tab['18/17'] },
]

export const InforWithNumbers = ({ dataClub }) => {
  const [tab, setTab] = useState(Tab.Total)
  return (
    <>
      <div className="pl-[16px] h-[48px] mb-[24px] flex items-center ">
        <div className=" mt-[22px] ">
          <Tabs tab={tab} setTab={setTab} tabs={tabs} />
        </div>
      </div>
      <TabPanel visible={tab === Tab.Club}>
        <InfoClub dataClub={dataClub} />
      </TabPanel>
      <TabPanel visible={tab === Tab.Total}>
        <TitleCollapse title={'STATS'} alwayShowContent={false}>
          <>
            <div className="mt-[12px] mb-[16px] ">
              {[
                {
                  itemsOfRow: [
                    { label: 'Ser/Cup/Fri', value: '4/2/4' },
                    {
                      label: 'Av. Points',
                      value: (
                        <div className="flex justify-center items-center ">
                          <span className="inline-block ">1,6</span>
                          <svg
                            className="inline-block ml-2"
                            width="17"
                            height="16"
                            viewBox="0 0 17 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M16.5 8L15.09 6.59L9.5 12.17V0H7.5V12.17L1.92 6.58L0.5 8L8.5 16L16.5 8Z"
                              fill="#D60C0C"
                            />
                          </svg>
                        </div>
                      ),
                    },
                    {
                      label: 'Net Score',
                      value: (
                        <div className="flex justify-center items-center ">
                          <span className="inline-block ">+20</span>
                          <svg
                            className="inline-block ml-2"
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M0 8L1.41 9.41L7 3.83V16H9V3.83L14.58 9.42L16 8L8 0L0 8Z"
                              fill="#09E099"
                            />
                          </svg>
                        </div>
                      ),
                    },
                    {
                      label: 'Role',
                      value: (
                        <div className="flex justify-center items-center ">
                          <span className="inline-block ">CAM</span>
                          <svg
                            className="inline-block ml-2"
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M0 8L1.41 9.41L7 3.83V16H9V3.83L14.58 9.42L16 8L8 0L0 8Z"
                              fill="#09E099"
                            />
                          </svg>
                        </div>
                      ),
                    },
                  ],
                },
                {
                  itemsOfRow: [
                    {
                      label: 'Play time',
                      value: (
                        <div className="flex justify-center items-center ">
                          <span className="inline-block ">89%</span>
                          <svg
                            className="inline-block ml-2"
                            width="17"
                            height="16"
                            viewBox="0 0 17 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M16.5 8L15.09 6.59L9.5 12.17V0H7.5V12.17L1.92 6.58L0.5 8L8.5 16L16.5 8Z"
                              fill="#D60C0C"
                            />
                          </svg>
                        </div>
                      ),
                    },
                    {
                      label: 'Av. Goals',
                      value: (
                        <div className="flex justify-center items-center ">
                          <span className="inline-block ">0,5</span>
                          <svg
                            className="inline-block ml-2"
                            width="17"
                            height="16"
                            viewBox="0 0 17 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M16.5 8L15.09 6.59L9.5 12.17V0H7.5V12.17L1.92 6.58L0.5 8L8.5 16L16.5 8Z"
                              fill="#D60C0C"
                            />
                          </svg>
                        </div>
                      ),
                    },
                    {
                      label: 'Av. Assists',
                      value: (
                        <div className="flex justify-center items-center ">
                          <span className="inline-block ">0,5</span>
                          <svg
                            className="inline-block ml-2"
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M0 8L1.41 9.41L7 3.83V16H9V3.83L14.58 9.42L16 8L8 0L0 8Z"
                              fill="#09E099"
                            />
                          </svg>
                        </div>
                      ),
                    },
                    {
                      label: 'Av. Cards',
                      value: (
                        <div className="flex justify-center items-center ">
                          <span className="inline-block ">0,1</span>
                          <svg
                            className="inline-block ml-2"
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M0 8L1.41 9.41L7 3.83V16H9V3.83L14.58 9.42L16 8L8 0L0 8Z"
                              fill="#09E099"
                            />
                          </svg>
                        </div>
                      ),
                    },
                  ],
                },
              ].map((row, index) => (
                <div
                  key={index}
                  className="flex mb-2  gap-x-[8px] justify-center "
                >
                  {row.itemsOfRow.map((o, index) => (
                    <div
                      key={index}
                      className="
                        p-[6px] sm:p-[8px] xl:p-[12px]
                      bg-Dark-3 rounded-[8px] flex flex-col justify-center items-center "
                    >
                      <Text name="Subtitle2" className="text-Grey mb-[4px] ">
                        {o.label}
                      </Text>
                      <Text name="Header6" className="text-white ">
                        {o.value}
                      </Text>
                    </div>
                  ))}
                </div>
              ))}
            </div>
            <div className="h-[16px] "></div>
            <Text
              name="Subtitle1"
              className="text-white mb-[12px] text-center "
            >
              Matches in total
            </Text>
            <div className="flex gap-x-[12px] xl:gap-x-[30px] overflow-x-auto pb-1 justify-center">
              {[
                { label: 'Matches', value: '10' },
                { label: 'Hours', value: '13,3' },
                { label: 'Point', value: '16' },
                { label: 'Goals', value: '5' },
                { label: 'Assists', value: '4' },
                { label: 'Yel', value: '1' },
                { label: 'Red', value: '0' },
              ].map((o, index) => (
                <div
                  key={index}
                  className="flex flex-col justify-center items-center"
                >
                  <span className=" text-[13px] xl:text-[16px] leading-[150%] text-Grey mb-2 ">
                    {o.label}
                  </span>
                  <span className="text-white text-[15px] xl:text-[24px] leading-[138%] font-semibold">
                    {o.value}
                  </span>
                </div>
              ))}
            </div>

            <div className="h-[40px] "></div>
            <Text
              name="Subtitle1"
              className="text-white mb-[12px] text-center "
            >
              Trainings in total
            </Text>

            <div className="flex gap-x-[12px] xl:gap-x-[30px] overflow-x-auto pb-1 justify-center ">
              {[
                { label: 'Sessions', value: '40' },
                { label: 'Hours', value: '60' },
                { label: 'Technic', value: '41%' },
                { label: 'Tactic', value: '29%' },
                { label: 'Physic', value: '11%' },
                { label: 'Mental', value: '9%' },
              ].map((o, index) => (
                <div
                  key={index}
                  className="flex flex-col justify-center items-center "
                >
                  <span className=" text-[13px] xl:text-[16px] leading-[150%] text-Grey mb-2 ">
                    {o.label}
                  </span>
                  <span className="text-white text-[15px] xl:text-[24px] leading-[138%] font-semibold">
                    {o.value}
                  </span>
                </div>
              ))}
            </div>
          </>
        </TitleCollapse>
      </TabPanel>
    </>
  )
}
