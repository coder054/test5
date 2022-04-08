import { axios } from 'src/utils/axios'
import { getErrorMessage } from 'src/utils/utils'

export const checkNotification = async (notificationId) => {
  try {
    const data = await axios.patch(
      `/notifications/${notificationId}/check-notification`
    )

    return {
      error: null,
      data,
    }
  } catch (error) {
    return {
      error: getErrorMessage(error),
      data: null,
    }
  }
}
