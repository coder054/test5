import clsx from 'clsx'
import React from 'react'
import { AppStoreSvg, GGPlaySvg } from 'src/components/icons'

interface DownloadGroupProps {
  className?: string
}

export default function DownloadGroup({ className }: DownloadGroupProps) {
  return (
    <div
      className={clsx(
        'flex mobileM:justify-between tabletM:justify-center tabletM:space-x-4',
        className
      )}
    >
      <button>
        <AppStoreSvg />
      </button>
      <button>
        <GGPlaySvg />
      </button>
    </div>
  )
}
