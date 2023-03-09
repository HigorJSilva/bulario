import { ICreateUser } from '../domain/create_user_interface'
import { IUser } from '../domain/user_interface'

export interface IUsersRepository {

  create(data: ICreateUser): Promise<IUser>
  findByEmail(email: string): Promise<IUser | null>
}
