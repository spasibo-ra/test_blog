import { ProfileDto, UserDto } from '../user/dto'
import { UserEntity } from '../user/entity/user.entity'
import { ProfileEntity } from '../user/entity/profile.entity'


export const toUserDto = (data: UserEntity): UserDto => {
  const { id, username, email } = data
  let userDto: UserDto = {
    id, username, email
  }
  return userDto
}

export const toProfileDto =  (data: ProfileEntity) => {
  const { profile_id, bio, avatar } = data
  let profileDto: ProfileDto = {
    profile_id, bio, avatar
  }
  return profileDto
}