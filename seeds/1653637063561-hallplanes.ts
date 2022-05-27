import { MigrationInterface, QueryRunner } from 'typeorm';

const _hallPlanes_ = [
  { id: 1, name: 'основной', image: 'hall.jpeg' },
  { id: 2, name: 'вип', image: 'vip.jpeg' },
  { id: 3, name: 'второй зал', image: 'second.jpg' },
  { id: 4, name: 'терраса', image: 'terrace.jpeg' },
  { id: 5, name: 'служебный', image: 'reserve.jpeg' },
];

export class hallplanes1653637063561 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    _hallPlanes_.forEach(
      async (item) =>
        await queryRunner.manager.getRepository('hallplanes').save(item),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.getRepository('hallplanes').delete(_hallPlanes_);
  }
}
