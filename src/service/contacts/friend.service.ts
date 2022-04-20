import { axios } from 'src/utils/axios'
import { toQueryString } from 'src/utils/common.utils'

export const unblockFriend = async ({ userIds }: { userIds: string[] }) => {
  return await axios.post(`friends/unblock-friends`, { userIds })
}

export const removeRelationship = async ({
  userId,
  type,
}: {
  userId: string
  type: 'follows' | 'friends' | 'fans'
}) => {
  return await axios.delete(
    toQueryString(`friends/${userId}/remove-relationship`, {
      type,
    })
  )
}
