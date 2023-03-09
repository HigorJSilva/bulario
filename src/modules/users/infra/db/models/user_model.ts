import { IUser } from '@modules/users/domain/user_interface'
import {
  Column,
  Entity,
  UpdateDateColumn,
  CreateDateColumn,
  ObjectIdColumn
} from 'typeorm'

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

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date
}

export default User
