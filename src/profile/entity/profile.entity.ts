import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToOne,
  UpdateDateColumn
} from 'typeorm'
import { UserEntity } from 'src/user/entity/user.entity'

@Entity('profile')
export class ProfileEntity {
  @PrimaryGeneratedColumn() profile_id: number
  @Column({ type: 'varchar', nullable: true, default: '' }) firstName: string
  @Column({ type: 'varchar', nullable: true, default: '' }) lastName: string
  @Column({ type: 'varchar', nullable: true, default: '' }) bio: string
  @Column({ type: 'varchar', nullable: true, default: '' }) avatar: string
  @CreateDateColumn() createdOn?: Date
  @UpdateDateColumn() updatedOn?: Date
  @OneToOne(type => UserEntity, user => user.profile)
  user: UserEntity

}