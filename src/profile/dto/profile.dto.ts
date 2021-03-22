import { IsDate, IsNotEmpty, IsString } from 'class-validator'

export class ProfileDto {

  @IsNotEmpty()
  profile_id?: number

  @IsString()
  firstName?: string

  @IsString()
  lastName?: string

  @IsString()
  bio?: string

  @IsString()
  avatar?: string

  @IsDate()
  createdOn?: Date

  @IsDate()
  updatedOn?: Date
}