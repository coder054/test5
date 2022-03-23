import { atom, useAtom } from 'jotai'
import { isEmpty } from 'lodash'
import { useEffect } from 'react'
import { useQueryParam, StringParam } from 'use-query-params'

export const signingOutAtom = atom(false)
// const [signingOut, setSigningOut] = useAtom(signingOutAtom)
