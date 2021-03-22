import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, BeforeInsert, BaseEntity, OneToOne } from 'typeorm'
import { UserEntity } from './user.entity'

@Entity('profile')
export class ProfileEntity {
  @PrimaryGeneratedColumn() profile_id: number
  @Column({ type: 'varchar', nullable: true, default: '' }) bio: string
  @Column({ type: 'varchar', nullable: true, default: '' }) avatar: string
  @OneToOne(() => UserEntity, user => user.profile)
  user: UserEntity
}