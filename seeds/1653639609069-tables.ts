import { MigrationInterface, QueryRunner } from 'typeorm';

export const _tables_ = [
  { id: 1, name: 'стол 1', hallplaneId: 1, isActive: true },
  { id: 2, name: 'стол 2', hallplaneId: 1, isActive: true },
  { id: 3, name: 'стол 3', hallplaneId: 1, isActive: true },
  { id: 4, name: 'стол 4', hallplaneId: 1, isActive: true },
  { id: 5, name: 'стол 5', hallplaneId: 3, isActive: true },
  { id: 6, name: 'стол 6', hallplaneId: 3, isActive: true },
  { id: 7, name: 'стол 7', hallplaneId: 3, isActive: true },
  { id: 8, name: 'вип 1', hallplaneId: 2, isActive: true },
  { id: 9, name: 'вип 2', hallplaneId: 2, isActive: true },
  { id: 10, name: 'улица 1', hallplaneId: 4, isActive: true },
  { id: 11, name: 'улица 2', hallplaneId: 4, isActive: true },
  { id: 12, name: 'улица 3', hallplaneId: 4, isActive: true },
  { id: 13, name: 'служебный 1', hallplaneId: 5, isActive: true },
];

export class tables1653639609069 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    _tables_.forEach(
      async (item) =>
        await queryRunner.manager.getRepository('tables').save(item),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.getRepository('tables').delete(_tables_);
  }
}
