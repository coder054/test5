import queryString from 'query-string'
import { CircularProgress } from '@mui/material'
import { isEmpty } from 'lodash'
import React, { useEffect, useState } from 'react'
import { CardFeed } from 'src/components/card-feeds'
import { axios } from 'src/utils/axios'
import { getErrorMessage } from 'src/utils/utils'
import { useRouter } from 'next/router'
import { AuthGuard } from 'src/components/authentication/auth-guard'
import { DashboardLayout } from 'src/components/dashboard/dashboard-layout'
import { CardFeedType } from 'src/constants/types/feed/yours'

function PostDetail() {
  const router = useRouter()
  const { postId, typeOfPost } = router.query
  const [post, setPost] = useState<CardFeedType>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    ;(async function () {
      try {
        setLoading(true)
        const params = {
          postId,
          typeOfPost,
        }

        const { data } = await axios.get(
          `/feed/get-posts-detail?${queryString.stringify(params)}`
        )
        setPost(data)
      } catch (error) {
        alert(getErrorMessage(error))
      } finally {
        setLoading(false)
      }
    })()
  }, [])

  if (loading) {
    return (
      <div className="flex justify-center mt-[20px]  ">
        <CircularProgress />
      </div>
    )
  }

  if (isEmpty(post)) {
    return (
      <div className="flex justify-center mt-[20px]  ">Post not found.</div>
    )
  }

  return (
    <div className=" mt-[40px]  flex justify-center items-center ">
      <CardFeed card={post} />
    </div>
  )
}

PostDetail.getLayout = (page) => (
  <AuthGuard>
    <DashboardLayout>{page}</DashboardLayout>
  </AuthGuard>
)

export default PostDetail
