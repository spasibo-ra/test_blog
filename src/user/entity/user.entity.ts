import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  BeforeInsert,
  BaseEntity,
  OneToOne,
  JoinColumn
} from 'typeorm'
import * as bcrypt from 'bcryptjs'

import { ProfileEntity } from './profile.entity'

@Entity('users')
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid') id: string
  @Column({ type: 'varchar', nullable: false, unique: true }) username: string
  @Column({ type: 'varchar', nullable: false }) password: string
  @Column({ type: 'varchar', nullable: false }) email: string
  @CreateDateColumn() createdOn?: Date
  @CreateDateColumn() updatedOn?: Date
  @OneToOne(() => ProfileEntity, profile => profile.user)
  @JoinColumn() profile: ProfileEntity


  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10)
  }

}