import { ProfileDto, UserDto } from '../user/dto'
import { UserEntity } from '../user/entity/user.entity'
import { ProfileEntity } from '../user/entity/profile.entity'


export const toUserDto = (data: UserEntity): UserDto => {
  const { id, username, email, profile } = data
  const  { bio, avatar } = profile
  let userDto: UserDto = {
    id, username, email, bio, avatar
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