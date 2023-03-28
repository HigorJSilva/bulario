import Medications from '@modules/medications/infra/db/models/medications_model'
import { IUser } from '@modules/users/domain/user_interface'
import {
  Column,
  Entity,
  UpdateDateColumn,
  CreateDateColumn,
  OneToMany,
  PrimaryGeneratedColumn
} from 'typeorm'

export enum UserRole {
    ADMIN = "admin",
    USER = "user",
}

@Entity('users')
class User implements IUser {
 @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  name: string

  @Column({ unique: true })
  email: string

  @Column()
  password: string

  @Column({
    type: "varchar",
    enum: UserRole,
    default: UserRole.USER,
  })
  role: UserRole

  @OneToMany(() => Medications, (medication) => medication.user)
  medications: Medications[]

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date
}

export default User
