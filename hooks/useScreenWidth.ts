import { useState, useEffect } from 'react'
import _ from 'lodash'

export const useScreenWidth = () => {
  const [screenWidth, setScreenWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 0
  )

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.onresize = function () {
        setScreenWidth(window.innerWidth)
      }
    }
  }, [])
  return { screenWidth }
}
