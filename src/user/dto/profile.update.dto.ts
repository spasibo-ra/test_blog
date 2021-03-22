import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsNotEmpty } from 'class-validator'
import { ProfileDto } from './profile.dto'
import { UserDto } from './user.dto'

export class UpdateProfileDto extends ProfileDto {
  @ApiProperty({
    example: 'Updated bio for user '
  })
  bio?: string

  @ApiProperty({
    example: 'Updated avatar link for user '
  })
  avatar?: string

}