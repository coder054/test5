import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getStorage } from 'firebase/storage'
import { getMessaging, getToken, onMessage } from 'firebase/messaging'
import { getErrorMessage, parseCookies } from 'src/utils/utils'
import { axios } from 'src/utils/axios'
import { COOKIE_KEY } from 'src/constants/constants'
import { notiToast } from 'src/components/common/Toast'
import { useEffect, useRef, useState } from 'react'
import { useAtom } from 'jotai'
import { notiListAtom } from 'src/atoms/chatAtom'
import { initFirebaseFCM } from 'src/config/firebase-client'
import { useAuth } from 'src/module/authen/auth/AuthContext'
import { isEmpty } from 'lodash'

export const Noti = () => {
  const { token, currentRoleId } = useAuth()
  const [notiList, setNotiList] = useAtom(notiListAtom)
  const notiListRef = useRef(notiList)

  useEffect(() => {
    notiListRef.current = notiList
  }, [notiList])

  useEffect(() => {
    if (!!currentRoleId && !!token) {
      initFirebaseFCM(token, currentRoleId, notiListRef, setNotiList)
    }
  }, [currentRoleId, token])

  useEffect(() => {
    console.log('aaa notiList: ', notiList)
  }, [notiList])

  useEffect(() => {
    const interval = setInterval(() => {
      if (isEmpty(notiListRef.current)) {
        return
      }

      if (!window.document.hasFocus()) {
        return
      }
      const last = notiListRef.current[notiListRef.current.length - 1]
      const first = notiListRef.current[0]
      const noLast = notiListRef.current.slice(
        0,
        notiListRef.current.length - 1
      )

      const noFirst = notiListRef.current.slice(1, notiListRef.current.length)
      notiListRef.current = noFirst
      setNotiList(noFirst)
      console.log('aaa first', first)
    }, 2000)
    return () => {
      clearInterval(interval)
    }
  }, [])

  return null
}
