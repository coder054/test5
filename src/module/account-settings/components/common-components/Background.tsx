import { ReactElement } from 'react'

type BackGroundProps = {
  label: string
  form?: ReactElement
}

export const BackGround = ({ label, form }: BackGroundProps) => {
  return (
    <div className="bg-[#202128cc] rounded-[8px] px-8 py-9 xl:w-[900px] xl:flex justify-between space-y-6 xl:space-y-0">
      <h1 className="text-white text-[16px] font-semibold">{label}</h1>
      <div className="xl:w-[400px]">{form}</div>
    </div>
  )
}
