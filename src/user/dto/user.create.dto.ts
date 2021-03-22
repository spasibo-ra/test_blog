import { IsNotEmpty, IsEmail, IsString } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

import { ProfileDto } from './profile.dto'


export class UserCreateDto extends ProfileDto {
  @ApiProperty({
    example: 'Spabibo'
  })
  @IsNotEmpty()
  username: string

  @ApiProperty({
    example: 'password'
  })
  @IsNotEmpty()
  password: string

  @ApiProperty({
    example: 'spasibo@i.io'
  })
  @IsNotEmpty()
  @IsEmail()
  email: string

  @ApiProperty({
    example: 'It`s test bio '
  })
  bio?: string

  @ApiProperty({
    example: 'http://testlink.io/avatar.jpg'
  })
  avatar?: string

}

