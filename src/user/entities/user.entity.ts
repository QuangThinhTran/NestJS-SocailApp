import { ApiProperty } from '@nestjs/swagger';
import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('users')
export class User {
    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number

    @ApiProperty()
    @Column()
    name: string;

    @ApiProperty()
    @Column({ unique: true })
    username: string;

    @ApiProperty()
    @Column({ unique: true })
    email: string

    @ApiProperty()
    @Column()
    password: string

    @CreateDateColumn({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP'
    })
    created_at: Date

    @UpdateDateColumn({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP'
    })
    updated_at: Date


    @DeleteDateColumn({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP'
    })
    deleted_at: Date
}
