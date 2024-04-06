import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, MinLength } from 'class-validator';
import { Blog } from 'src/blog/entities/blog.entity';
import { Report } from 'src/report/entities/report.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';

@Entity('users')
export class User {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  name: string;

  @ApiProperty()
  @Unique(['username'])
  @Column()
  username: string;

  @ApiProperty()
  @Unique(['email'])
  @IsEmail()
  @Column()
  email: string;

  @ApiProperty()
  @MinLength(6)
  @Column()
  password: string;

  @ApiProperty()
  @Column({ default: 'avatar.svg' })
  avatar: string;

  @OneToMany(() => Blog, (blog) => blog.users)
  blog: Blog[];

  @OneToMany(() => Report, (report) => report.user)
  report: Report[];

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamp' })
  deletedAt: Date;
}
