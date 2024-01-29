import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('blogs')
export class Blog {
    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number

    @ApiProperty()
    @IsNotEmpty()
    content: string

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
