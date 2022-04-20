import { axios } from 'src/utils/axios'

export const fetchSettings = async ({ roleName }: { roleName: string }) => {
  return await axios.get(`users/${roleName.toLocaleLowerCase()}-profile`)
}
