import clsx from 'clsx'
import { useEffect, useState } from 'react'

type TabsProps = {
  value: { label: string; value: string }[]
  onChange: (value: string) => void
  current: string
}

export const Tabs = ({ value, onChange, current }: TabsProps) => {
  const [currentTab, setCurrentTab] = useState<string>('')
  useEffect(() => {
    current && setCurrentTab(current)
  }, [current])

  console.log(currentTab)
  return (
    <div className="flex flex-wrap">
      {value.map((it) => (
        <span
          onClick={() => onChange(it.value)}
          className={clsx(
            ' text-white text-[14px] font-medium py-2 px-4 mr-2 mb-2 rounded-full hover:bg-[#09E099] cursor-pointer duration-150',
            currentTab === it.value
              ? 'bg-[#09E099]'
              : 'bg-[#64748b] bg-opacity-[0.4]'
          )}
        >
          {it.label}
        </span>
      ))}
    </div>
  )
}
