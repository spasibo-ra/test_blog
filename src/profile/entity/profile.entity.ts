import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, BeforeInsert, BaseEntity, OneToOne, AfterInsert, AfterUpdate } from 'typeorm'
import { UserEntity } from 'src/user/entity/user.entity'

@Entity('profile')
export class ProfileEntity {
  @PrimaryGeneratedColumn() profile_id: number
  @Column({ type: 'varchar', nullable: true, default: '' }) bio: string
  @Column({ type: 'varchar', nullable: true, default: '' }) avatar: string
  @OneToOne(type => UserEntity, user => user.profile)
  user: UserEntity




  @AfterUpdate()
  update () {
    this.user.updatedOn = new Date()
  }

}