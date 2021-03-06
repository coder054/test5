import clsx from 'clsx'

export const Tabs = ({
  tab,
  setTab,
  tabs,
  className,
}: {
  tab: any
  setTab: any
  tabs: any[]
  className?: string
}) => {
  return (
    <div
      className={clsx(
        'flex space-x-0 md:space-x-2 mb-6 overflow-x-auto',
        className
      )}
    >
      {tabs.map((o, index) => (
        <div
          onClick={() => {
            setTab(o.text)
          }}
          key={index}
          className={clsx(
            `relative px-2.5 md:px-4 py-[13px] text-[14px] leading-[157%] font-medium  cursor-pointer select-none hover:text-Yellow duration-200`,
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
  unmount = false,
}: {
  children: any
  visible: boolean
  unmount?: boolean
}) => {
  if (unmount === true) {
    if (visible) {
      return <div>{children}</div>
    } else {
      return null
    }
  } else {
    return (
      <div className={clsx(``, visible ? '  ' : ' hidden ')}>{children}</div>
    )
  }
}
