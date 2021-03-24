import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { CreateTransactionDto } from 'src/transaction/dto/create.transaction.dto'
import { TransactionEntity } from 'src/transaction/entity/transaction.entity'
import { TransactionService } from 'src/transaction/transaction.service'
import { Repository } from 'typeorm'
import { AccountEntity } from './entity/account.entity'



@Injectable()
export class AccountService {
  constructor (
    @InjectRepository(AccountEntity) private accountRepository: Repository<AccountEntity>,
    private readonly transactionService: TransactionService
  ) {}

  async findOne (optitons?: any): Promise<any> {
    const account = await this.accountRepository.findOne(optitons)
    return { ...account }
  }

  async getAllTransactions () {
    const transactions: TransactionEntity = await this.transactionService.
  }

  async createTransaction (createTransactionDto: CreateTransactionDto) {
    const account = await this.accountRepository.findOne()
    createTransactionDto.account_id = account.account_id
    const transaction: TransactionEntity = await this.transactionService.createTransaction(createTransactionDto)

    return transaction
  }

}
