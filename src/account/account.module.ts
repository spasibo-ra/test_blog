import { Module, forwardRef } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthModule } from 'src/auth/auth.module'

import { AccountService } from './account.service'
import { AccountController } from './account.controller'

import { UserEntity } from 'src/user/entity/user.entity'
import { UserService } from 'src/user/user.service'
import { AccountEntity } from './entity/account.entity'
import { ProfileEntity } from 'src/profile/entity/profile.entity'
import { TransactionEntity } from 'src/transaction/entity/transaction.entity'
import { TransactionService } from 'src/transaction/transaction.service'

@Module({
  imports: [
    forwardRef(() => AuthModule),
    TypeOrmModule.forFeature([UserEntity, AccountEntity, ProfileEntity, TransactionEntity])
  ],
  providers: [AccountService, UserService, TransactionService],
  controllers: [AccountController]
})
export class AccountModule {}
