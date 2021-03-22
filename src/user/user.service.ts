import { Injectable, NotFoundException, UnauthorizedException, BadRequestException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { UserEntity } from './entity/user.entity'
import { ProfileEntity } from './entity/profile.entity'
import { CreateUserDto, UserDto, LoginUserDto } from './dto'
import { comparePassword } from '../shared/utils'
import { toUserDto } from '../shared/mapper'
import { UpdateProfileDto } from './dto/profile.update.dto'

@Injectable()
export class UserService {

  constructor (
    @InjectRepository(UserEntity) private userRepository: Repository<UserEntity>,
    @InjectRepository(ProfileEntity) private profileRepository: Repository<ProfileEntity>
    ) {}

  async findOne(optitons?: any): Promise<UserDto> {
    const user = await this.userRepository.findOne(optitons, {relations: ['profile']})
    return toUserDto(user)
  }

  async findByLogin ({ username, password }: LoginUserDto): Promise<UserDto> {
    const user = await this.userRepository.findOne({ where: { username } })
    if (!user) {
      throw new NotFoundException('User not found')
    }
    const areEqual = await comparePassword(user.password, password)
    if (!areEqual) {
      throw new UnauthorizedException('Invalid Credential')
    }
    return toUserDto(user)
  }

  async findByPayload ({ username }: any): Promise<UserDto> {
    return await this.userRepository.findOne({ where: { username } })
  }

  async create (createUserDto: CreateUserDto): Promise<UserDto> {
    const { username, email, password, bio, avatar } = createUserDto
    const userInDB = await this.userRepository.findOne( { where: { username } })
    if (userInDB) {
      throw new BadRequestException('User already exists')
    }

    const profile: ProfileEntity = this.profileRepository.create({
      bio,
      avatar
    })
    await this.profileRepository.save(profile)

    const user: UserEntity = this.userRepository.create({
      username,
      email,
      password,
      profile: {
        profile_id: profile.profile_id
      }
    })
    await this.userRepository.save(user)

    return toUserDto(user)
  }



  async update (uId: any, data: UpdateProfileDto) {
    await this.
  }

}
