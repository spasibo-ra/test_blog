import { IsDate, IsNotEmpty, IsString } from 'class-validator'

export class AccountDto {
  @IsNotEmpty()
  account_id?: number

  totalAmount?: number
}