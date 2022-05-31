import { Hallplane } from '../../hallplanes/entities/hallplane.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Reserve } from 'src/reserves/entities/reserve.entity';

@Entity({ name: 'tables' })
export class Table {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  hallplaneId: number;

  @ManyToOne(() => Hallplane, (hp) => hp.tables)
  hallplane: Hallplane;

  @OneToMany(() => Reserve, (reserve) => reserve.table)
  reserves: Array<Reserve>;

  @Column({ default: true })
  isActive: boolean;
}
