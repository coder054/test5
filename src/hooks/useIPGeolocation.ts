import axiosLib from 'axios'
import { useEffect, useState } from 'react'
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

  return data
}
