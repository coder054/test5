import { useEffect } from 'react'

export default function Custom404() {
  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }
    window.document.location = '/feed'
  }, [])
  return null
}
