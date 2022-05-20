import { useEffect, useRef, useState } from 'react'
import { TextAreaComment } from './text-area-comment'
import { CircularProgress } from '@mui/material'
import { useMutation, useQueryClient } from 'react-query'
import { QUERIES_COMMENTS } from 'src/constants/query-keys/query-keys.constants'
import { createCommentService } from 'src/service/feed/comment.service'
import toast from 'react-hot-toast'
import dynamic from 'next/dynamic'
import { BasicPopover } from '../popover'
const Picker = dynamic(() => import('emoji-picker-react'), { ssr: false })

interface WriteCommentType {
  postId?: string
  typeOfPost?: string
  focusComment?: boolean
}

export const WriteComment = ({
  postId,
  focusComment,
  typeOfPost,
}: WriteCommentType) => {
  const [comment, setComment] = useState<string>('')
  // const [openEmoji, setOpenEmoji] = useState<boolean>(false)
  const [chosenEmoji, setChosenEmoji] = useState(null)
  const queryClient = useQueryClient()
  const refComment = useRef(null)

  const [anchorEl, setAnchorEl] = useState(null)

  const { isLoading: loadingComment, mutate: createComment } = useMutation(
    [QUERIES_COMMENTS.CREATE_COMMENT],
    createCommentService,
    {
      onSuccess: (res) => {
        toast.success('add comment successfuly!')
        setComment('')
        queryClient.invalidateQueries(QUERIES_COMMENTS.COMMENT)
      },
    }
  )

  const onEmojiClick = (event, emojiObject) => {
    setChosenEmoji(emojiObject)
    setComment((prev) => `${prev}${emojiObject.emoji}`)
  }

  const handleChangeComment = (e) => {
    setComment(e.target.value)
  }

  const handlePostComment = () => {
    if (!comment.trim()) {
      toast.error('You must enter comment!')
      return
    }
    try {
      createComment({
        postId: postId,
        typeOfPost: typeOfPost,
        body: { content: comment },
      })
    } catch (error) {}
  }

  const handleOption = (e) => {
    setAnchorEl(e.currentTarget)
  }

  return (
    <div className="">
      <div className="w-full h-full flex items-center gap-2 mb-[12px]">
        <BasicPopover
          anchorEl={anchorEl}
          setAnchorEl={setAnchorEl}
          id="popover-emoji"
        >
          <Picker onEmojiClick={onEmojiClick} disableAutoFocus={true} native />
        </BasicPopover>
      </div>

      <div className="w-[420px] relative">
        <TextAreaComment
          label="Comment"
          value={comment}
          onChange={handleChangeComment}
          ref={refComment}
          autoFocus={focusComment}
        />
        <span
          className="text-[24px] absolute right-[36px] top-[10px] cursor-pointer"
          // onClick={() => {
          //   if (!openEmoji) {
          //     setOpenEmoji(true)
          //   } else {
          //     setOpenEmoji(false)
          //   }
          // }}
          onClick={handleOption}
        >
          &#128512;
        </span>
        {!loadingComment ? (
          <span
            className="text-[24px] absolute right-[12px] top-[10px] cursor-pointer"
            onClick={handlePostComment}
          >
            &#x27A2;
          </span>
        ) : (
          <span
            className="text-[24px] absolute right-[12px] top-[10px] cursor-pointer"
            // onClick={handlePostComment}
          >
            <CircularProgress
              color="primary"
              style={{ width: '16px', height: '16px' }}
            />
          </span>
        )}
      </div>
    </div>
  )
}
