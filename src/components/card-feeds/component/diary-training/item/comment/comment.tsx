import { Divider } from '@mui/material'
import { formatDistanceToNowStrict } from 'date-fns'
import { CommentType } from 'src/components/card-feeds/constants/types'
import { SvgClock, SvgFavorite } from 'src/imports/svgs'
import { safeHttpImage } from 'src/utils/utils'
import { OptionFeed } from '../../../option-feed'

interface CommentTypes {
  comment: CommentType
}

export const Comment = ({ comment }: CommentTypes) => {
  return (
    <div className="w-full">
      <div className="flex">
        <img
          src={safeHttpImage(comment?.faceImage)}
          className="w-[40px] h-[40px] rounded-full object-cover"
        ></img>
        <div className="float-left pl-[12px]">
          <p className="text-[16px]">
            {comment?.firstName} {comment?.lastName}
          </p>
          <p className="text-[12px] text-[#A2A5AD]">
            <SvgClock />
            {formatDistanceToNowStrict(comment?.createdAt as number)}
          </p>
        </div>

        <div className="spacer flex-grow"></div>
        <OptionFeed
          // userId={card?.userId}
          type={'comment'}
          // card={card}
          // reportUserName={card?.userInfo?.username}
        />
      </div>

      <div className="mt-[12px] mb-[16px] text-[14px]">{comment?.content}</div>

      <div>
        <SvgFavorite active={comment?.isLiked} />
      </div>

      <Divider
        style={{
          backgroundColor: '#484A4D',
          marginTop: '24px',
          marginBottom: '24px',
        }}
      />
    </div>
  )
}
