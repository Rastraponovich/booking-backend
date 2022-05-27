import { User } from '../../users/entities/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity({ name: 'roles' })
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  altName: string;

  @OneToMany(() => User, (user) => user.role)
  users: Array<User>;

  @Column({ default: true })
  isActive: boolean;
}
