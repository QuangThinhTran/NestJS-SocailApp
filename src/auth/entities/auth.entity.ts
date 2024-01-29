import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { Column } from "typeorm";

export class Auth {
    @ApiProperty()
    @IsNotEmpty()
    @Column()
    username: string;

    @ApiProperty()
    @IsNotEmpty()
    @Column()
    password: string;
}
