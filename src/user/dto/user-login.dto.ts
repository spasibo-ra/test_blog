import { IsNotEmpty } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class LoginUserDto {
  @ApiProperty({
    example: 'Spabibo'
  })
  @IsNotEmpty()
  readonly username: string

  @ApiProperty({
    example: 'password'
  })
  @IsNotEmpty()
  readonly password: string
}