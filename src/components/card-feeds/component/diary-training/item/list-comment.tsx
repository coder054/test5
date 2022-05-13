import { useState } from 'react'
import { useQuery } from 'react-query'
import {
  QUERIES_COMMENTS,
  QUERIES_FEED,
} from 'src/constants/query-keys/query-keys.constants'
import { getListComment } from 'src/service/feed/yours.service'

interface ListCommentType {
  postId?: string
  typeOfPost?: string
}

export const ListComment = ({ postId, typeOfPost }: ListCommentType) => {
  const [limit, setLimit] = useState<number>(10)
  // console.log('postId, typeOfPost', postId, typeOfPost)

  const { isLoading: loadingComment, data } = useQuery([QUERIES_COMMENTS], () =>
    getListComment({ limit, postId, typeOfPost })
  )

  // console.log('data', data)

  return <div></div>
}
