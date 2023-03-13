import { IMedications } from '@modules/medications/domain/medications_interface'
import { UserRole } from '../infra/db/models/user_model'

export interface IUser {
  id: string
  name: string
  email: string
  password: string
  medications: IMedications[]
  role: UserRole
  created_at: Date
  updated_at: Date
}
