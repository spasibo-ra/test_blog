import { Controller, Delete, Get, NotFoundException, Param, Post, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { User } from 'src/auth/user.decorator'

import { UserService } from './user.service'

@Controller('profiles')
export class ProfileController {
  constructor (
    private userService: UserService
    ) {}

  // @Get('/:username')
  // async findProfile(@Param('username') username: string) {
  //   const profile = await this.userService.findByUsername(username)
  //   if (!profile) {
  //     throw new NotFoundException()
  //   }
  //   return { profile }
  // }

  // @Post('/:username/follow')
  // @UseGuards(AuthGuard())
  // followUser (@User() user: UserEntity, @Param('username') username: string) {
  //   return this.userService.followUser(user, username)
  // }

  // @Delete('/:username/follow')
  // unFollowUser (@Param('username') username: string) {
  //   return this.userService.unFollowUser(username)
  // }
}
