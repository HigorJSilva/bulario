import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from 'typeorm'

export class AddMedicationIdToMedicines1679873459415 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'medicines',
      new TableColumn({
        name: 'medicationId',
        type: 'varchar',
        length: '36',
        isNullable: true
      })
    )

    await queryRunner.createForeignKey(
      'medicines',
      new TableForeignKey({
        name: 'MedicinesMedication',
        columnNames: ['medicationId'],
        referencedTableName: 'medications',
        referencedColumnNames: ['id'],
        onDelete: 'SET NULL'
      })
    )
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('medicines', 'MedicinesMedication')
    await queryRunner.dropColumn('medicines', 'medicationId')
  }
}
