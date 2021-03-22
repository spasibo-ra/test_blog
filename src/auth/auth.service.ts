import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

import { JwtPayload, LoginStatus, RegistrationStatus } from './interfaces/auth.interface'
import { UserDto, LoginUserDto, UserCreateDto, ProfileDto } from '../user/dto'
import { UserService } from 'src/user/user.service';


@Injectable()
export class AuthService {

  constructor(
    private jwtService: JwtService,
    private readonly userService: UserService
  ) {}

    private _createToken ({ username }: UserDto) {
      const expiresIn = 3600
      const user: JwtPayload = { username }
      const accessToken = this.jwtService.sign(user)
      return {
        expiresIn,
        accessToken
      }
    }

    async register (userDto: UserCreateDto): Promise<RegistrationStatus> {
      let status: RegistrationStatus = {
        success: true,
        message: 'User are Registered'
      }
      try {
        await this.userService.create(userDto)
      } catch (err) {
        status = {
          success: false,
          message: err
        }
      }
      return status
    }

    async login (loginUserDto: LoginUserDto): Promise<LoginStatus> {
      const user = await this.userService.findByLogin(loginUserDto)
      const token = this._createToken(user)
      return {
        username: user.username,
        ...token
      }
    }

    async validateUser (payload: JwtPayload) {
      const user = await this.userService.findByPayload(payload)
      if (!user) {
        throw new UnauthorizedException('Invalid Token')
      }
      return user
    }
}
