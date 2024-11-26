/* eslint-disable @typescript-eslint/naming-convention */

import User from '#models/user'

interface IUser {
  fullName: string
  email: string
  password: string
}

export class UserService {
  async create(data: IUser) {
    const newUser = await User.create(data)

    if (newUser.$isPersisted) return newUser
    else throw new Error('Internal server error.')
  }

  async verifyUser(email: string, password: string) {
    try {
      const user = await User.verifyCredentials(email, password)
      return user
    } catch (error) {
      throw error
    }
  }
}
