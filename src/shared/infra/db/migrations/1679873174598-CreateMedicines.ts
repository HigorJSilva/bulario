import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CreateMedicines1679873174598 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'medicines',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            length: '36',
            isPrimary: true,
            generationStrategy: 'uuid'
          },
          {
            name: 'name',
            type: 'varchar'
          },
          {
            name: 'registryNumber',
            type: 'varchar'
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()'
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()'
          }
        ]
      })
    )
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('medicines')
  }
}
