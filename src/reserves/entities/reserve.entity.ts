import { Hallplane } from '../../hallplanes/entities/hallplane.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  DeleteDateColumn,
  UpdateDateColumn,
  CreateDateColumn,
} from 'typeorm';
import { Contact } from 'src/contacts/entities/contact.entity';
import { Table } from 'src/tables/entities/table.entity';

@Entity({ name: 'reserves' })
export class Reserve {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  tableId: number;
  @ManyToOne(() => Table, (table) => table.reserves)
  table: Table;

  @Column()
  guests: number;

  @Column()
  prepay: number;

  @Column({ nullable: true, type: 'bigint' })
  startDate: number;
  @Column({ nullable: true, type: 'bigint' })
  endDate: number;

  @Column()
  hallplaneId: number;
  @ManyToOne(() => Hallplane, (hp) => hp.reserves)
  hallplane: Hallplane;

  @ManyToOne(() => Contact, (contact) => contact.reserves)
  person: Contact;

  @Column({ default: true })
  isActive: boolean;

  @DeleteDateColumn({})
  deletedAt: string;
  @UpdateDateColumn()
  updatedAt: string;
  @CreateDateColumn()
  createdAt: string;
}
