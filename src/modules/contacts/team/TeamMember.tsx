import { useAtom } from 'jotai'
import { debounce } from 'lodash'
import { useRouter } from 'next/router'
import React, { Fragment, useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { useInfiniteQuery } from 'react-query'
import { QueryParamsAtom } from 'src/atoms/QueryParams'
import { MiniLoading } from 'src/components/mini-loading'
import {
  GroupTabType,
  QueriesContactMemberType,
  QueriesContactsType,
} from 'src/constants/types/contacts.types'
import { MemberType } from 'src/constants/types/member.types'
import { axios } from 'src/utils/axios'
import { toQueryString } from 'src/utils/common.utils'
import { Counter } from '../components/Counter'
import SkeletonContact from '../components/card-template/SkeletonContact'
import { Sort } from '../components/Sort'
import { MemberCard } from '../group/components/cards/MemberCard'

type FetchingTemplateProps = {
  tab: GroupTabType
  queryKey: string
  countLabel: string
  searchLabel?: string
  filterLabel?: string
  owner?: boolean
}

export default function TeamMember({
  tab,
  queryKey,
  countLabel,
  owner,
}: FetchingTemplateProps) {
  const router = useRouter()
  const { teamId } = router.query
  const [query] = useAtom(QueryParamsAtom)

  const [count, setCount] = useState<number>(0)
  const [queries, setQueries] = useState<QueriesContactMemberType>({
    groupId: undefined,
    limit: 10,
    startAfter: 1,
    sorted: 'asc',
    userIdQuery: undefined,
    tab: tab,
  })

  const { ref, inView } = useInView()
  const { data, isFetching, isFetchingNextPage, fetchNextPage } =
    useInfiniteQuery(
      [queryKey, queries],
      async ({ pageParam = 1 }) => {
        const res = await axios.get(
          toQueryString(`teams/${teamId}/get-members`, {
            ...queries,
            startAfter: pageParam,
          })
        )
        return res.data
      },
      {
        getNextPageParam: (lastPage, page) => {
          if (page.length < lastPage.totalPage) {
            return lastPage.nextPage
          } else {
            return undefined
          }
        },
      }
    )

  const handleChangeQueries = debounce(
    (type: keyof QueriesContactsType, value: string) => {
      setQueries((prev) => ({ ...prev, [type]: value }))
    },
    500
  )

  useEffect(() => {
    data && setCount(data.pages[0].count)
  }, [JSON.stringify(data)])

  useEffect(() => {
    if (inView) {
      fetchNextPage()
    }
  }, [inView])

  return (
    <Fragment>
      <div className="flex items-center justify-between mt-3 mb-2">
        <Counter label={countLabel} count={count} />
        <div className="flex space-x-4">
          <Sort
            value={queries.sorted}
            onChange={(value: string) => handleChangeQueries('sorted', value)}
          />
        </div>
      </div>
      <div className="pr-4 h-[calc(100vh-230px)] overflow-y-auto">
        {isFetching && !data ? (
          <SkeletonContact />
        ) : (
          <Fragment>
            {(data?.pages || []).map((page, index) => (
              <Fragment key={index}>
                {page.data.map((item: MemberType) => (
                  <MemberCard
                    key={item.userId}
                    member={item}
                    isBlocked={query === 'blocked'}
                    isBlockable={owner}
                    tab={tab}
                  />
                ))}
              </Fragment>
            ))}
            <p
              className="flex justify-center py-2 font-semibold text-[16px]"
              ref={ref}
            >
              {isFetchingNextPage && <MiniLoading color="#09E099" size={18} />}
            </p>
          </Fragment>
        )}
      </div>
    </Fragment>
  )
}
