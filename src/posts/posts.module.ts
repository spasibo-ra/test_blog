import { Module, forwardRef } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { PostsController } from './posts.controller'
import { PostsService } from './posts.service'
import { AuthModule } from 'src/auth/auth.module'

import { UserEntity } from 'src/user/entity/user.entity'
import { UserService } from 'src/user/user.service'

@Module({
  controllers: [PostsController],
  providers: [PostsService, UserService]
})
export class PostsModule {}
