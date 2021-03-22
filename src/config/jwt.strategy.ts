import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'

import { JwtPayload } from '../auth/interfaces/auth.interface'
import { AuthService } from '../auth/auth.service'
import { UserDto } from '../user/dto'


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

  constructor (
    private readonly authService: AuthService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
    })
  }

  async validate( payload: JwtPayload ): Promise<UserDto> {
    const user = await this.authService.validateUser(payload)
    if (!user) {
      throw new UnauthorizedException('Invalid Token')
    }
    return user
  }

}