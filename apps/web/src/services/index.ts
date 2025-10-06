import { database } from '@/lib/database'

export const getAllUsers = async () => {
  const users = await database.user.findMany({
    // select: {
    //   id: true,
    //   name: true,
    //   email: true,
    //   role: true
    // }
  })

  return users
}
