import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { UserEntity } from './entity/user.entity'
import { ProfileEntity } from './entity/profile.entity'
import { UserCreateDto, UserDto, LoginUserDto, ProfileDto } from './dto'
import { comparePassword } from '../shared/utils'
import { toProfileDto, toUserDto } from '../shared/mapper'

@Injectable()
export class UserService {

  constructor (
    @InjectRepository(UserEntity) private userRepository: Repository<UserEntity>,
    @InjectRepository(ProfileEntity) private profileRepository: Repository<ProfileEntity>
    ) {}

  async findOne(options?: object): Promise<UserDto> {
    const user = await this.userRepository.findOne(options)
    return toUserDto(user)
  }

  async findByLogin ({ username, password }: LoginUserDto): Promise<UserDto> {

    const user = await this.userRepository.findOne({ where: { username } })
    if (!user) {
      throw new HttpException('User not found', HttpStatus.UNAUTHORIZED)
    }
    const areEqual = await comparePassword(user.password, password)
    if (!areEqual) {
      throw new HttpException('Invalid Credential', HttpStatus.UNAUTHORIZED)
    }
    return toUserDto(user)

  }

  async findByPayload ({ username }: any): Promise<UserDto> {
    return await this.userRepository.findOne({ where: { username } })
  }

  async findByUsername ({ username }: UserDto): Promise<UserDto>{
    const user = await this.userRepository.findOne({ username })
    return toUserDto(user)
  }

  async create (userDto: UserCreateDto): Promise<UserDto> {
    const { username, email, password, profile_id, bio, avatar } = userDto
    const userInDB = await this.userRepository.findOne( { where: { username } })
    if (userInDB) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST)
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

  async update () {

  }

}
