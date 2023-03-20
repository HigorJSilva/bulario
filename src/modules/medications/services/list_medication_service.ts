// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { injectable, inject } from 'tsyringe'
import { IMedicationsRepository } from '@modules/medications/data/medications_repository_interface'
import { ValidationError } from '@shared/exceptions'
import { notFound } from '@shared/messages/en'
import Medications from '../infra/db/models/medications_model'

@injectable()
class ListMedicationService {
  constructor (
    @inject('MedicationsRepository')
    private readonly medicationsRepository: IMedicationsRepository
  ) {}

  public async run (userId: string): Promise<Medications[]> {
    const medications = await this.medicationsRepository.findByUser(userId)

    if (!medications) {
      throw new ValidationError(notFound('Medication'))
    }

    return medications
  }
}

export default ListMedicationService
