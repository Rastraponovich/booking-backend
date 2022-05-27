import { MigrationInterface, QueryRunner } from 'typeorm';

const _users_ = [
  {
    id: 1,
    name: 'Wilde',
    email: 'wilde@bk.ru',
    password: '1',
    isActive: true,
    roleId: 1,
  },
  {
    id: 2,
    name: 'User',
    email: 'user@bk.ru',
    password: '1',
    isActive: true,
    roleId: 2,
  },
];

export class users1653640019518 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    _users_.forEach(
      async (user) =>
        await queryRunner.manager.getRepository('users').save(user),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.getRepository('users').delete(_users_);
  }
}
