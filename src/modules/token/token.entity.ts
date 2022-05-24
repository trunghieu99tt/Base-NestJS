import { IsNumber, IsString } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

@Entity()
@Index(['key', 'userId'])
@Unique(['key'])
export class Token {
  @PrimaryGeneratedColumn({
    type: 'bigint',
  })
  id: number;

  @Column({
    name: 'user_id',
  })
  userId: number;

  @Column()
  @IsString()
  key: string;

  @Column({
    name: 'expires_at',
  })
  @IsNumber()
  expAt: number;

  @CreateDateColumn({
    name: 'created_at',
  })
  createdAt: Date;
}
