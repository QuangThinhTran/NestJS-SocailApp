import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { User } from 'src/user/entities/user.entity';
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('blogs')
export class Blog {
    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number

    @ApiProperty()
    @IsNotEmpty()
    @Column()
    content: string

    @ApiProperty()
    @ManyToOne((type) => User, (user) => user.id, {
        onDelete: 'CASCADE',
    })
    @JoinColumn({ name: 'user_id' })
    user_id: number

    @ManyToMany(() => User)
    @JoinTable({
        name: 'likes',
        joinColumn: {
            name: 'blog_id',
            referencedColumnName: 'id'
        },
        inverseJoinColumn: {
            name: 'user_id',
            referencedColumnName: 'id'
        }
    })

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date

    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date


    @DeleteDateColumn({ type: 'timestamp' })
    deletedAt: Date
}
