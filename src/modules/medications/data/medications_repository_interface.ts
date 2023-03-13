import { ICreateMedication } from '@modules/medications/domain/create_medication_interface'
import { IMedications } from '@modules/medications/domain/medications_interface'

export interface IMedicationsRepository {

  create(data: ICreateMedication): Promise<IMedications>
  findById(id: string): Promise<IMedications | null>
  findByUser(userId: string): Promise<IMedications[] | null>
}
