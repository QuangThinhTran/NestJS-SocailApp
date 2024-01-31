import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { Comment } from 'src/comment/entities/comment.entity';
import { Image } from 'src/image/enitities/image.entity';
import { Report } from 'src/report/entities/report.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('blogs')
export class Blog {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  slug: string;

  @ApiProperty()
  @IsNotEmpty()
  @Column()
  content: string;

  @ApiProperty()
  @IsNotEmpty()
  @ManyToOne(() => User, (user) => user.blog, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  users: User[];

  @ManyToMany(() => User)
  @JoinTable({
    name: 'likes',
    joinColumn: {
      name: 'blog_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'user_id',
      referencedColumnName: 'id',
    },
  })
  @OneToMany(() => Image, (image) => image.blog)
  images: Image[];

  @OneToMany(() => Comment, (comment) => comment.blog)
  comments: Comment[];

  @OneToMany(() => Report, (report) => report.blog)
  reports: Report[];

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamp' })
  deletedAt: Date;
}
