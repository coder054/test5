import clsx from 'clsx'
import { Text } from 'src/components/Text'
import { ReactChild, useState } from 'react'

export const TitleCollapse = ({
  title,
  children,
  alwayShowContent,
}: {
  title: string
  children: any
  alwayShowContent: any
}) => {
  const [show, setShow] = useState(true)
  return (
    <>
      <div className="flex items-center justify-between ">
        {alwayShowContent ? (
          alwayShowContent
        ) : (
          <Text name="Subtitle1" className="text-white">
            {title}
          </Text>
        )}

        <svg
          className={clsx(
            ` cursor-pointer duration-200 transform`,
            show ? ' rotate-0 ' : '  -rotate-90 '
          )}
          onClick={() => {
            setShow(!show)
          }}
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7.41 8.58984L12 13.1698L16.59 8.58984L18 9.99984L12 15.9998L6 9.99984L7.41 8.58984Z"
            fill="#818389"
          />
        </svg>
      </div>
      <div
        className={clsx(
          ` overflow-hidden  duration-1000 `,
          show ? ' h-min ' : ' h-0 '
        )}
      >
        {children}
      </div>
    </>
  )
}
