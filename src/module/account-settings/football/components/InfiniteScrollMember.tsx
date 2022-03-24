import { CircularProgress, MenuItem } from '@mui/material'
import _ from 'lodash'
import { useCallback, useEffect, useState } from 'react'
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'
import { MyInput } from 'src/components'
import { MemberType } from 'src/constants/types/member.typs'
import { fetchMember } from 'src/service/diary-update'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
})

type InfiniteScrollMemberProps = {
  label: string
  value?: MemberType
  teamId?: string
  onChange?: (value: MemberType) => void
}

export const InfiniteScrollMember = ({
  value,
  label,
  teamId,
  onChange,
}: InfiniteScrollMemberProps) => {
  const { isLoading, data: members } = useQuery(
    ['members', teamId],
    () => fetchMember(teamId),
    { enabled: !!teamId }
  )

  const [member, setMember] = useState<MemberType>(null)

  const handleChange = (value: MemberType) => {
    setMember(value), onChange && onChange(value)
  }

  const renderInfo = useCallback(
    (value: MemberType) => {
      return `${value.shirtNumber ? value.shirtNumber : ''}
    ${value.shirtNumber ? '.' : ''} ${value.firstName} ${value.lastName}`
    },
    [JSON.stringify(value)]
  )

  useEffect(() => {
    value && setMember(value)
  }, [JSON.stringify(value)])

  if (isLoading) {
    return (
      <MyInput select value={renderInfo(member)} label={label}>
        <MenuItem>
          <CircularProgress color="primary" />
        </MenuItem>
      </MyInput>
    )
  }

  return (
    <QueryClientProvider client={queryClient}>
      <MyInput
        select
        value={_.isEmpty(member) ? '' : renderInfo(member)}
        label={label}
      >
        {(members || [])?.map((it: MemberType, index: number) => (
          <MenuItem
            key={index}
            value={renderInfo(it)}
            onClick={() => handleChange(it)}
            className="flex space-x-3"
          >
            <p>{renderInfo(it)}</p>
          </MenuItem>
        ))}
      </MyInput>
    </QueryClientProvider>
  )
}