import Medications from '@modules/medications/infra/db/models/medications_model'
import { IMedicines } from '@modules/medicines/domain/models/medicines_interface'
import {
  Column,
  Entity,
  UpdateDateColumn,
  CreateDateColumn,
  ObjectIdColumn,
  ManyToOne
} from 'typeorm'

@Entity('medicines')
class Medicines implements IMedicines {
  @ObjectIdColumn()
  id: string
  
  @Column()
  registryNumber: string

  @Column()
  name: string

  @ManyToOne(() => Medications, (medications) => medications.medicines)
  medication: Medications

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date
}

export default Medicines
