import { User } from 'src/users/entities/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity({ name: 'tables' })
export class Table {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  hallplaneId: number;

  @OneToMany(() => User, (user) => user.role)
  users: Array<User>;

  @Column({ default: true })
  isActive: boolean;
}
