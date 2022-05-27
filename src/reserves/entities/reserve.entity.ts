import { Hallplane } from '../../hallplanes/entities/hallplane.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Contact } from 'src/contacts/entities/contact.entity';

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

  @ManyToOne(() => Contact, (contact) => contact.reserves)
  person: Contact;

  @Column({ default: true })
  isActive: boolean;
}
