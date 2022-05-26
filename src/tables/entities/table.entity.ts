import { Hallplane } from 'src/hallplanes/entities/hallplane.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';

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

  @Column({ default: true })
  isActive: boolean;
}
