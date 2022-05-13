import { useEffect, useMemo, useState } from 'react'
import axiosLib from 'axios'
import { isEmpty } from 'lodash'
import { countries } from 'src/components/dashboard/account/countries'
export interface IGeolocation {
  status: string
  country: string
  countryCode: string
  region: string
  regionName: string
  city: string
  zip: string
  lat: number
  lon: number
  timezone: string
  isp: string
  org: string
  as: string
  query: string
}

export const useIPGeolocation = () => {
  const [data, setData] = useState<IGeolocation>(null)
  useEffect(() => {
    ;(async function () {
      try {
        const resp = await axiosLib.get(`https://api.country.is/`)
        const resp2 = await axiosLib.get(
          `http://ip-api.com/json/${resp.data.ip}`
        )
        setData(resp2.data)
      } catch (error) {
        //
      }
    })()
  }, [])

  // const countryText = useMemo(() => {
  //   if (isEmpty(data.country)) {
  //     return ''
  //   }

  //   let c = countries.find((o) => o.value === data.country)
  //   if (!isEmpty(c)) {
  //     return c.text
  //   }
  //   return ''
  // }, [data])

  return data
}
