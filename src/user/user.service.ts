import { Injectable, NotFoundException, UnauthorizedException, BadRequestException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { UserEntity } from './entity/user.entity'
import { ProfileEntity } from '../profile/entity/profile.entity'
import { AccountEntity } from '../account/entity/account.entity'

import { CreateUserDto, UserDto, LoginUserDto } from './dto'

import { comparePassword } from '../shared/utils'
import { toUserDto } from '../shared/mapper'


@Injectable()
export class UserService {

  constructor (
    @InjectRepository(UserEntity) private userRepository: Repository<UserEntity>,
    @InjectRepository(ProfileEntity) private profileRepository: Repository<ProfileEntity>,
    @InjectRepository(AccountEntity) private accountRepository: Repository<AccountEntity>
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

  async findProfileId(id: string): Promise<number> {
    const [{ profile }] = await this.userRepository.find({ where: { id }, relations:['profile'] })
    return profile.profile_id
  }

  async create (createUserDto: CreateUserDto): Promise<UserDto> {
    const { username, email, password } = createUserDto
    const userInDB = await this.userRepository.findOne( { where: { username } })
    if (userInDB) {
      throw new BadRequestException('User already exists')
    }
    const account: AccountEntity = new AccountEntity()
    await this.accountRepository.save(account)
    const profile: ProfileEntity = new ProfileEntity()
    await this.profileRepository.save(profile)

    const user: UserEntity = this.userRepository.create({
      username,
      email,
      password,
      profile: {
        profile_id: profile.profile_id
      },
      account: {
        account_id: account.account_id
      }
    })
    await this.userRepository.save(user)

    return toUserDto(user)
  }

}
