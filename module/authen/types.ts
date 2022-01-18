export interface RequestSigin {
  email: string
  password: string
  returnSecureToken?: boolean
}

export interface ResponseSignin {
  kind?: string
  localId?: string
  email?: string
  displayName?: string
  idToken?: string
  registered?: boolean
  refreshToken?: string
  expiresIn?: string
}
