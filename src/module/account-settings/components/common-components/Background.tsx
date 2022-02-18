import { ReactElement } from 'react'

type BackGroundProps = {
  label: string
  form?: ReactElement
}

export const BackGround = ({ label, form }: BackGroundProps) => {
  return (
    <div className="bg-[#202128cc] rounded-[8px] px-8 py-9 w-[900px] flex justify-between">
      <h1 className="text-white text-[16px] font-semibold">{label}</h1>
      <div className="w-[400px]">{form}</div>
    </div>
  )
}
