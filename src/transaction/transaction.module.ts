import { Module, forwardRef } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { TransactionService } from './transaction.service'
import { TransactionController } from './transaction.controller'

import { AuthModule } from 'src/auth/auth.module'

import { AccountEntity } from 'src/account/entity/account.entity'
import { TransactionEntity } from './entity/transaction.entity'

@Module({
  imports: [
    forwardRef(() => AuthModule),
    TypeOrmModule.forFeature([AccountEntity, TransactionEntity])
  ],
  providers: [TransactionService],
  controllers: [TransactionController],
  exports: [TransactionService]
})
export class TransactionModule {}
