import { IMedications } from '@modules/medications/domain/medications_interface'
import Medicines from '@modules/medicines/infra/db/models/medicines_model'
import User from '@modules/users/infra/db/models/user_model'
import {
  Column,
  Entity,
  UpdateDateColumn,
  CreateDateColumn,
  ObjectIdColumn,
  ManyToOne,
  OneToMany
} from 'typeorm'

@Entity('medications')
class Medications implements IMedications {
  @ObjectIdColumn()
  id: string

  @ManyToOne(() => User, (user) => user.medications)
  user: User

  @OneToMany(() => Medicines, (medicines) => medicines.medication)
  medicines: Medicines[]

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date
}

export default Medications
