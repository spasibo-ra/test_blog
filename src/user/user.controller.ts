import {
  Body,
  Controller,
  Get,
  Param,
  Put,
  Req,
  UseGuards,
  ValidationPipe,
  NotFoundException
} from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'

import { UpdateProfileDto } from '../profile/dto/profile.update.dto'
import { UserService } from './user.service'

@ApiBearerAuth('JWT-auth')
@ApiTags('user')
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
