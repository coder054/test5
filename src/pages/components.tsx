import { requireAuth } from 'src/config/firebase-admin'

import { ButtonAdd } from 'src/components/ButtonAdd'

import { Comments } from 'src/components/Comments'
import { FootballersSlider } from 'src/components/Feed/FootballersSlider/FootballersSlider'
import { GreenSlider } from 'src/components/GreenSlider'
// import { MyInput } from 'src/components/MyInput'
import { RainbowSlider } from 'src/components/RainbowSlider'
import { TagCloud } from 'src/components/TagCloud'
import { useState } from 'react'
import { TextField, Alert, AlertTitle, styled } from '@mui/material'
import { MyInput } from 'src/components/MyInput'
import { Layout } from 'src/components/Layout'
import { ItemEventHeadlines } from 'src/constants/item-event-headline'
import { ItemEventHeadline } from 'src/components/item-event-headline'
import { TabPanel, Tabs } from 'src/components/Tabs'
import { Card } from 'src/components/Card'
import { CardNews } from 'src/components/card-news'
import { CardChallenges } from 'src/components/CardChallenges'
import { MyModal } from 'src/components/MyModal'
import { Text } from 'src/components/Text'
import { SvgEuro, SvgXIcon } from 'src/imports/svgs'
import { MySelect } from 'src/components/MySelect'
import { DropdownUser } from 'src/components/specific/DropdownUser'
import { MyCheckbox } from 'src/components/common/MyCheckbox'
import { Checklist } from 'src/components/common/Checklist'
import { ChangePlan } from 'src/components/specific/ChangePlan'
import { BillingDetail } from 'src/components/specific/BillingDetail'
import { InvoiceHistory } from 'src/components/specific/InvoiceHistory'
import { MyDatePicker } from 'src/components/MyDatePicker'

enum Tab {
  Friends = 'Friends',
  News = 'News',
  Diary = 'Diary',
}

const tabs = [{ text: Tab.Friends }, { text: Tab.News }, { text: Tab.Diary }]

const Components = () => {
  const [value, setValue] = useState(7)
  const [valueInput, setValueInput] = useState('')
  const [date, setDate] = useState(null)
  const [tab, setTab] = useState(Tab.Friends)
  const [show1, setShow1] = useState(false)
  const [show2, setShow2] = useState(false)
  const [showModalChangePass, setShowModalChangePass] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [country, setCountry] = useState('')
  const [checked, setChecked] = useState(false)

  const [categories, setCategories] = useState(['Frontend'])

  return (
    <Layout title="Zporter">
      <div className=" w-full min-h-screen bg-[#111115] ">
        <Tabs tab={tab} setTab={setTab} tabs={tabs} />
        <TabPanel visible={tab === Tab.Friends}>
          <div className="text-white ">Friends</div>
        </TabPanel>
        <TabPanel visible={tab === Tab.News}>
          <div className="text-white ">News</div>
        </TabPanel>
        <TabPanel visible={tab === Tab.Diary}>
          <div className="text-white ">Diary</div>
        </TabPanel>

        <div className="h-[60px] "></div>

        <FootballersSlider />

        <div className="h-[60px] "></div>

        <div className="flex space-x-3 items-end ">
          <span className="font-semibold text-Green text-[24px] leading-[138%] ">
            Positive list
          </span>
          <span className="text-Grey font-medium text-[16px] leading-[175%] ">
            65 Results
          </span>
        </div>

        <div className="h-[60px] "></div>

        <div className="w-[507px] ">
          <TagCloud
            tags={[
              { label: 'HOME', link: '#' },
              { label: 'STAKE', link: '#' },
              { label: 'MARKETPLACE', link: '#' },
              { label: 'tsraw', link: '#' },
              { label: 'wzzf', link: '#' },
              { label: 'mgpnx', link: '#' },
              { label: 'w{}zx', link: '#' },
              { label: '5wrw', link: '#' },
            ]}
          />
        </div>

        <div className="h-[60px] "></div>
        <div className="w-[384px]">
          <Comments />
        </div>

        <div className="h-[60px] "></div>

        <ButtonAdd />

        <div className=" w-[439px] ">
          <GreenSlider />
        </div>

        <div className="h-[60px] "></div>
        <div className=" w-[439px] ">
          <RainbowSlider min={0} max={10} value={value} setValue={setValue} />
        </div>

        <div className="h-[60px] "></div>

        <div className="my-6 w-[439px] ">
          <MyInput
            password
            label={'Username'}
            value={valueInput}
            onChange={(e: any) => {
              setValueInput(e.target.value)
            }}
          />
        </div>

        <div className="my-6 w-[439px] ">
          <MyDatePicker
            label="Birthdate"
            value={date}
            onChange={(e) => setDate(e)}
          />
        </div>

        <div className="h-[60px] "></div>

        <ItemEventHeadline className="w-full" item={ItemEventHeadlines} />

        <div className="h-[60px]"></div>

        <Card></Card>

        <div className="h-[60px] "></div>

        {/* <CardNews></CardNews> */}

        <div className="h-[60px] "></div>

        <CardChallenges />

        <div className="h-[60px] "></div>
        <>
          <button
            className="cursor-pointer p-4 bg-yellow-200 rounded-[4px] "
            onClick={() => {
              setShow1(true)
            }}
          >
            Open Modal 1
          </button>
          <MyModal show={show1} setShow={setShow1} width={480}>
            <div
              style={{
                boxShadow: '0px 25px 50px rgba(38, 38, 38, 0.1)',
              }}
              className=" rounded-[8px] bg-Dark-2 [padding:32px_24px_20px_24px] "
            >
              <div className="flex items-center  mb-[24px] ">
                <svg
                  className="fill-[#09E099] "
                  width="40"
                  height="40"
                  viewBox="0 0 40 40"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M28 16H12V14H28V16ZM26 10H14V12H26V10ZM30 20V28C30 29.1 29.1 30 28 30H12C10.9 30 10 29.1 10 28V20C10 18.9 10.9 18 12 18H28C29.1 18 30 18.9 30 20ZM24 24L18 20.73V27.26L24 24Z" />
                </svg>

                <Text name="Header5" className="text-white ">
                  Title
                </Text>

                <div className="flex-grow "></div>

                <svg
                  onClick={() => {
                    setShow1(false)
                  }}
                  className="cursor-pointer"
                  width="40"
                  height="40"
                  viewBox="0 0 40 40"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M13.1516 13.1516C13.3767 12.9267 13.6818 12.8003 14 12.8003C14.3182 12.8003 14.6234 12.9267 14.8484 13.1516L20 18.3032L25.1516 13.1516C25.2623 13.037 25.3947 12.9456 25.5412 12.8827C25.6876 12.8198 25.845 12.7867 26.0044 12.7853C26.1637 12.7839 26.3217 12.8143 26.4692 12.8746C26.6167 12.935 26.7506 13.0241 26.8633 13.1367C26.976 13.2494 27.0651 13.3834 27.1254 13.5309C27.1858 13.6784 27.2161 13.8364 27.2147 13.9957C27.2134 14.155 27.1803 14.3125 27.1174 14.4589C27.0545 14.6053 26.963 14.7377 26.8484 14.8484L21.6968 20L26.8484 25.1516C27.067 25.3779 27.188 25.6811 27.1852 25.9957C27.1825 26.3103 27.0563 26.6113 26.8338 26.8338C26.6113 27.0563 26.3104 27.1825 25.9957 27.1852C25.6811 27.188 25.378 27.067 25.1516 26.8484L20 21.6968L14.8484 26.8484C14.6221 27.067 14.319 27.188 14.0044 27.1852C13.6897 27.1825 13.3887 27.0563 13.1663 26.8338C12.9438 26.6113 12.8176 26.3103 12.8148 25.9957C12.8121 25.6811 12.933 25.3779 13.1516 25.1516L18.3032 20L13.1516 14.8484C12.9267 14.6234 12.8003 14.3182 12.8003 14C12.8003 13.6818 12.9267 13.3767 13.1516 13.1516Z"
                    fill="white"
                  />
                </svg>
              </div>
              <Text name="Body2" className="text-Grey mb-[36px] ">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry.
              </Text>

              <div className="flex w-full ">
                <button
                  className="rounded-[8px] h-[37px] mr-[16px] text-center py-[6px] px-[16px] 
                  border border-Green
                  flex-grow
                "
                >
                  <Text name="Header6" className="text-Green ">
                    Button 1
                  </Text>
                </button>

                <button
                  className="rounded-[8px] h-[37px] mr-[16px] text-center py-[6px] px-[16px] 
                  bg-Blue
                  flex-grow
                "
                >
                  <Text name="Header6" className="text-white ">
                    Button 2
                  </Text>
                </button>
              </div>
            </div>
          </MyModal>
        </>
        <div className="h-[60px] "></div>

        <>
          <button
            className="cursor-pointer p-4 bg-yellow-200 rounded-[4px] "
            onClick={() => {
              setShow2(true)
            }}
          >
            Open Modal 2
          </button>
          <MyModal show={show2} setShow={setShow2} width={480}>
            <div
              style={{
                boxShadow: '0px 25px 50px rgba(38, 38, 38, 0.1)',
              }}
              className=" rounded-[8px] bg-Dark-2 [padding:32px_24px_20px_24px] "
            >
              <div className="flex items-center  mb-[24px] ">
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 40 40"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M28 16H12V14H28V16ZM26 10H14V12H26V10ZM30 20V28C30 29.1 29.1 30 28 30H12C10.9 30 10 29.1 10 28V20C10 18.9 10.9 18 12 18H28C29.1 18 30 18.9 30 20ZM24 24L18 20.73V27.26L24 24Z"
                    fill="#09E099"
                  />
                </svg>

                <Text name="Header5" className="text-white ">
                  You need a subcription
                </Text>

                <div className="flex-grow "></div>

                <svg
                  onClick={() => {
                    setShow2(false)
                  }}
                  className="cursor-pointer"
                  width="40"
                  height="40"
                  viewBox="0 0 40 40"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M13.1516 13.1516C13.3767 12.9267 13.6818 12.8003 14 12.8003C14.3182 12.8003 14.6234 12.9267 14.8484 13.1516L20 18.3032L25.1516 13.1516C25.2623 13.037 25.3947 12.9456 25.5412 12.8827C25.6876 12.8198 25.845 12.7867 26.0044 12.7853C26.1637 12.7839 26.3217 12.8143 26.4692 12.8746C26.6167 12.935 26.7506 13.0241 26.8633 13.1367C26.976 13.2494 27.0651 13.3834 27.1254 13.5309C27.1858 13.6784 27.2161 13.8364 27.2147 13.9957C27.2134 14.155 27.1803 14.3125 27.1174 14.4589C27.0545 14.6053 26.963 14.7377 26.8484 14.8484L21.6968 20L26.8484 25.1516C27.067 25.3779 27.188 25.6811 27.1852 25.9957C27.1825 26.3103 27.0563 26.6113 26.8338 26.8338C26.6113 27.0563 26.3104 27.1825 25.9957 27.1852C25.6811 27.188 25.378 27.067 25.1516 26.8484L20 21.6968L14.8484 26.8484C14.6221 27.067 14.319 27.188 14.0044 27.1852C13.6897 27.1825 13.3887 27.0563 13.1663 26.8338C12.9438 26.6113 12.8176 26.3103 12.8148 25.9957C12.8121 25.6811 12.933 25.3779 13.1516 25.1516L18.3032 20L13.1516 14.8484C12.9267 14.6234 12.8003 14.3182 12.8003 14C12.8003 13.6818 12.9267 13.3767 13.1516 13.1516Z"
                    fill="white"
                  />
                </svg>
              </div>
              <Text name="Body2" className="text-Grey mb-[36px] ">
                You need a monthly subcription to activate this feature. Choose
                between the following:
              </Text>

              <div className="flex w-full ">
                <button
                  className="rounded-[8px] h-[37px] mr-[16px] text-center py-[6px] px-[16px] 
                  border border-Green
                  flex-grow
                  flex justify-center items-center
                "
                >
                  <div className="font-Inter text-Green inline-block text-[14px] leading-[24px] font-semibold  ">
                    BASIC 2
                  </div>
                  <SvgEuro className=" inline-block mb-[3px] " />
                </button>

                <button
                  className="rounded-[8px] h-[37px] mr-[16px] text-center py-[6px] px-[16px] 
                  border border-Green
                  flex-grow
                "
                >
                  <div className="font-Inter text-Green inline-block text-[14px] leading-[24px] font-semibold  ">
                    AMATEUR 20
                  </div>
                  <SvgEuro className=" inline-block mb-[3px] " />
                </button>

                <button
                  className="rounded-[8px] h-[37px] mr-[16px] text-center py-[6px] px-[16px] 
                  border border-Green
                  flex-grow
                "
                >
                  <div className="font-Inter text-Green inline-block text-[14px] leading-[24px] font-semibold ">
                    PRO 200
                  </div>
                  <SvgEuro className=" inline-block mb-[3px] " />
                </button>
              </div>
            </div>
          </MyModal>
        </>

        <div className="h-[60px] "></div>

        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          This is an error alert — <strong>check it out!</strong>
        </Alert>
        <div className="h-[60px] "></div>

        <Alert severity="warning">
          <AlertTitle>Warning</AlertTitle>
          This is a warning alert — <strong>check it out!</strong>
        </Alert>

        <div className="h-[60px] "></div>
        <Alert severity="info">
          <AlertTitle>Info</AlertTitle>
          This is an info alert — <strong>check it out!</strong>
        </Alert>

        <div className="h-[60px] "></div>

        <Alert severity="success">
          <AlertTitle>Success</AlertTitle>
          This is a success alert — <strong>check it out!</strong>
        </Alert>

        <div className="h-[60px] "></div>

        {/* /// Modal change password */}
        <>
          <button
            className="cursor-pointer p-4 bg-yellow-200 rounded-[4px] "
            onClick={() => {
              setShowModalChangePass(true)
            }}
          >
            Open Modal Change Password
          </button>
          <MyModal
            show={showModalChangePass}
            setShow={setShowModalChangePass}
            width={480}
          >
            <div
              style={{
                boxShadow: '0px 25px 50px rgba(100, 116, 139, 0.25)',
              }}
              className=" rounded-[8px] bg-Dark-2 px-[24px] pt-[32px] "
            >
              <div className="flex justify-between items-center mb-[24px]">
                <Text name="Header6" className="text-white ">
                  Change email address
                </Text>
                <SvgXIcon
                  className={undefined}
                  onClick={() => {
                    setShowModalChangePass(false)
                  }}
                />
              </div>

              <MyInput
                label={'Email address'}
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                }}
              />

              <div className="h-[16px] "></div>

              <MyInput
                password={true}
                label={'Password'}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value)
                }}
              />
              <div className="mb-[8px] "></div>

              <div className="h-[70px] flex justify-end items-center ">
                <button
                  onClick={() => {
                    setShowModalChangePass(false)
                  }}
                  className="rounded-[8px] px-[16px] py-[8px] cursor-pointer h-[38px] mr-[16px] "
                >
                  <Text name="Subtitle2" className="text-white ">
                    Cancel
                  </Text>
                </button>
                <button className="rounded-[8px] px-[20px] py-[8px] cursor-pointer h-[38px]  bg-Blue ">
                  <Text name="Subtitle2" className="text-white ">
                    Authenticate
                  </Text>
                </button>
              </div>
            </div>
          </MyModal>
        </>
        <div className="h-[60px] "></div>
        <div className="w-[439px] ">
          <MySelect
            className=""
            label={'Select Country'}
            value={country}
            onChange={(e) => {
              setCountry(e.target.value)
            }}
            arrOption={[
              { value: 'USA', label: 'USA' },
              { value: 'Sweden', label: 'Sweden' },
            ]}
          />
        </div>

        <div className="h-[60px] "></div>

        <DropdownUser />

        <div className="h-[60px] "></div>

        <MyCheckbox
          label={'Testttttttttt'}
          checked={checked}
          onChange={() => {
            setChecked(!checked)
          }}
        />

        <div className="h-[60px] "></div>

        <Checklist
          list={[
            { label: 'Business', value: 'Business' },
            { label: 'Planning', value: 'Planning' },
            { label: 'Frontend', value: 'Frontend' },
            { label: 'Design', value: 'Design' },
            { label: 'Backend', value: 'Backend' },
            { label: 'Android', value: 'Android' },
            { label: 'Ios', value: 'Ios' },
          ]}
          values={categories}
          onChange={(e, value) => {
            if (e.target.checked === true) {
              categories.push(value)
              setCategories([...categories, value])
            } else {
              setCategories(
                categories.filter((item) => {
                  return item !== value
                })
              )
            }
          }}
        />

        <div className="h-[60px] "></div>

        <div
          style={{
            background: 'rgba(32, 33, 40, 0.8)',
            boxShadow:
              '0px 4px 4px rgba(0, 0, 0, 0.25), 0px 1px 1px rgba(100, 116, 139, 0.06)',
            backdropFilter: 'blur(68px)',
          }}
          className="px-[24px] py-[32px] rounded-[8px] w-[952px]"
        >
          <ChangePlan />

          <div className="h-[1px] bg-Stroke mt-[24px] mb-[24px] "></div>

          <BillingDetail />
        </div>

        <div className="h-[60px] "></div>

        <div className="w-[952px] ">
          <InvoiceHistory />
        </div>

        <div className="h-[60px] "></div>
        <div className="h-[60px] "></div>
        <div className="h-[60px] "></div>
      </div>
    </Layout>
  )
}

export default Components

export const getServerSideProps: any = async ({ req, res }) => {
  await requireAuth(req as any, res as any)
  return { props: {} }
}
