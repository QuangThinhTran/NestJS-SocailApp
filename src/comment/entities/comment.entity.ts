import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { Blog } from 'src/blog/entities/blog.entity';
import { User } from 'src/user/entities/user.entity';
import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

@Entity('comments')
export class BaseEntity {
    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty()
    @IsNotEmpty()
    @Column()
    comment: string;

    @ManyToOne((type) => User, (user) => user.id, {
        onDelete: 'CASCADE'
    })
    user_id: number

    @ManyToOne((type) => Blog, (blog) => blog.id, {
        onUpdate: 'CASCADE',
    })
    blog_id: number

    @CreateDateColumn({
        name: 'created_at',
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
    })
    createdAt: Date;

    @UpdateDateColumn({
        name: 'updated_at',
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
    })
    updatedAt: Date;

    @DeleteDateColumn({
        name: 'deleted_at',
        type: 'timestamp',
        nullable: true,
        default: null,
    })
    deletedAt: Date;
}
