import { IMedicationsRepository } from '@modules/medications/data/medications_repository_interface'
import { ICreateMedication } from '@modules/medications/domain/create_medication_interface'
import { IMedications } from '@modules/medications/domain/medications_interface'
import AppDataSource from '@shared/infra/db'
import { Repository } from 'typeorm'
import Medications from '../models/medications_model'

class MedicationsRepository implements IMedicationsRepository {
  private readonly ormRepository: Repository<Medications>;

  constructor () {
    this.ormRepository = AppDataSource.getRepository(Medications)
  }

  public async create (medication: ICreateMedication): Promise<IMedications> {
    return await this.ormRepository.save(medication)
  }

  public async save (medication: Medications): Promise<Medications> {
    await this.ormRepository.save(medication)

    return medication
  }

  public async findById (id: string): Promise<Medications | null> {
    const medication = await this.ormRepository.findOne({
      relations: {
        medicines: true
      },
      where: {
        id
      }
    })

    return medication
  }

  public async findByUser (userId: string): Promise<Medications[] | null> {
    const medications = await this.ormRepository.find({
      relations: {
        medicines: true
      },
      where: {
        userId
      }
    })

    return medications
  }

  public async deleteById (id: string): Promise<void> {
    await this.ormRepository.delete({
      id
    })
  }
}

export default MedicationsRepository
