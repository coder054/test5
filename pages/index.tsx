// import { useEffect } from 'react'

// export default function Index() {
//   useEffect(() => {
//     if (typeof window === 'undefined') {
//       return
//     }
//     window.document.location = '/feed'
//   }, [])
//   return null
// }

import Landing from 'module/landing'

const LandingPage = () => {
  return <Landing />
}

export default LandingPage
