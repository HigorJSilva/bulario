import { ICreateMedicine } from '../domain/models/create_medicine_interface'
import { IMedicines } from '../domain/models/medicines_interface'
import Medicines from '../infra/db/models/medicines_model'

export interface IMedicinesRepository {

  create(data: ICreateMedicine): Promise<IMedicines>
  createBulk (data: ICreateMedicine[]): Promise<Medicines[]>
  findById(id: string): Promise<IMedicines | null>
  deleteById (id: string): Promise<void>
}
