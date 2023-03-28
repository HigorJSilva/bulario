// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { injectable, inject } from 'tsyringe'
import { IMedicinesRepository } from '../data/medicines_repository'
import Medicines from '../infra/db/models/medicines_model'

@injectable()
class UpdateMedicineService {
  constructor (
    @inject('MedicinesRepository')
    private readonly medicinesRepository: IMedicinesRepository
  ) {}

  public async run (medicine: Medicines): Promise<Medicines> {
    await this.medicinesRepository.update(medicine)

    return medicine
  }
}

export default UpdateMedicineService
