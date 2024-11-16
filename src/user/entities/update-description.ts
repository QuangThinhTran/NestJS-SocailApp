import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class updateDescription {
  @ApiProperty()
  @IsNotEmpty()
  description: string;
}