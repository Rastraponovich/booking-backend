import { Hallplane } from '../../hallplanes/entities/hallplane.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity({ name: 'reserves' })
export class Reserve {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  tableId: number;

  @Column()
  hallplaneId: number;

  @ManyToOne(() => Hallplane, (hp) => hp.reserves)
  hallplane: Hallplane;

  @Column({ default: true })
  isActive: boolean;
}
