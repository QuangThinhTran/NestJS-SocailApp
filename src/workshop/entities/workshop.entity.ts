import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { Comment } from '../../comment/entities/comment.entity';
import { User } from '../../user/entities/user.entity';

@Entity('workshops')
export class Workshop {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  slug: string;

  @ApiProperty()
  @IsNotEmpty()
  @Column()
  description: string;

  @ApiProperty()
  @IsNotEmpty()
  @Column()
  address: string;

  @ApiProperty()
  @Column()
  image: string;

  @ApiProperty()
  @IsNotEmpty()
  @Column({ type: 'timestamp' })
  start_date: Date;

  @OneToMany(() => Comment, (comment) => comment.blog)
  comments: Comment[];

  @ApiProperty()
  @IsNotEmpty()
  @ManyToOne(() => User, (user) => user.blog, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  users: User[];

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamp' })
  deletedAt: Date;
}
