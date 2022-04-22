import { Popover, Tooltip } from '@mui/material'
import clsx from 'clsx'
import React, { Fragment, ReactElement, useState } from 'react'
import { MoreOptionsIcon } from 'src/components/icons'
import { CARD } from 'src/constants/mocks/class.constants'
import { safeHttpImage } from 'src/utils/utils'

interface CardProps {
  name: string
  city?: string
  club?: string
  avatar: string
  users: string[]
  roles?: string[]
  rounded?: boolean
  commonOptions?: ReactElement
  dropdownOptions?: ReactElement
  onClick?: () => void
}

export default function Card({
  name,
  users,
  avatar,
  roles,
  city,
  club,
  rounded,
  onClick,
  commonOptions,
  dropdownOptions,
}: CardProps) {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)
  const open = Boolean(anchorEl)
  const id = open ? 'simple-popover' : undefined

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()
    setAnchorEl(event.currentTarget)
  }

  const handleClose = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()
    setAnchorEl(null)
  }

  return (
    <button type="button" className={clsx(CARD.CARD)} onClick={onClick}>
      <div className="grid grid-cols-12 gap-x-11">
        <div className="flex space-x-4 col-span-4">
          <img
            className={clsx(
              CARD.CARD_AVATAR,
              rounded ? 'rounded-full' : 'rounded-lg'
            )}
            src={avatar ? safeHttpImage(avatar) : '/favicon.png'}
          />
          <div className="flex flex-col justify-center space-y-2">
            <p className=" font-semibold text-[18px]">{name}</p>
            <Tooltip
              title={(users || []).map((name: string) => name).join(', ')}
            >
              <p className=" text-[#A2A5AD] font-normal text-[12px] laptopM:text-[14px] w-[250px] truncate cursor-pointer">
                {(users || []).map((name: string) => name).join(', ')}
              </p>
            </Tooltip>
          </div>
        </div>
        <div className="col-span-6 grid grid-cols-3 items-center text-[16px] font-normal">
          {roles && <p>{roles.map((it) => it).join(', ')}</p>}
          {city && <p>{city}</p>}
          {club && <p>{club}</p>}
        </div>
        <div className="col-span-2 flex space-x-4 items-center justify-center">
          {commonOptions}
          {dropdownOptions && (
            <Fragment>
              <button type="button" aria-describedby={id} onClick={handleClick}>
                <MoreOptionsIcon />
              </button>
              <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
              >
                {dropdownOptions}
              </Popover>
            </Fragment>
          )}
        </div>
      </div>
    </button>
  )
}
