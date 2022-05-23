import { useRouter } from 'next/router'
import React, { ReactElement } from 'react'
import { Logo } from 'src/components/logo'
import { Footer } from 'src/modules/landing-page/components/Footer'

interface SupportLayoutProps {
  children: ReactElement
  title?: string
}

export default function SupportLayout({ children, title }: SupportLayoutProps) {
  const router = useRouter()
  return (
    <div className="bg-[#13131C]">
      <div className="p-8">
        <button onClick={() => router.push('/')}>
          <Logo />
        </button>
        <p className="text-3xl text-center my-4 font-bold">{title}</p>
        <div className="tabletM:w-3/5 mx-auto">{children}</div>
      </div>
      <Footer />
    </div>
  )
}
