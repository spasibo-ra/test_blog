import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { AccountEntity } from './entity/account.entity'


@Injectable()
export class AccountService {
  constructor (
    @InjectRepository(AccountEntity) private accountRepository: Repository<AccountEntity>
  ) {}

  async findOne(optitons?: any): Promise<any> {
    const account = await this.accountRepository.findOne(optitons)
    return { ...account }
  }

}
