import { Module, forwardRef } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { UserEntity } from './entity/user.entity'
import { ProfileEntity } from '../profile/entity/profile.entity'
import { UserController } from './user.controller'
import { UserService } from './user.service'

import { AuthModule } from 'src/auth/auth.module'


@Module({
  imports: [
    forwardRef(() => AuthModule),
    TypeOrmModule.forFeature([UserEntity, ProfileEntity])
  ],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService]
})
export class UserModule {}
