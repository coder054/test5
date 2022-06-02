import React from 'react'
import { ModalMui } from 'src/components/ModalMui'

interface CookiesPolicyProps {
  isOpen: boolean
  onClose: (value: boolean) => void
  onSubmit: () => void
}

export default function CookiesPolicy({
  isOpen,
  onClose,
  onSubmit,
}: CookiesPolicyProps) {
  const handleSubmit = () => {
    onClose(false)
    onSubmit()
  }
  return (
    <ModalMui
      sx={{ backgroundColor: '#ffffff' }}
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="space-y-6 text-black">
        <p className="text-2xl text-left font-bold">Privacy Policy</p>
        <p className="font-medium text-base">
          This website uses cookies to improve your experience while you
          navigate through the website. Out of these cookies, the cookies that
          are categorized as necessary are stored on your browser as they as
          essential for the working of basic functionalities of the website.
        </p>
        <p className="font-medium text-base">
          We also use third-party cookies that help us analyze and understand
          how you use this website, to store user preferences and provide them
          with content and advertisements that are relevant to you. These
          cookies will only be stored on your browser with your consent to do
          so.
        </p>
        <p className="font-medium text-base">
          You also have the option to opt-out of these cookies. But opting out
          of some of these cookies may have an effect on your browsing
          experience
        </p>
        <div className="flex justify-end">
          <button
            onClick={handleSubmit}
            className="bg-black text-white text-base font-semibold py-2.5 px-8 hover:bg-white hover:text-black border-2 border-white hover:border-black duration-200 active:scale-105"
          >
            Accept all cookies
          </button>
        </div>
      </div>
    </ModalMui>
  )
}
