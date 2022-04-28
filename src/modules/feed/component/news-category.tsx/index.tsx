import { useRouter } from 'next/router'
import { Fragment, useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { useInfiniteQuery } from 'react-query'
import { CardNews, Loading } from 'src/components'
import { ListItemSlick } from 'src/components/list-item-slick'
import { MiniLoading } from 'src/components/mini-loading'
import { ButtonAddFeed } from 'src/components/button-add-popup/button-add-feed'
import { DESC } from 'src/constants/constants'
import { QUERIES_FEED } from 'src/constants/query-keys/query-keys.constants'
import { NewsType } from 'src/constants/types'
import { getListNewPostOfProvider } from 'src/service/feed/news.service'

export const NewsCategory = () => {
  const [loading, setLoading] = useState<boolean>(true)
  const [limit, setLimit] = useState<number>(12)
  const [sorted, setSorted] = useState<string>(DESC)
  const [startAfter, setStartAfter] = useState<number>(1)
  const { ref, inView } = useInView()
  const router = useRouter()
  const { providerId, typeOfProvider } = router.query

  const {
    isLoading: loadingNews,
    data: dataNewsOfProvider,
    isFetchingNextPage,
    fetchNextPage,
  } = useInfiniteQuery(
    [QUERIES_FEED.FEED_NEW_POST_OF_PROVIDER],
    ({ pageParam = startAfter }) =>
      getListNewPostOfProvider({
        limit: limit,
        sorted: sorted,
        startAfter: pageParam,
        providerId: providerId as string,
        typeOfProvider: typeOfProvider as string,
      }),
    {
      getNextPageParam: (lastPage, page) => {
        if (lastPage.length === 12) {
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
    <div className="w-full mt-[24px] space-y-6">
      <Loading isLoading={loadingNews}>
        <div className="grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-10 pt-[12px]">
          {dataNewsOfProvider?.pages &&
            (dataNewsOfProvider?.pages || [])?.map((page, indexPage) => (
              <Fragment>
                {(page || []).map((item, index) => (
                  <div key={index} className="mb-[24px] md:mb-[0px]">
                    <CardNews card={item} />
                  </div>
                ))}
              </Fragment>
            ))}
          <p
            className="flex justify-center py-2 font-semibold text-[16px] h-[12px] text-center"
            ref={ref}
          >
            {isFetchingNextPage ? (
              <MiniLoading color="#09E099" size={24} />
            ) : null}
          </p>
        </div>
      </Loading>

      <ButtonAddFeed />
    </div>
  )
}
