import { debounce } from 'lodash'
import React, { Fragment, useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { useInfiniteQuery } from 'react-query'
import { FilterIcon, PeriodFilterIcon, XIcon } from 'src/components/icons'
import { MiniLoading } from 'src/components/mini-loading'
import { ModalMui } from 'src/components/ModalMui'
import SearchField from 'src/components/search-field/SearchField'
import { API_GET_LIST_CONTACT } from 'src/constants/api.constants'
import {
  ContactsTabType,
  QueriesContactsType,
} from 'src/constants/types/contacts.types'
import { axios } from 'src/utils/axios'
import { toQueryString } from 'src/utils/common.utils'
import { Counter } from '../Counter'
import SkeletonContact from '../card-template/SkeletonContact'
import { Sort } from '../Sort'
import { FilterTeam } from '../../team/components/Filter'
import { MemberCard } from '../../team/components/MemberCard'
import { AllMemberCard } from '../cards/AllMemberCard'

type FetchingTemplateProps = {
  tab: ContactsTabType
  queryKey: string
  countLabel: string
  searchLabel: string
  filterLabel: string
}

export default function FetchingContactAll({
  tab,
  queryKey,
  countLabel,
  searchLabel,
  filterLabel,
}: FetchingTemplateProps) {
  const [count, setCount] = useState<number>(0)
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false)
  const [queries, setQueries] = useState<QueriesContactsType>({
    limit: 10,
    sorted: 'asc',
    startAfter: '',
    tab: tab,
    country: '',
    clubId: '',
    teamId: '',
    role: '',
    search: '',
  })

  const { ref, inView } = useInView()
  const { data, isFetching, isFetchingNextPage, fetchNextPage } =
    useInfiniteQuery(
      [queryKey, queries],
      async ({ pageParam = '' }) => {
        const res = await axios.get(
          toQueryString(API_GET_LIST_CONTACT, {
            ...queries,
            startAfter: pageParam,
          })
        )
        return res.data
      },
      {
        getNextPageParam: (lastPage, page) => {
          if (
            page.length < Math.ceil(lastPage.count / 10) &&
            lastPage.data.length !== 0
          ) {
            return lastPage.data[lastPage.data.length - 1].firstName
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
      <ModalMui
        sx={{ padding: 3 }}
        isOpen={isOpenModal}
        onClose={setIsOpenModal}
      >
        <div className="flex flex-col items-center space-y-4 p-2 relative">
          <button
            type="button"
            onClick={() => setIsOpenModal(false)}
            className="absolute right-0 top-0"
          >
            <XIcon />
          </button>
          <span>
            <PeriodFilterIcon />
          </span>
          <p className="text-[25px] font-normal">{filterLabel}</p>
          <FilterTeam
            tab={tab}
            onChange={(value) => {
              setIsOpenModal(false)
              setQueries((prev) => ({
                ...prev,
                ...value,
                clubId: value.clubId,
                country: value.countryName,
              }))
            }}
          />
        </div>
      </ModalMui>
      <div className="flex justify-end">
        <div className="w-1/3">
          <SearchField
            label={searchLabel}
            isLoading={isFetching}
            onChange={(value) => handleChangeQueries('search', value)}
          />
        </div>
      </div>
      <div className="flex items-center justify-between mt-3 mb-2">
        <Counter label={countLabel} count={count} withPlace={queries.country} />
        <div className="flex space-x-4">
          <Sort
            value={queries.sorted}
            onChange={(value: string) => handleChangeQueries('sorted', value)}
          />
          <button type="button" onClick={() => setIsOpenModal(true)}>
            <FilterIcon />
          </button>
        </div>
      </div>
      <div className="pr-4 h-[calc(100vh-230px)] overflow-y-auto">
        {isFetching && !data ? (
          <SkeletonContact />
        ) : (
          <Fragment>
            {(data?.pages || []).map((page, index) => (
              <Fragment key={index}>
                {page.data.map((item: any, index: number) => (
                  <AllMemberCard key={index} member={item} />
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
