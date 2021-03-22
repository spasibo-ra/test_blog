import * as bcrypt from 'bcryptjs'

export const comparePassword = async (userPassword, currentPassword) => {
  return await bcrypt.compare(currentPassword, userPassword)
}