import { Body, Controller, Get, Put, Req, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'

import { PostsService } from './posts.service'

@Controller('posts')
export class PostsController {
  constructor (
    private readonly postsService: PostsService
  ) {}
}
