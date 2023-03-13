import { ICreateMedicine } from '@modules/medicines/domain/models/create_medicine_interface'

export interface ICreateMedication {
  name: string
  userId: string
  medicines: ICreateMedicine[]
}
