import { IMedicationsRepository } from '@modules/medications/data/medications_repository_interface'
import { ICreateMedication } from '@modules/medications/domain/create_medication_interface'
import { IMedications } from '@modules/medications/domain/medications_interface'
import Medicines from '@modules/medicines/infra/db/models/medicines_model'
import User from '@modules/users/infra/db/models/user_model'
import AppDataSource from '@shared/infra/db'
import { Repository } from 'typeorm'
import Medications from '../models/medications_model'

class MedicationsRepository implements IMedicationsRepository {
  private readonly ormRepository: Repository<Medications>;

  constructor () {
    this.ormRepository = AppDataSource.getRepository(Medications)
  }

  public async create ({ name, userId, medicines }: ICreateMedication): Promise<IMedications> {
    const medication = this.ormRepository.create({ name })

    const user = new User()
    user.id = userId
    medication.user = user

    let medicinesToSave: Medicines[]

    medicines.forEach(medicine => {
      const newMedicine = new Medicines()

      newMedicine.registryNumber = medicine.registryNumber
      newMedicine.name = medicine.name
      medicinesToSave.push(newMedicine)
    })

    return await this.ormRepository.save(medication)
  }

  public async save (medication: Medications): Promise<Medications> {
    await this.ormRepository.save(medication)

    return medication
  }

  public async findById (id: string): Promise<IMedications | null> {
    const ObjectId = require('mongodb').ObjectId

    const medication = await this.ormRepository.findOneBy({
      // @ts-expect-error
      _id: new ObjectId(id)
    })

    return medication
  }

  public async findByUser (userId: string): Promise<IMedications[] | null> {
    const ObjectId = require('mongodb').ObjectId

    const medications = await this.ormRepository.findBy({
      // @ts-expect-error
      userId: new ObjectId(userId)
    })

    return medications
  }
}

export default MedicationsRepository
