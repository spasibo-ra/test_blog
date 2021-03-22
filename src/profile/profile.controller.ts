import { Body, Controller, Get, Put, Req, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'


import { UpdateProfileDto } from './dto/profile.update.dto'
import { ProfileService } from './profile.service'

import { User } from '../shared/decorators/user.decorator'
import { UserEntity } from 'src/user/entity/user.entity'
import { ProfileEntity } from './entity/profile.entity'
import { UserService } from 'src/user/user.service'

@ApiBearerAuth('JWT-auth')
@ApiTags('profile')
@Controller('profile')
export class ProfileController {
    constructor (
      private readonly profileService: ProfileService,
      private readonly userService: UserService
    ) {}

    @Get()
    @UseGuards(AuthGuard())
    async findCurrentProfile (@Req() req: any) {
      return this.profileService.findOne(req.user.profile_id)
    }

    @Put()
    @UseGuards(AuthGuard())
    async update (
      @User() { id }: UserEntity,
      @Body() data: UpdateProfileDto
      ) {
      const { profile_id } = await this.userService.findProfile(id)
      return await this.profileService.update(profile_id, data)
    }
}
