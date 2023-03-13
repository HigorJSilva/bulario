import Medicines from '@modules/medicines/infra/db/models/medicines_model'

export interface ICreateMedication {
  name: string
  userId: string
  medicines: Medicines[]
}
