import { Body, Controller, Post,  BadRequestException, UseGuards, Get, Res, Request } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

import { AuthService } from './auth.service'
import { LoginStatus, RegistrationStatus } from './interfaces/auth.interface'
import { LoginUserDto, CreateUserDto } from '../user/dto'

@ApiTags('auth')
@Controller('auth')
export class AuthController {

  constructor (
    private authService: AuthService
  ) {}

    @Post('register')
    public async register (@Body() createUserDto: CreateUserDto): Promise<RegistrationStatus> {
      const result: RegistrationStatus = await this.authService.register(createUserDto)
      if (!result.success) {
        throw new BadRequestException(result.message)
      }
      return result
    }

    @Post('login')
    public async login (@Body() loginUserDto: LoginUserDto): Promise<LoginStatus> {
      return await this.authService.login(loginUserDto)
    }

    // @Get('logout')
    // public logout (@Request() req) {
    //   req.logout()
    // }

}
