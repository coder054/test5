import * as admin from 'firebase-admin'
import { NextApiRequest, NextApiResponse } from 'next'

const verifyIdToken = (token: string) => {
  const firebasePrivateKey: string = process.env.FIREBASE_PRIVATE_KEY
    ? JSON.parse(process.env.FIREBASE_PRIVATE_KEY)
    : ''

  if (!admin.apps.length) {
    try {
      let a1 = admin.initializeApp({
        credential: admin.credential.cert({
          projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
          clientEmail: process.env.FIREBASE_CLIENT_EMAIL || '',
          privateKey: firebasePrivateKey,
        }),
      })
    } catch (error) {
      console.log('error', { error })
    }
  }

  return admin
    .auth()
    .verifyIdToken(token)
    .catch((error) => {
      console.log('error', { error })
      return null
    })
}

export const loadIdToken = async (
  req: NextApiRequest
): Promise<string | null> => {
  if (!req.cookies.token) return null
  const decoded = await verifyIdToken(req.cookies.token)
  if (!decoded) return null
  return decoded.uid
}

export const requireNotAuth = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const uid = await loadIdToken(req as NextApiRequest)

  if (uid) {
    res.setHeader('location', '/feed')
    res.statusCode = 302
    res.end()
  }
}

export const requireAuth = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const uid = await loadIdToken(req as NextApiRequest)

  if (!uid) {
    res.setHeader('location', '/signin')
    res.statusCode = 302
    res.end()
  }
}
