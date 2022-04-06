import * as localforage from 'localforage'
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

  useEffect(() => {
    if (!!currentRoleId && !!token) {
      initFirebaseFCM(token, currentRoleId)
    }
  }, [currentRoleId, token])

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        if (!window.document.hasFocus()) {
          return
        }
        const notiList: any =
          JSON.parse(await localforage.getItem('notiList')) || []

        if (isEmpty(notiList)) {
          return
        }

        const last = notiList[notiList.length - 1]
        const first = notiList[0]
        const noLast = notiList.slice(0, notiList.length - 1)

        const noFirst = notiList.slice(1, notiList.length)

        console.log('aaa first', first)

        await localforage.setItem('notiList', JSON.stringify(noFirst))
      } catch (error) {
        notiToast({
          message: getErrorMessage(error),
          type: 'error',
        })
      }
    }, 2000)
    return () => {
      clearInterval(interval)
    }
  }, [])

  return null
}
