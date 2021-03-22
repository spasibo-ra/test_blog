import { Injectable, NotFoundException, UnauthorizedException, BadRequestException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { UserEntity } from './entity/user.entity'
import { ProfileEntity } from '../profile/entity/profile.entity'

import { CreateUserDto, UserDto, LoginUserDto } from './dto'
import { UpdateProfileDto } from '../profile/dto/profile.update.dto'

import { comparePassword } from '../shared/utils'
import { toProfileDto, toUserDto } from '../shared/mapper'
import { ProfileDto } from 'src/profile/dto/profile.dto'


@Injectable()
export class UserService {

  constructor (
    @InjectRepository(UserEntity) private userRepository: Repository<UserEntity>,
    @InjectRepository(ProfileEntity) private profileRepository: Repository<ProfileEntity>
    ) {}

  async findOne(optitons?: any): Promise<UserDto> {
    const user = await this.userRepository.findOne(optitons)
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

  async findProfile(id: string): Promise<ProfileDto> {
    const [{ profile }] = await this.userRepository.find({ where: { id }, relations:['profile'] })
    return toProfileDto(profile)
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

}
