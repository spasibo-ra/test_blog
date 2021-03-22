import { UserDto } from '../user/dto'
import { ProfileDto} from '../profile/dto/profile.dto'
import { UserEntity } from '../user/entity/user.entity'
import { ProfileEntity } from '../profile/entity/profile.entity'


export const toUserDto = (data: UserEntity): UserDto => {
  let userDto: UserDto = data
  return userDto
}

export const toProfileDto =  (data: ProfileEntity) => {
  delete data.profile_id
  let profileDto: ProfileDto = data
  return profileDto
}

export const toUpdateProfileDto =  (data: ProfileEntity) => {
  const { profile_id, bio, avatar } = data
  let profileDto: ProfileDto = data
  return profileDto
}


