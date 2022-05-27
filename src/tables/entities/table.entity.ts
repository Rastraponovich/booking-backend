import { Hallplane } from '../../hallplanes/entities/hallplane.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

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
