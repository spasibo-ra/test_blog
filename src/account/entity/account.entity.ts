import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  BeforeInsert,
  BaseEntity,
  OneToOne,
  JoinColumn,
  UpdateDateColumn
} from 'typeorm'
import { UserEntity } from 'src/user/entity/user.entity'

@Entity('accounts')
export class AccountEntity extends BaseEntity {
  @PrimaryGeneratedColumn() account_id: number
  @Column({ type: 'int', nullable: true, default: null}) totalAmount: number

  // One to Many transactions []

  @OneToOne(type => UserEntity, user => user.account)
  user: UserEntity

}