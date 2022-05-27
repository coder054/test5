import { Fragment, useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { useInfiniteQuery } from 'react-query'
import { CardNews, Loading } from 'src/components'
import { ListItemSlick } from 'src/components/list-item-slick'
import { MiniLoading } from 'src/components/mini-loading'
import { API_GET_LIST_NEWS_POST } from 'src/constants/api.constants'
import { ASC, DESC } from 'src/constants/constants'
import { QUERIES_FEED } from 'src/constants/query-keys/query-keys.constants'
import { NewsType } from 'src/constants/types'
import { axios } from 'src/utils/axios'
import { toQueryString } from 'src/utils/common.utils'

export const TabNews = () => {
  const [limit, setLimit] = useState<number>(50)
  const [sorted, setSorted] = useState<string>(DESC)
  const [startAfter, setStartAfter] = useState<number>(1)
  const { ref, inView } = useInView()

  const {
    isLoading: loadingNews,
    data: dataNews,
    isFetchingNextPage,
    fetchNextPage,
  } = useInfiniteQuery(
    [QUERIES_FEED.FEED_NEW_POST],
    async ({ pageParam = startAfter }) => {
      const res = await axios.get(
        toQueryString(API_GET_LIST_NEWS_POST, {
          limit: limit,
          sorted: sorted,
          startAfter: pageParam,
        })
      )

      return res.data
    },
    {
      getNextPageParam: (lastPage, page) => {
        if (lastPage.length === 50 || lastPage.length === 51) {
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
        <ListItemSlick />
        <div className="md:grid md:grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-10 pt-[12px]">
          {dataNews?.pages &&
            (dataNews?.pages || [])?.map((page, indexPage) => (
              <Fragment>
                {(page || []).map((item, index) => (
                  <div key={index} className="mb-[24px] md:mb-[0px]">
                    <CardNews card={item} />
                  </div>
                ))}
              </Fragment>
            ))}
        </div>
        <p
          className="flex justify-center py-2 font-semibold text-[16px] h-[12px] text-center mt-[12px]"
          ref={ref}
        >
          {isFetchingNextPage ? (
            <MiniLoading color="#09E099" size={24} />
          ) : null}
        </p>
      </>
    </Loading>
  )
}
