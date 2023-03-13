// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { injectable, inject } from 'tsyringe'
import { IMedicationsRepository } from '@modules/medications/data/medications_repository_interface'
import { ICreateMedication } from '@modules/medications/domain/create_medication_interface'
import { IMedications } from '@modules/medications/domain/medications_interface'

@injectable()
class CreateMedicationService {
  constructor (
    @inject('MedicationsRepository')
    private readonly medicationsRepository: IMedicationsRepository
  ) {}

  public async run ({ name, userId }: ICreateMedication): Promise<IMedications> {
    const medication = await this.medicationsRepository.create({ name, userId })

    return medication
  }
}

export default CreateMedicationService
