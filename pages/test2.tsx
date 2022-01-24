import { Layout } from 'components/Layout'
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from 'firebase/auth'
import { useEffect } from 'react'

const Test = () => {
  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }
    debugger
    const auth = getAuth()
    debugger
    //@ts-ignore: Unreachable code error
    window.recaptchaVerifier = new RecaptchaVerifier('aaa', {}, auth)
    debugger
  }, [])

  const a1 = () => {
    if (typeof window === 'undefined') {
      return
    }

    const auth = getAuth()
    //@ts-ignore: Unreachable code error
    const appVerifier = window.recaptchaVerifier
    const phoneNumber = '+84931565194'

    signInWithPhoneNumber(auth, phoneNumber, appVerifier)
      .then((confirmationResult) => {
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        debugger
        //@ts-ignore: Unreachable code error
        window.confirmationResult = confirmationResult

        const code = '123456'
        confirmationResult
          .confirm(code)
          .then((result) => {
            // User signed in successfully.
            debugger
            const user = result.user
            // ...
          })
          .catch((error) => {
            debugger
            // User couldn't sign in (bad verification code?)
            // ...
          })
        // ...
      })
      .catch((error) => {
        debugger
        // Error; SMS not sent
        // ...
      })
  }

  return (
    <Layout>
      <div className="w-[500px] h-[300px] border " id="aaa"></div>
      <button onClick={a1} className="border p-10 bg-red-500 ">
        click
      </button>
    </Layout>
  )
}

export default Test
