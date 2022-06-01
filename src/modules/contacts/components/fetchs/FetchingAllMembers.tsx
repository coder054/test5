import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import { ClickAwayListener, InputAdornment } from '@mui/material'
import clsx from 'clsx'
import { debounce } from 'lodash'
import { ChangeEvent, Fragment, useEffect, useMemo, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { useInfiniteQuery } from 'react-query'
import { MiniLoading } from 'src/components/mini-loading'
import { MyInput } from 'src/components/MyInput'
import { API_GET_LIST_CONTACT } from 'src/constants/api.constants'
import { QUERIES_CONTACTS } from 'src/constants/query-keys/query-keys.constants'
import { QueriesContactsType } from 'src/constants/types/contacts.types'
import { MemberType } from 'src/constants/types/member.types'
import { axios } from 'src/utils/axios'
import { toQueryString } from 'src/utils/common.utils'
import { Counter } from '../Counter'
import MemberCard from '../cards/MemberCard'
import MemberChip from '../MemberChip'

type FetchingAllMembers = {
  onChange: (value: string[]) => void
  isFriend?: boolean
}

export const FetchingAllMembers = ({
  isFriend,
  onChange,
}: FetchingAllMembers) => {
  const [selectedMembers, setSelectedMembers] = useState<MemberType[]>([])
  const [isOpenOption, setIsOpenOption] = useState<boolean>(false)
  const [count, setCount] = useState<number>(0)
  const [queries, setQueries] = useState<QueriesContactsType>(
    isFriend
      ? {
          limit: 10,
          sorted: 'asc',
          startAfter: 1,
          tab: 'FRIENDS',
          search: '',
        }
      : {
          limit: 10,
          sorted: 'asc',
          startAfter: 1,
          tab: 'ALL',
          role: 'PLAYER',
          search: '',
        }
  )

  const SELECTED_LIST = useMemo(() => {
    return (selectedMembers || []).map((it) => it.userId)
  }, [JSON.stringify(selectedMembers)])

  const { ref, inView } = useInView()
  const { data, isFetching, isFetchingNextPage, fetchNextPage } =
    useInfiniteQuery(
      [QUERIES_CONTACTS.CONTACT_SEARCH_MEMBER, queries],
      async ({ pageParam = isFriend ? queries.startAfter : '' }) => {
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

  const handleSelectMember = (member: MemberType) => {
    if (SELECTED_LIST.includes(member.userId)) {
      setSelectedMembers((prev) =>
        [...prev].filter((it) => it.userId !== member.userId)
      )
    } else {
      setSelectedMembers((prev) => [...prev].concat(member))
    }
  }

  const handleChange = debounce(
    (type: keyof QueriesContactsType, value: string) => {
      setQueries((prev) => ({ ...prev, [type]: value }))
    },
    500
  )

  useEffect(() => {
    onChange && onChange(SELECTED_LIST)
  }, [SELECTED_LIST])

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
      {selectedMembers.length > 0 && (
        <div className="w-full flex flex-wrap">
          {selectedMembers.map((member: MemberType) => (
            <MemberChip
              onRemove={handleSelectMember}
              isMini={selectedMembers.length > 3}
              member={member}
              key={member.userId}
            />
          ))}
        </div>
      )}
      <ClickAwayListener onClickAway={() => setIsOpenOption(false)}>
        <div className="relative w-full">
          <MyInput
            label="Add new members"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleChange('search', e.target.value)
            }
            onClick={() => setIsOpenOption(true)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <span className={clsx(isOpenOption && 'rotate-180')}>
                    <ArrowDropDownIcon />
                  </span>
                </InputAdornment>
              ),
            }}
          />
          <div
            className={clsx(
              'absolute w-full z-50 bg-[#13161A] py-2',
              !isOpenOption && 'hidden'
            )}
          >
            <Counter
              className="px-3"
              count={count}
              label="member"
              isLoading={isFetching}
            />
            <div className="max-h-72 overflow-y-auto">
              <Fragment>
                {(data?.pages || []).map((page, index) => (
                  <Fragment key={index}>
                    {page.data.map((item: MemberType, index: number) => (
                      <MemberCard
                        selected={SELECTED_LIST}
                        onChange={handleSelectMember}
                        key={index}
                        member={item}
                      />
                    ))}
                  </Fragment>
                ))}
                <p className="flex justify-center py-2" ref={ref}>
                  {isFetchingNextPage && (
                    <MiniLoading color="#09E099" size={18} />
                  )}
                </p>
              </Fragment>
            </div>
          </div>
        </div>
      </ClickAwayListener>
    </Fragment>
  )
}
