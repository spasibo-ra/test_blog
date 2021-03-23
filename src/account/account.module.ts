import { Module, forwardRef } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthModule } from 'src/auth/auth.module'

import { AccountService } from './account.service'
import { AccountController } from './account.controller'

import { UserEntity } from 'src/user/entity/user.entity'
import { UserService } from 'src/user/user.service'
import { AccountEntity } from './entity/account.entity'
import { ProfileEntity } from 'src/profile/entity/profile.entity'

@Module({
  imports: [
    forwardRef(() => AuthModule),
    TypeOrmModule.forFeature([UserEntity, AccountEntity, ProfileEntity])
  ],
  providers: [AccountService, UserService],
  controllers: [AccountController]
})
export class AccountModule {}
