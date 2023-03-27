import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from 'typeorm'

export class AddUserIdToMedications1679873338996 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'medications',
      new TableColumn({
        name: 'userId',
        type: 'varchar',
        length: '36',
        isNullable: true
      })
    )

    await queryRunner.createForeignKey(
      'medications',
      new TableForeignKey({
        name: 'MedicationsUser',
        columnNames: ['userId'],
        referencedTableName: 'users',
        referencedColumnNames: ['id'],
        onDelete: 'SET NULL'
      })
    )
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('medications', 'MedicationsUser')
    await queryRunner.dropColumn('medications', 'userId')
  }
}
