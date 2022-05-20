import { Fragment, useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { useInfiniteQuery } from 'react-query'
import { Loading } from 'src/components'
import { CardFeed } from 'src/components/card-feeds'
import { MiniLoading } from 'src/components/mini-loading'
import { DESC } from 'src/constants/constants'
import { QUERIES_FEED } from 'src/constants/query-keys/query-keys.constants'
import { getListPosts } from 'src/service/feed/yours.service'

export const TabAll = () => {
  const [limit, setLimit] = useState<number>(8)
  const [sorted, setSorted] = useState<string>(DESC)
  const [startAfter, setStartAfter] = useState<number>(1)
  const { ref, inView } = useInView()

  const {
    isLoading: loadingNews,
    data: dataNews,
    isFetchingNextPage,
    fetchNextPage,
  } = useInfiniteQuery(
    [QUERIES_FEED.FEED_NEW_POST_ALL],
    async ({ pageParam = startAfter }) => {
      const res = await getListPosts({
        limit: limit,
        startAfter: pageParam,
        sorted: sorted,
        feedTab: 'all',
      })

      // console.log('res.data', res.data)

      return res.data
    },
    {
      getNextPageParam: (lastPage, page) => {
        if (lastPage.length === 8 || lastPage.length === 9) {
          return page.length + 1
        } else {
          return undefined
        }
      },
    }
  )

  useEffect(() => {
    if (inView) {
      fetchNextPage()
    }
  }, [inView])

  return (
    <Loading isLoading={loadingNews}>
      <>
        <div className="grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-10 pt-[12px]">
          {dataNews?.pages &&
            (dataNews?.pages || [])?.map((page, indexPage) => (
              <Fragment>
                {(page || []).map((item, index) => (
                  <div key={index} className="mb-[24px] md:mb-[0px]">
                    <CardFeed card={item} />
                  </div>
                ))}
              </Fragment>
            ))}
        </div>
        <div className="w-full">
          <p
            className="flex justify-center py-2 font-semibold text-[16px] w-[36px] h-[36px] text-center mx-auto"
            ref={ref}
          >
            {isFetchingNextPage ? (
              <MiniLoading color="#09E099" size={24} />
            ) : null}
          </p>
        </div>
      </>
    </Loading>
  )
}
