import { useEffect } from 'react'

export default function index() {
  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }
    window.document.location = '/feed'
  }, [])
  return null
}
