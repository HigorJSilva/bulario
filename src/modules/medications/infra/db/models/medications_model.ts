import { IMedications } from '@modules/medications/domain/medications_interface'
import Medicines from '@modules/medicines/infra/db/models/medicines_model'
import User from '@modules/users/infra/db/models/user_model'
import {
  Column,
  Entity,
  UpdateDateColumn,
  CreateDateColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from 'typeorm'

@Entity('medications')
class Medications implements IMedications {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  name: string

  @ManyToOne(() => User, (user) => user.medications, {
    onDelete: 'NO ACTION',
  })
  user: User

  @OneToMany(() => Medicines, (medicines) => medicines.medication, {
    onDelete: 'SET NULL',
  })
  medicines: Medicines[]

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date
}

export default Medications
