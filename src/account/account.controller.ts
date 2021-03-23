import { Body, Controller, Get, Put, Req, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'

import { AccountService } from 'src/account/account.service'
import { UserService } from 'src/user/user.service'

@ApiBearerAuth('JWT-auth')
@ApiTags('account')
@Controller('account')
export class AccountController {
  constructor (
    private readonly accountService: AccountService,
    // private readonly userService: UserService
  ) {}
  @Get()
  @UseGuards(AuthGuard())
  async findCurrentProfile (@Req() req: any) {
    return this.accountService.findOne(req.user.account_id)
  }

}
