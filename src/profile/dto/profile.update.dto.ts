import { ApiProperty } from '@nestjs/swagger'
import { ProfileDto } from './profile.dto'

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