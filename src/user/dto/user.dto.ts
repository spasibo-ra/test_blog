import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsNotEmpty } from 'class-validator'

export class UserDto  {
  @IsNotEmpty()
  id: string

  @IsNotEmpty()
  username: string

  @IsNotEmpty()
  @IsEmail()
  email: string

  createOn?: Date

}

