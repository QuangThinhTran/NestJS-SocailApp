import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { Blog } from 'src/blog/entities/blog.entity';
import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn
} from 'typeorm';

@Entity('images')
export class Image {
    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty()
    @IsNotEmpty()
    @Column()
    path: string

    @ApiProperty()
    @ManyToOne((type) => Blog, (blog) => blog.id, {
        onDelete: 'CASCADE',
    })
    @JoinColumn({ name: 'blog_id' })
    blog_id: number

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;

    @DeleteDateColumn({ type: 'timestamp' })
    deletedAt: Date;
}
