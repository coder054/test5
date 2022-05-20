import React from 'react'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/material.css'

export const MyPhoneInput = ({ setPhone }: { setPhone: Function }) => {
  return (
    <PhoneInput
      onChange={(e) => setPhone(e)}
      inputClass="bg-transparent w-full py-3.5"
      dropdownClass="bg-black"
    />
  )
}
