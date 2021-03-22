import { Module, forwardRef } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { AuthModule } from 'src/auth/auth.module'

import { ProfileController } from './profile.controller'
import { ProfileService } from './profile.service'

import { ProfileEntity } from './entity/profile.entity'
import { UserService } from 'src/user/user.service'
import { UserEntity } from 'src/user/entity/user.entity'

@Module({
  imports: [
    forwardRef(() => AuthModule),
    TypeOrmModule.forFeature([ProfileEntity, UserEntity])
  ],
  controllers: [ProfileController],
  providers: [ProfileService, UserService]
})
export class ProfileModule {}
