import { ApiProperty } from '@nestjs/swagger'
import { ProfileDto } from './profile.dto'

export class UpdateProfileDto extends ProfileDto {

  @ApiProperty({
    example: 'Vladislav'
  })
  firstName?: string

  @ApiProperty({
    example: 'Prozorov'
  })
  lastName?: string

  @ApiProperty({
    example: 'Updated bio for user '
  })
  bio?: string

  @ApiProperty({
    example: 'Updated avatar link for user '
  })
  avatar?: string

}