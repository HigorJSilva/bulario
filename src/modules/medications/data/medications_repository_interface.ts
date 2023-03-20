import { IMedications } from '@modules/medications/domain/medications_interface'
import { ICreateMedication } from '../domain/create_medication_interface'
import Medications from '../infra/db/models/medications_model'

export interface IMedicationsRepository {

  create(data: ICreateMedication): Promise<IMedications>
  save(data: Medications): Promise<Medications>
  findById(id: string): Promise<Medications | null>
  findByUser(userId: string): Promise<Medications[] | null>
  deleteById(id: string): Promise<void>
}
