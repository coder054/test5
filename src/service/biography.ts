import { UpdateSkills } from 'src/constants/types'
import { axios } from 'src/utils/axios'

export const getPlayerRadar = async (currentRoleId: string) => {
  const response = await axios.get(
    `/biographies/player?userIdQuery=${currentRoleId}`
  )
  console.log('response', response)
}

export const coachUpdatePlayerSkills = async (
  playerId: string,
  updateSkills: UpdateSkills,
  roleId: string
) => {
  const response = await axios.patch(
    `/users/${playerId}/coach-update-player-skills`,
    updateSkills,
    {
      headers: {
        roleId: roleId,
      },
    }
  )

  return response
}
