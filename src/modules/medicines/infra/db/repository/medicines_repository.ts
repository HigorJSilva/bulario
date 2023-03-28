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

  public async create ({ name, registryNumber }: ICreateMedicine): Promise<IMedicines> {
    const medicine = this.ormRepository.create({ name, registryNumber })

    await this.ormRepository.save(medicine)

    return medicine as IMedicines
  }

  public async createBulk (data: ICreateMedicine[]): Promise<Medicines[]> {
    const medicines = this.ormRepository.create(data)
    await this.ormRepository.insert(medicines)
    return medicines
  }

  public async findById (id: string): Promise<IMedicines | null> {
    const medicines = await this.ormRepository.findOneBy({
      id
    })

    return medicines
  }

  public async deleteById (id: string): Promise<void> {
    await this.ormRepository.delete({
      id
    })
  }

  public async update (medicine: Medicines): Promise<Medicines> {
    const id = medicine.id
    const med = await this.ormRepository.findOne({
      where: { id }
    })

    return this.ormRepository.save({
      ...med,
      ...medicine
    })
  }
}

export default MedicinesRepository
