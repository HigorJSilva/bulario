import env from '@config/env'
import Medications from '@modules/medications/infra/db/models/medications_model'
import Medicines from '@modules/medicines/infra/db/models/medicines_model'
import User from '@modules/users/infra/db/models/user_model'
import { DataSource } from 'typeorm'
import { CreateUsers1679872771237 } from './migrations/1679872771237-CreateUsers'
import { CreateMedications1679872986839 } from './migrations/1679872986839-CreateMedications'
import { CreateMedicines1679873174598 } from './migrations/1679873174598-CreateMedicines'
import { AddUserIdToMedications1679873338996 } from './migrations/1679873338996-AddUserIdToMedications'
import { AddMedicationIdToMedicines1679873459415 } from './migrations/1679873459415-AddMedicationIdToMedicines'
import { AddSideEffectsToMedicine1679939067730 } from './migrations/1679939067730-AddSideEffectsToMedicine'

const AppDataSource = new DataSource({
  type: 'postgres',
  host: env.postgresHost,
  port: env.postgresPort,
  username: env.postgresUser,
  password: env.postgresPassword,
  database: env.postgresDatabase,
  entities: [User, Medications, Medicines],
  migrations: [
    CreateUsers1679872771237,
    CreateMedications1679872986839,
    CreateMedicines1679873174598,
    AddUserIdToMedications1679873338996,
    AddMedicationIdToMedicines1679873459415,
    AddSideEffectsToMedicine1679939067730
  ],
  synchronize: true,
  ssl: true,
  extra: {
    ssl: {
      rejectUnauthorized: false
    }
  }
})

export default AppDataSource
