import { IMedicines } from '@modules/medicines/domain/models/medicines_interface'
import { IUser } from '@modules/users/domain/user_interface'

export interface IMedications {
  id: string
  user: IUser
  name: string
  userId: string
  medicines: IMedicines[]
  created_at: Date
  updated_at: Date
}
