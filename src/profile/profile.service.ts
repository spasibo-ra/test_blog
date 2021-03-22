import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { toProfileDto } from 'src/shared/mapper'
import { ProfileDto } from './dto/profile.dto'
import { UpdateProfileDto } from './dto/profile.update.dto'

import { ProfileEntity } from './entity/profile.entity'

@Injectable()
export class ProfileService {
  constructor (
    @InjectRepository(ProfileEntity) private profileRepository: Repository<ProfileEntity>
  ) {}

  async findOne(optitons?: any): Promise<ProfileDto> {
    const prifile = await this.profileRepository.findOne(optitons)
    return toProfileDto(prifile)
  }

  async update (profile_id: number, updateProfileDto: UpdateProfileDto): Promise<ProfileDto> {
     await this.profileRepository.update({ profile_id }, updateProfileDto)
     return this.findOne(profile_id)
  }
}
