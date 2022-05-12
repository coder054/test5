import clsx from 'clsx'
import { useAtom } from 'jotai'
import { useEffect, useState } from 'react'
import { diaryAtom } from 'src/atoms/diaryAtoms'

type TabsProps = {
  value: { label: string; value: string }[]
  onChange: (value: string) => void
  current: string
}

export const Tabs = ({ value, onChange, current }: TabsProps) => {
  const [currentTab, setCurrentTab] = useState<string>('')
  const [diary] = useAtom(diaryAtom)

  useEffect(() => {
    current && setCurrentTab(current)
  }, [current])

  return (
    <div className="flex flex-wrap">
      {value.map((it) => (
        <button
          type="button"
          disabled={diary?.diaryId && currentTab !== it.value}
          onClick={() => onChange(it.value)}
          className={clsx(
            '  border-[1px] border-[#64748b] mobileM:text-[12px] tabletM:text-[14px] font-medium py-2 px-4 mr-2 mb-2  rounded-full hover:bg-[#09E099]  cursor-pointer duration-150',
            currentTab === it.value
              ? 'bg-[#09E099]'
              : 'bg-[#64748b] bg-opacity-[0.4]',
            diary?.diaryId &&
              currentTab !== it.value &&
              ' bg-[#202128cc] bg-opacity-0  hover:bg-inherit text-gray-500'
          )}
        >
          {it.label}
        </button>
      ))}
    </div>
  )
}
