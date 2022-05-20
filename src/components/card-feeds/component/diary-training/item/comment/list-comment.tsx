import { Fragment, useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { useInfiniteQuery, useQuery } from 'react-query'
import { MiniLoading } from 'src/components/mini-loading'
import { Loading } from 'src/components/MyLoading'
import { WriteComment } from 'src/components/write-comment'
import {
  QUERIES_COMMENTS,
  QUERIES_FEED,
} from 'src/constants/query-keys/query-keys.constants'
import { getListComment } from 'src/service/feed/yours.service'
import { Comment } from './comment'

interface ListCommentType {
  postId?: string
  typeOfPost?: string
}

export const ListComment = ({ postId, typeOfPost }: ListCommentType) => {
  const [limit, setLimit] = useState<number>(10)
  const [startAfter, setStartAfter] = useState<number>(null)
  const { ref, inView } = useInView()

  useEffect(() => {
    if (inView) {
      fetchNextPage()
    }
  }, [inView])

  const {
    isLoading: loadingComment,
    data,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery(
    [QUERIES_COMMENTS.COMMENT],
    async ({ pageParam = startAfter }) => {
      const res = await getListComment({
        limit: limit,
        postId: postId,
        typeOfPost: typeOfPost,
        startAfter: pageParam,
      })

      return res?.data
    },
    {
      getNextPageParam: (lastPage, page) => {
        if (
          lastPage.data.length < lastPage.countComments &&
          lastPage.data.length === 10
        ) {
          return lastPage.data[lastPage.data.length - 1].createdAt
        } else {
          return undefined
        }
      },
    }
  )

  return (
    <div className="w-full pl-[32px] pt-[12px]">
      <Loading isLoading={loadingComment}>
        <Fragment>
          {(data?.pages || []).map((page) => (
            <Fragment>
              {(page?.data || []).map((item) => (
                <Comment
                  comment={item && item}
                  postId={postId}
                  typeOfPost={typeOfPost}
                />
              ))}
            </Fragment>
          ))}
        </Fragment>
      </Loading>

      {isFetchingNextPage ? (
        <div className="w-full">
          <p
            className="flex justify-center py-2 font-semibold text-[16px] w-[36px] h-[36px] text-center mx-auto"
            ref={ref}
          >
            <MiniLoading color="#09E099" size={24} />
          </p>
        </div>
      ) : null}
    </div>
  )
}
