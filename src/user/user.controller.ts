import { Body, Controller, Get, Param, Put, Req, UseGuards, ValidationPipe, NotFoundException } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { ApiBearerAuth, ApiParam,  } from '@nestjs/swagger'
import { JwtPayload } from 'src/auth/interfaces/auth.interface'

import { User } from '../auth/user.decorator'
import { UserDto } from './dto'
import { UpdateProfileDto } from './dto/profile.update.dto'
import { UserService } from './user.service'

@ApiBearerAuth('JWT-auth')
@Controller('user')
export class UserController {
  constructor(
    private userService: UserService
    ) {}

  @Get()
  @UseGuards(AuthGuard())
  async findCurrentUser(@Req() req: any) {
    return this.userService.findOne(req.user.id)
  }

  @Put()
  @UseGuards(AuthGuard())
  async update (
    @Req() req: any,
    @Body(new ValidationPipe({ transform: true, whitelist: true })) data: UpdateProfileDto
    ) {
      return await this.userService.update(req.user.id, data)
  }

  // @Get('/:username')
  // @UseGuards(AuthGuard())
  // async findOne (@Param('username') username: string) {
  //   const user = await this.userService.findOne(username)
  //   if (!user) {
  //     throw new NotFoundException(`Can't found user: ${username}`)
  //   }
  //   return { user }
  // }



  // @Put()
  // @UseGuards(AuthGuard())
  // async update(
  //   @User() { username }: UserEntity,
  //   @Body(new ValidationPipe({ transform: true, whitelist: true }))
  //   data:  UpdateUserDTO) {
  //     return await this.userService.updateUser(username, data)
  // }
}
