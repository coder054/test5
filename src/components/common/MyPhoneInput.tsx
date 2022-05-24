import React from 'react'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/material.css'
import { useIPGeolocation } from 'src/hooks/useIPGeolocation'

export const MyPhoneInput = ({ setPhone }: { setPhone: Function }) => {
  const data = useIPGeolocation()

  return (
    <PhoneInput
      onChange={(e) => setPhone(e)}
      inputClass="bg-transparent w-full py-3.5"
      dropdownClass="bg-black"
      country={data?.countryCode.toLowerCase()}
    />
  )
}
