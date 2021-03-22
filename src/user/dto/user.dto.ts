import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsNotEmpty } from 'class-validator'

export class UserDto {
  @IsNotEmpty()
  id: string

  @ApiProperty({ type: 'path', example: 'Spasibo'})
  @IsNotEmpty()
  username: string

  @IsNotEmpty()
  @IsEmail()
  email: string

  createOn?: Date
}

