import { Divider } from '@mui/material'
import { formatDistanceToNowStrict } from 'date-fns'
import { useEffect, useState, useMemo } from 'react'
import toast from 'react-hot-toast'
import { useMutation, useQueryClient } from 'react-query'
import { CommentType } from 'src/components/card-feeds/constants/types'
import { QUERIES_COMMENTS } from 'src/constants/query-keys/query-keys.constants'
import { SvgClock, SvgFavorite } from 'src/imports/svgs'
import { useAuth } from 'src/modules/authentication/auth/AuthContext'
import {
  blockCommentService,
  deleteCommentService,
  likeCommentService,
} from 'src/service/feed/comment.service'
import { safeHttpImage } from 'src/utils/utils'
import { OptionFeed } from '../../../option-feed'

interface CommentTypes {
  comment: CommentType
  postId?: string
  typeOfPost?: string
}

export const Comment = ({ comment, postId, typeOfPost }: CommentTypes) => {
  const { currentRoleId, userRoles } = useAuth()
  const [isLike, setIsLike] = useState<boolean>(comment?.isLiked)
  const [countLike, setCountLike] = useState<number>(0)
  const queryClient = useQueryClient()

  const { mutate: likeComment } = useMutation(
    [QUERIES_COMMENTS.LIKE_COMMENT],
    likeCommentService,
    {
      onSuccess: () => {},
      onError: (err) => {
        toast.error('Something went wrong')
      },
    }
  )

  const { isLoading, mutate: blockComment } = useMutation(
    [QUERIES_COMMENTS.BLOCK_COMMENT],
    blockCommentService,
    {
      onSuccess: (res) => {
        toast.success('Block comment successfully!')
        queryClient.invalidateQueries(QUERIES_COMMENTS.COMMENT)
      },
      onError: (err) => {
        toast.error('Something went wrong')
      },
    }
  )

  const { mutate: deleteComment } = useMutation(
    [QUERIES_COMMENTS.DELETE_COMMENT],
    deleteCommentService,
    {
      onSuccess: (res) => {
        toast.success('Delete comment successfully!')
        queryClient.invalidateQueries(QUERIES_COMMENTS.COMMENT)
      },
      onError: () => {
        toast.error('Something went wrong')
      },
    }
  )

  useEffect(() => {
    if (countLike === 10) {
      toast.error('Limit like comment in a minute.')
      setTimeout(() => {
        setCountLike(0)
      }, 60000)
    }
  }, [countLike])

  const handleLikeComment = () => {
    if (!isLike && countLike !== 10) {
      setIsLike(true)
      setCountLike(countLike + 1)
      try {
        likeComment({
          postId: postId,
          typeOfPost: typeOfPost,
          commentId: comment?.commentId,
          query: 'like',
        })
      } catch (error) {}
    } else if (isLike && countLike !== 10) {
      setIsLike(false)
      setCountLike(countLike + 1)
      try {
        likeComment({
          postId: postId,
          typeOfPost: typeOfPost,
          commentId: comment?.commentId,
          query: 'unlike',
        })
      } catch (error) {}
    }
  }

  const handleBlockComment = () => {
    try {
      blockComment({
        postId: postId,
        typeOfPost: typeOfPost,
        commentId: comment?.commentId,
      })
    } catch (error) {}
  }

  const handleDeleteComment = () => {
    try {
      deleteComment({
        postId: postId,
        typeOfPost: typeOfPost,
        commentId: comment?.commentId,
      })
    } catch (error) {}
  }

  const optionComment = useMemo(() => {
    if (comment?.userId === currentRoleId) {
      return (
        <OptionFeed
          type={'comment'}
          className="mr-2"
          handleBlockComment={handleBlockComment}
          handleDeleteComment={handleDeleteComment}
          comment={comment}
          checkAccount="sameRole"
        />
      )
    } else {
      for (let i = 0; i < userRoles.length; i++) {
        if (userRoles[i].roleId === comment?.userId) {
          return null
        }
      }
    }

    return (
      <OptionFeed
        type={'comment'}
        className="mr-2"
        handleBlockComment={handleBlockComment}
        handleDeleteComment={handleDeleteComment}
        comment={comment}
      />
    )
  }, [currentRoleId, userRoles, comment])

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
        {/* <OptionFeed
          type={'comment'}
          className="mr-2"
          handleBlockComment={handleBlockComment}
          handleDeleteComment={handleDeleteComment}
          comment={comment}
        /> */}
        {optionComment}
      </div>

      <div className="mt-[12px] mb-[16px] text-[14px]">{comment?.content}</div>

      <div
        onClick={handleLikeComment}
        className="hover:scale-110 duration-150 w-[15px]"
      >
        <SvgFavorite active={isLike} />
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
