import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { Blog } from 'src/blog/entities/blog.entity';
import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
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
    @ManyToOne((type) => Blog, (blog) => blog.id, {
        onDelete: 'CASCADE',
    })
    path: string

    @CreateDateColumn({
        name: 'created_at',
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
    })
    createdAt: Date;

    @DeleteDateColumn({
        name: 'deleted_at',
        type: 'timestamp',
        nullable: true,
        default: null,
    })
    deletedAt: Date;
}
