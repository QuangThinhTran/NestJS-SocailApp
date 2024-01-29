import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from 'typeorm';

@Entity('users')
export class User {
    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number

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
    email: string

    @ApiProperty()
    @Column()
    password: string

    @ApiProperty()
    @Column({ default: 'avatar.svg' })
    avatar: string

    @ManyToMany(() => User)
    @JoinTable({
        name: 'user_followers',
        joinColumn: {
            name: 'user_id',
            referencedColumnName: 'id'
        },
        inverseJoinColumn: {
            name: 'follower_id',
            referencedColumnName: 'id'
        }
    })
    followers: User[]

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date

    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date


    @DeleteDateColumn({ type: 'timestamp' })
    deletedAt: Date
}
