import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'

import { DatabaseConnectionService } from './config/database-connection.service'

import { AppController } from './app.controller'
import { AppService } from './app.service'

import { AuthModule } from './auth/auth.module'
import { UserModule } from './user/user.module'
import { ProfileModule } from './profile/profile.module'
import { PostsModule } from './posts/posts.module'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      useClass: DatabaseConnectionService
    }),
    AuthModule,
    UserModule,
    ProfileModule,
    PostsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
