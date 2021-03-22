import { IsNotEmpty, IsEmail, IsString } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'


export class CreateUserDto {
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

}

