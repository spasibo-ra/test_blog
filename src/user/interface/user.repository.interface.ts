import { UserInterface } from "./user.interface"

export interface UserRepositoryInterface {
  save(user: UserInterface): Promise<void>
  update(user: UserInterface): Promise<void>
  getById(id: string): Promise<UserInterface>
  remove(user: UserInterface): Promise<void>
}