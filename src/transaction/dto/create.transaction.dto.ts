import { IsNotEmpty, IsString, IsInt } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'
import { TransactionDto } from './transaction.dto'

export class CreateTransactionDto extends TransactionDto {
  @ApiProperty({
    example: 'income'
  })
  @IsNotEmpty()
  @IsString()
  type: string

  @ApiProperty({
    example: '1000'
  })
  @IsNotEmpty()
  @IsInt()
  amount: number

  account_id?: number | any
}