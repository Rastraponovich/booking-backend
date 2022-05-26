import { Table } from 'src/tables/entities/table.entity';
import { User } from 'src/users/entities/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity({ name: 'hallplanes' })
export class Hallplane {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  hallplaneId: number;

  @OneToMany(() => Table, (table) => table.hallplane)
  tables: Array<Table>;

  @Column({ default: true })
  isActive: boolean;
}
