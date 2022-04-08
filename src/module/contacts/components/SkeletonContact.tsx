import { Skeleton } from '@mui/material'

const SkeletonContact = () => {
  const LENGTH = Array(5)
    .fill(0)
    .map(() => ({}))
  return (
    <>
      {LENGTH.map((_, index) => (
        <div
          key={index}
          className="min-h-[82px] w-full flex space-x-5 items-center bg-[#202128cc] rounded-lg p-4 my-5"
        >
          <span>
            <Skeleton
              variant="rectangular"
              width={50}
              height={50}
              sx={{ borderRadius: 1 }}
            />
          </span>
          <span className="w-full">
            <Skeleton width={210} variant="text" />
            <Skeleton variant="text" />
          </span>
        </div>
      ))}
    </>
  )
}

export default SkeletonContact
