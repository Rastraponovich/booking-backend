import { Hallplane } from '../../hallplanes/entities/hallplane.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Reserve } from 'src/reserves/entities/reserve.entity';

@Entity({ name: 'contacts' })
export class Contact {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ unique: true, nullable: false })
  phoneNumber: number;

  @Column({ unique: true, nullable: false })
  email: string;

  @OneToMany(() => Reserve, (reserve) => reserve.person)
  reserves: Array<Reserve>;
}
