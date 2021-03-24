import { IsInt, IsNotEmpty } from 'class-validator'

// export enum transactionType{
//  'income',
//  'outcome'
// }

export class TransactionDto {
  @IsNotEmpty()
  t_id?: string

  @IsNotEmpty()
  account_id?: number

  @IsNotEmpty()
  type: string

  @IsNotEmpty()
  @IsInt()
  amount: number

  @IsNotEmpty()
  createdAt: Date

}