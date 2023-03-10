import { IUser } from '@modules/users/domain/user_interface'
import {
  Column,
  Entity,
  UpdateDateColumn,
  CreateDateColumn,
  ObjectIdColumn
} from 'typeorm'

export enum UserRole {
    ADMIN = "admin",
    USER = "user",
}

@Entity('users')
class User implements IUser {
  @ObjectIdColumn()
  id: string

  @Column()
  name: string

  @Column({ unique: true })
  email: string

  @Column()
  password: string

  @Column({
        type: "enum",
        enum: UserRole,
        default: UserRole.USER,
    })
  role: UserRole

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date
}

export default User
