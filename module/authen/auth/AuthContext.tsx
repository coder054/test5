// import { auth } from 'config/firebase-client'
import { auth } from 'config'
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  confirmPasswordReset,
  sendPasswordResetEmail,
  signOut,
  onIdTokenChanged,
} from 'firebase/auth'
import { createContext, useContext, useEffect, useState } from 'react'

const AuthContext = createContext(null)

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState<any>(null)
  const [token, setToken] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(true)

  const signin = (email: string, password: string) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user
        // ...
      })
      .catch((error) => {
        const errorCode = error.code
        const errorMessage = error.message

        // ..
      })
  }

  const SignUpWithEmailAndPassword = (email: string, password: string) => {
    createUserWithEmailAndPassword(auth, email, password)
  }

  const signout = () => {
    signOut(auth)
    window.location.href = '/signin'
  }

  const resetPassword = (email: string) => {
    sendPasswordResetEmail(auth, email)
  }

  useEffect(() => {
    return onAuthStateChanged(auth, (authUser) => {
      setCurrentUser(authUser)
      setLoading(false)
    })
  }, [])

  useEffect(() => {
    return onIdTokenChanged(auth, async (user) => {
      if (user) {
        const token: string = await user.getIdToken()
        setToken(token)
      }
    })
  }, [])

  const value: any = {
    currentUser,
    token,
    signin,
    signout,
    SignUpWithEmailAndPassword,
    resetPassword,
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}
