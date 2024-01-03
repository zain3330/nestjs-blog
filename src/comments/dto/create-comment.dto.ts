import { IsNotEmpty, IsOptional } from "@nestjs/class-validator";

export class CreateCommentDto {
    @IsNotEmpty()
    message:string;
  
    @IsNotEmpty()
    @IsOptional()
    parentId?:number;
}
