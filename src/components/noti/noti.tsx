import * as localforage from 'localforage'
import { isEmpty } from 'lodash'
import { useEffect } from 'react'
import { notiToast } from 'src/components/common/Toast'
import { initFirebaseFCM } from 'src/config/firebase-client'
import { getErrorMessage } from 'src/utils/utils'

export const Noti = ({ token, currentRoleId }) => {
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
