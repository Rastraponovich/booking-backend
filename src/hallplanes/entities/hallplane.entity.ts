import { Reserve } from '../../reserves/entities/reserve.entity'; //'./src/reserves/entities/reserve.entity';
import { Table } from '../../tables/entities/table.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity({ name: 'hallplanes' })
export class Hallplane {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Table, (table) => table.hallplane)
  tables: Array<Table>;

  @OneToMany(() => Reserve, (reserve) => reserve.hallplane)
  reserves: Array<Reserve>;

  @Column({ default: 'hall.jpeg' })
  image: string;

  @Column({ default: true })
  isActive: boolean;
}
