import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm'

export class AddSideEffectsToMedicine1679939067730 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'medicines',
      new TableColumn({
        name: 'sideEffects',
        type: 'text',
        isNullable: true
      })
    )
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('medicines', 'sideEffects')
  }
}
