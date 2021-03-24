import { Body, Controller, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'

import { AccountService } from 'src/account/account.service'
import { CreateTransactionDto } from 'src/transaction/dto/create.transaction.dto'
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

  @Get('/all')
  @UseGuards(AuthGuard())
  async findTransactionById ( ) {
    return await this.accountService.getAllTransactions()
  }

  @Post('create-transaction')
  @UseGuards(AuthGuard())
  async createTransaction (@Body() createTransactionDto: CreateTransactionDto) {
    const transaction = await this.accountService.createTransaction(createTransactionDto)
    return transaction
  }


}
