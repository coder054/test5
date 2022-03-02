import { get, isEmpty } from 'lodash'
import Link from 'next/link'

import { Text } from 'src/components/Text'
import { useEffect, useMemo, useState } from 'react'
import { IPlayerProfile } from 'src/components/dashboard/dashboard-navbar'
import { axios } from 'src/utils/axios'
import { useAuth } from '../authen/auth/AuthContext'
import clsx from 'clsx'
import { truncateStr } from 'src/utils/utils'

export const NavigationAndFilter = ({ username }, { username: string }) => {
  const { authenticated, playerProfile } = useAuth() as {
    playerProfile: IPlayerProfile
    authenticated: boolean
  }
  const [loadingDataFlip, setLoadingDataFlip] = useState(true)
  const [dataFlip, setDataFlip] = useState([])
  const [currentIndexFlip, setCurrentIndexFlip] = useState(0)

  useEffect(() => {
    const getFlipData = async () => {
      try {
        const { data } = await axios.get(
          `/biographies/list-player-for-flipping?username=${username}&pageNumber=1&pageSize=2000`
        )
        setDataFlip(data.data)
      } catch (error) {
      } finally {
        setLoadingDataFlip(false)
      }
    }

    getFlipData()
  }, [])

  useEffect(() => {
    if (isEmpty(dataFlip)) {
      setCurrentIndexFlip(-1)
    }

    let index = dataFlip.findIndex((o) => {
      return o.username === username
    })
    // console.log('aaa1 index', index)
    setCurrentIndexFlip(index)
  }, [dataFlip, username])
  useEffect(() => {
    // console.log('aaa currentIndexFlip: ', currentIndexFlip)
  }, [currentIndexFlip])

  // useEffect(() => {
  //   // console.log('aaa1 dataFlip: ', dataFlip)
  // }, [dataFlip])
  // useEffect(() => {
  //   // console.log('aaa1 currentIndexFlip: ', currentIndexFlip)
  // }, [currentIndexFlip])

  const nextFlipUrl: string = useMemo(() => {
    if (isEmpty(dataFlip)) {
      return ''
    }

    const nextUser = get(dataFlip, `[${currentIndexFlip + 1}]`) || {}
    const firstname = (get(nextUser, 'firstName') || '')
      .toLowerCase()
      .replaceAll(' ', '')
    const lastname = (get(nextUser, 'lastName') || '')
      .toLowerCase()
      .replaceAll(' ', '')
    const fullname = `${firstname}.${lastname}`

    return `/biography/${nextUser.username}/${fullname}`
  }, [dataFlip, currentIndexFlip])

  const prevFlipUrl: string = useMemo(() => {
    if (isEmpty(dataFlip)) {
      return ''
    }

    const prevUser = get(dataFlip, `[${currentIndexFlip - 1}]`) || {}

    const firstname = (get(prevUser, 'firstName') || '')
      .toLowerCase()
      .replaceAll(' ', '')
    const lastname = (get(prevUser, 'lastName') || '')
      .toLowerCase()
      .replaceAll(' ', '')
    const fullname = `${firstname}.${lastname}`

    return `/biography/${prevUser.username}/${fullname}`
  }, [dataFlip, currentIndexFlip])

  // if (loadingDataFlip) {
  //   return (
  //     <div className=" p-[40px] text-center">
  //       <Loading size={40}></Loading>
  //     </div>
  //   )
  // }

  const renderBtnPrev = () => {
    if (isEmpty(dataFlip)) {
      return null
    }
    return (
      <Link href={prevFlipUrl}>
        <a
          className={clsx(
            ` inline-block px-4 py-2 `,
            currentIndexFlip <= 0 || !prevFlipUrl
              ? ' pointer-events-none '
              : '  '
          )}
        >
          <svg
            onClick={() => {
              // setCnt(cnt - 1)
              if (currentIndexFlip <= 0 || !prevFlipUrl) {
                return
              }
              setCurrentIndexFlip(currentIndexFlip - 1)
            }}
            className={clsx(
              ``,
              currentIndexFlip <= 0 || !prevFlipUrl
                ? ' fill-Grey '
                : ' fill-Green cursor-pointer'
            )}
            width="24"
            height="25"
            viewBox="0 0 24 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M15.41 17.09L10.83 12.5L15.41 7.91L14 6.5L8 12.5L14 18.5L15.41 17.09Z" />
          </svg>
        </a>
      </Link>
    )
  }
  const renderBtnNext = () => {
    if (isEmpty(dataFlip)) {
      return null
    }
    return (
      <Link href={nextFlipUrl}>
        <a
          className={clsx(
            ` inline-block px-4 py-2`,
            currentIndexFlip >= dataFlip.length - 1 || !nextFlipUrl
              ? ' pointer-events-none '
              : '  '
          )}
        >
          <svg
            onClick={() => {
              // setCnt(cnt + 1)
              if (currentIndexFlip >= dataFlip.length - 1 || !nextFlipUrl) {
                return
              }
              setCurrentIndexFlip(currentIndexFlip + 1)
            }}
            className={clsx(
              ``,
              currentIndexFlip >= dataFlip.length - 1 || !nextFlipUrl
                ? ' fill-Grey '
                : ' fill-Green cursor-pointer'
            )}
            width="24"
            height="25"
            viewBox="0 0 24 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M8.59003 17.09L13.17 12.5L8.59003 7.91L10 6.5L16 12.5L10 18.5L8.59003 17.09Z" />
          </svg>
        </a>
      </Link>
    )
  }

  return (
    <div className="h-[33px] mt-[24px] xl:flex items-center justify-center relative mb-[30px] xl:mb-0 ">
      <div className=" flex items-center  xl:pr-[40px] w-[300px] sm:w-[358px] mx-auto ">
        {renderBtnPrev()}
        <div className="grow "></div>
        <Text name="Header5" className="text-white w-[274px] text-center ">
          {`#${truncateStr(username, 22)}`}
        </Text>
        <div className="grow "></div>
        {renderBtnNext()}
      </div>
      <div className=" hidden xl:absolute xl:right-0 xl:top-[4px] items-center mx-auto text-center justify-center">
        <Text name="Body2" className="text-white mr-[16px] ">
          4 Filters selected
        </Text>
        <svg
          width="24"
          height="25"
          viewBox="0 0 24 25"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4 11.5H16V13.5H4V11.5ZM4 6.5H20V8.5H4V6.5ZM4 18.5H11H11.235V16.5H11H4V18.5Z"
            fill="#09E099"
          />
        </svg>
      </div>
    </div>
  )
}
