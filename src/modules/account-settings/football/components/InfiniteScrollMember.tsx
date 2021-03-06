import { CircularProgress, MenuItem } from '@mui/material'
import _ from 'lodash'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useQuery } from 'react-query'
import { MyInput } from 'src/components'
import { MemberType } from 'src/constants/types/member.types'
import { fetchMember } from 'src/service/diary-update'

type InfiniteScrollMemberProps = {
  label: string
  value?: MemberType
  teamId?: string
  onChange?: (value: MemberType) => void
  playerOnly?: boolean
}

export const InfiniteScrollMember = ({
  value,
  label,
  teamId,
  onChange,
  playerOnly,
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
      return `${value?.shirtNumber ? value?.shirtNumber : ''}
    ${value?.shirtNumber ? '.' : ''} ${value?.firstName} ${value?.lastName}`
    },
    [JSON.stringify(value)]
  )

  const RESPONSE = useMemo(() => {
    if (playerOnly) {
      return members?.filter((member: MemberType) => member.type !== 'COACH')
    }
    return members
  }, [JSON.stringify(members)])

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
    <MyInput
      select
      value={_.isEmpty(member) ? '' : renderInfo(member)}
      label={label}
    >
      {(RESPONSE || [])?.map((it: MemberType, index: number) => (
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
  )
}
