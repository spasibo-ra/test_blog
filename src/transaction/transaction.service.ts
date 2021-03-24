import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateTransactionDto } from './dto/create.transaction.dto'

import { TransactionEntity } from './entity/transaction.entity'

@Injectable()
export class TransactionService {
  constructor (
    @InjectRepository(TransactionEntity) private transactionRepository: Repository<TransactionEntity>
  ) {}

  async createTransaction (createTransactionDto: CreateTransactionDto) {
    const transaction: TransactionEntity = await this.transactionRepository.create(createTransactionDto)
    await this.transactionRepository.save(transaction)
    return transaction
  }

  async findAll () {
    
  }
}
