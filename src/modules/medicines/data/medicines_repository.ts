import { ICreateMedicine } from '../domain/models/create_medicine_interface'
import { IMedicines } from '../domain/models/medicines_interface'

export interface IMedicinesRepository {

  create(data: ICreateMedicine): Promise<IMedicines>
  findById(id: string): Promise<IMedicines | null>
  findByUser (userId: string): Promise<IMedicines[] | null>
}
