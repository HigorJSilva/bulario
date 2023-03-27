// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { injectable, inject } from 'tsyringe'
import { IMedicationsRepository } from '@modules/medications/data/medications_repository_interface'
import { ICreateMedication } from '@modules/medications/domain/create_medication_interface'
import { IMedications } from '@modules/medications/domain/medications_interface'
import { IMedicinesRepository } from '@modules/medicines/data/medicines_repository'

@injectable()
class CreateMedicationService {
  constructor (
    @inject('MedicationsRepository')
    private readonly medicationsRepository: IMedicationsRepository,
    @inject('MedicinesRepository')
    private readonly medicinesRepository: IMedicinesRepository
  ) {}

  public async run ({ name, userId, medicines }: ICreateMedication): Promise<IMedications> {
    const meds = await this.medicinesRepository.createBulk(medicines)

    const medication = await this.medicationsRepository.create({ name, userId, medicines: meds })

    return medication
  }
}

export default CreateMedicationService
