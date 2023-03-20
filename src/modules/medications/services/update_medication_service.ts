// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { injectable, inject } from 'tsyringe'
import { IMedicationsRepository } from '@modules/medications/data/medications_repository_interface'
import { IUpdateMedication } from '../domain/update_medication_interface'
import { ValidationError } from '@shared/exceptions'
import { notFound } from '@shared/messages/en'
import Medications from '../infra/db/models/medications_model'

@injectable()
class UpdateMedicationService {
  constructor (
    @inject('MedicationsRepository')
    private readonly medicationsRepository: IMedicationsRepository
  ) {}

  public async run ({ name, id }: IUpdateMedication): Promise<Medications> {
    const medication = await this.medicationsRepository.findById(id)
    if (!medication) {
      throw new ValidationError(notFound('Medication'))
    }

    medication.name = name
    await this.medicationsRepository.save(medication)

    return medication
  }
}

export default UpdateMedicationService
