import { IsNotEmpty, IsString } from 'class-validator'

export class ProfileDto {
  @IsNotEmpty()
  profile_id: number

  @IsString()
  bio?: string

  @IsString()
  avatar?: string
}