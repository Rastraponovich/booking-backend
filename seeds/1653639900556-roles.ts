import { MigrationInterface, QueryRunner } from 'typeorm';

const _roles_ = [
  { id: 1, name: 'Администратор', altName: 'Administrator', isActive: true },
  { id: 2, name: 'Пользователь', altName: 'User', isActive: true },
];

export class roles1653639900556 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    _roles_.forEach(
      async (item) =>
        await queryRunner.manager.getRepository('roles').save(item),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.getRepository('roles').delete(_roles_);
  }
}
