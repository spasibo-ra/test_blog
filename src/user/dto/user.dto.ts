import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsNotEmpty } from 'class-validator'
import { ProfileDto } from './profile.dto'

export class UserDto extends ProfileDto {
  @IsNotEmpty()
  id: string

  @IsNotEmpty()
  username: string

  @IsNotEmpty()
  @IsEmail()
  email: string

  createOn?: Date

  bio?: string

  avatar?: string
}

