import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  BeforeInsert,
  BaseEntity,
  OneToOne,
  UpdateDateColumn,
  OneToMany,
  JoinTable,
  JoinColumn
} from 'typeorm'

import { UserEntity } from 'src/user/entity/user.entity'
import { TransactionEntity } from 'src/transaction/entity/transaction.entity'

@Entity('accounts')
export class AccountEntity extends BaseEntity {
  @PrimaryGeneratedColumn() account_id: number
  @Column({ type: 'int', nullable: true, default: null}) totalAmount: number

  // One to Many transactions []
  @OneToMany(type => TransactionEntity, transaction => transaction.t_id)
  @JoinColumn({ name: 'transactions'})
  transactions: TransactionEntity[]



  @OneToOne(type => UserEntity, user => user.account)
  user: UserEntity

}