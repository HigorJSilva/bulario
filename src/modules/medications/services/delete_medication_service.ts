// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { injectable, inject } from 'tsyringe'
import { IMedicationsRepository } from '@modules/medications/data/medications_repository_interface'

@injectable()
class DeleteMedicationService {
  constructor (
    @inject('MedicationsRepository')
    private readonly medicationsRepository: IMedicationsRepository
  ) {}

  public async run (id: string): Promise<void> {
    await this.medicationsRepository.deleteById(id)
  }
}

export default DeleteMedicationService
