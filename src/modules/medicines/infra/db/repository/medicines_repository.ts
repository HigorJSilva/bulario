import { IMedicinesRepository } from '@modules/medicines/data/medicines_repository'
import { ICreateMedicine } from '@modules/medicines/domain/models/create_medicine_interface'
import { IMedicines } from '@modules/medicines/domain/models/medicines_interface'
import AppDataSource from '@shared/infra/db'
import { Repository } from 'typeorm'
import Medicines from '../models/medicines_model'

class MedicinesRepository implements IMedicinesRepository {
  private readonly ormRepository: Repository<Medicines>;

  constructor () {
    this.ormRepository = AppDataSource.getRepository(Medicines)
  }

  public async create ({ name, registryNumber, userId }: ICreateMedicine): Promise<IMedicines> {
    const user = this.ormRepository.create()

    await this.ormRepository.save(user)

    return user as IMedicines
  }

  public async findById (id: string): Promise<IMedicines | null> {
    const ObjectId = require('mongodb').ObjectId

    const medicines = await this.ormRepository.findOneBy({
      // @ts-expect-error
      _id: new ObjectId(id)
    })

    return medicines
  }

  public async findByUser (userId: string): Promise<IMedicines[] | null> {
    const ObjectId = require('mongodb').ObjectId

    const medicines = await this.ormRepository.findBy({
      // @ts-expect-error
      userId: new ObjectId(userId)
    })

    return medicines
  }
}

export default MedicinesRepository
