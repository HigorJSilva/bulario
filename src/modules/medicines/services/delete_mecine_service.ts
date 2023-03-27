// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { injectable, inject } from 'tsyringe'
import { IMedicinesRepository } from '../data/medicines_repository'

@injectable()
class DeleteMedicineService {
  constructor (
    @inject('MedicinesRepository')
    private readonly medicinesRepository: IMedicinesRepository
  ) {}

  public async run (id: string): Promise<void> {
    await this.medicinesRepository.deleteById(id)
  }
}

export default DeleteMedicineService
