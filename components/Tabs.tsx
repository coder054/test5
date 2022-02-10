import clsx from 'clsx'

export const Tabs = ({
  tab,
  setTab,
  tabs,
}: {
  tab: any
  setTab: any
  tabs: any[]
}) => {
  return (
    <div className=" flex space-x-2 mb-6">
      {tabs.map((o, index) => (
        <div
          onClick={() => {
            setTab(o.text)
          }}
          key={index}
          className={clsx(
            `relative px-4 py-[13px]  text-[14px] leading-[157%] font-medium  cursor-pointer select-none`,
            tab === o.text
              ? ' text-Yellow after:absolute after:h-[2px] after:w-100%-32px after:bg-Yellow after:bottom-0 after:left-[16px]'
              : ' text-Grey '
          )}
        >
          {o.text}
        </div>
      ))}
    </div>
  )
}

export const TabPanel = ({
  children,
  visible,
}: {
  children: any
  visible: boolean
}) => {
  return <div className={clsx(``, visible ? '  ' : ' hidden ')}>{children}</div>
}
