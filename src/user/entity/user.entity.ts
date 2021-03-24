import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BeforeInsert,
  BaseEntity,
  OneToOne,
  JoinColumn,
} from 'typeorm'
import * as bcrypt from 'bcryptjs'

import { ProfileEntity } from 'src/profile/entity/profile.entity'
import { AccountEntity } from 'src/account/entity/account.entity'

@Entity('users')
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid') id: string
  @Column({ type: 'varchar', nullable: false, unique: true }) username: string
  @Column({ type: 'varchar', nullable: false }) password: string
  @Column({ type: 'varchar', nullable: false }) email: string

  @OneToOne(type => ProfileEntity, profile => profile.user)
  @JoinColumn({ name: 'profile_id'}) profile: ProfileEntity

  @OneToOne(type => AccountEntity, account => account.user)
  @JoinColumn({ name: 'account_id'}) account: AccountEntity



  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10)
  }

}