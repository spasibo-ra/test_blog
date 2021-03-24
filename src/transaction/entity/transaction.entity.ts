import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  BeforeInsert,
  BaseEntity,
  OneToOne,
  JoinColumn,
  UpdateDateColumn,
  ManyToOne
} from 'typeorm'
import { AccountEntity } from 'src/account/entity/account.entity'

@Entity('transactions')
export class TransactionEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid') t_id: string
  @ManyToOne(type => AccountEntity, account => account.account_id)
  @JoinColumn({ name: 'account_id'})
  account_id: AccountEntity

  @Column({ type: 'varchar', default: 'income'}) type: string

  @Column({ type: 'int'}) amount: number

  @CreateDateColumn() createdOn?: Date


}