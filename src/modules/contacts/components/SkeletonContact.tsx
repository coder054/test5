import { Skeleton } from '@mui/material'
import { Fragment } from 'react'

const SkeletonContact = () => {
  const LENGTH = Array(10)
    .fill(0)
    .map(() => ({}))
  return (
    <Fragment>
      {LENGTH.map((_, index) => (
        <div
          key={index}
          className="min-h-[82px] w-full flex space-x-5 items-center bg-[#202128cc] rounded-lg  py-3.5 px-4 mb-5"
        >
          <span>
            <Skeleton
              variant="rectangular"
              width={60}
              height={60}
              sx={{ borderRadius: 1 }}
            />
          </span>
          <span className="w-full">
            <Skeleton width={210} variant="text" />
            <Skeleton variant="text" />
          </span>
        </div>
      ))}
    </Fragment>
  )
}

export default SkeletonContact
