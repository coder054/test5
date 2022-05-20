import Link from 'next/link'
import { Logo } from 'src/components/logo'

export const Footer = () => {
  return (
    <div className="bg-[#13131C]">
      <div className="laptopM:w-[1320px] mx-auto py-14 space-y-14 mobileM:px-[30px]">
        <div className="grid laptopM:grid-cols-4 laptopM:space-x-12 mobileM:space-y-5">
          <div className="flex flex-col items-start space-y-5">
            <span className="scale-150 -ml-[20px] px-4">
              <Logo />
            </span>
            <p className="font-medium text-[14px] laptopM:w-[280px]">
              Zporter is a free software as a service via web- and apps to
              entertain, grow and empower (young) football talents globally in a
              healthier way.
            </p>
          </div>
          <div className="text-[16px]">
            <p className="font-bold pb-7">MENU</p>
            <ul className="mobileM:pl-4 laptopM:pl-0 font-medium space-y-4">
              <li>Home</li>
              <li>Sign up & In</li>
              <li>Biographies</li>
              <li>Support</li>
            </ul>
          </div>
          <div className="text-[16px]">
            <p className="font-bold pb-7">LEGAL</p>
            <ul className="mobileM:pl-4 laptopM:pl-0 font-medium space-y-4">
              <li>About us</li>
              <li>
                <Link href="/term-and-conditions">Term & Conditions</Link>
              </li>
              <li>
                <Link href="/privacy-rules">Privacy rules</Link>
              </li>
              <li>
                <Link href="/faqs">Support</Link>
              </li>
            </ul>
          </div>
          <div className="text-[16px]">
            <p className="font-bold pb-7">SOCIAL</p>
            <ul className="mobileM:pl-4 laptopM:pl-0 font-medium space-y-4">
              <li>Instagram</li>
              <li>Facebook</li>
              <li>Twitter</li>
              <li>Tiktok</li>
            </ul>
          </div>
        </div>
        <p className="font-normal text-[12px] mobileM:text-center laptopM:text-left tracking-wide">
          All Rights Reserved Zporter Inv. AB Sweden.
        </p>
      </div>
    </div>
  )
}
