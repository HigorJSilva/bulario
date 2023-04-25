// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { injectable, inject } from 'tsyringe'
import { IMedicationsRepository } from '@modules/medications/data/medications_repository_interface'
import { IUpdateMedication } from '../domain/update_medication_interface'
import { ValidationError } from '@shared/exceptions'
import { notFound } from '@shared/messages/en'

@injectable()
class GetSideEffectsService {
  constructor (
    @inject('MedicationsRepository')
    private readonly medicationsRepository: IMedicationsRepository
  ) {}

  public async run ({ name, id }: IUpdateMedication): Promise<string> {
    const medication = await this.medicationsRepository.findById(id)
    if (!medication) {
      throw new ValidationError(notFound('Medication'))
    }

    const sideEffects: string[] = []

    medication.medicines.forEach(medicines => {
      const text: string = medicines.sideEffects ? medicines.sideEffects : 'Ainda não encontrado '
      const ok = `======${medicines.name}=========\n ` + text
      sideEffects.push(ok)
    })

    return sideEffects.toString()
  }
}

export default GetSideEffectsService
