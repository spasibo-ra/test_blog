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
import * as bcrypt from 'bcryptjs'

import { ProfileEntity } from 'src/profile/entity/profile.entity'

@Entity('users')
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid') id: string
  @Column({ type: 'varchar', nullable: false, unique: true }) username: string
  @Column({ type: 'varchar', nullable: false }) password: string
  @Column({ type: 'varchar', nullable: false }) email: string
  @CreateDateColumn() createdOn?: Date
  @UpdateDateColumn() updatedOn?: Date
  @OneToOne(type => ProfileEntity, profile => profile.user)
  @JoinColumn() profile: ProfileEntity


  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10)
  }

}