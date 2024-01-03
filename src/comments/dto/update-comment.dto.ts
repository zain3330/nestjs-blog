import { IsNotEmpty, IsOptional } from "@nestjs/class-validator";

export class  UpdateCommentDto {
    @IsNotEmpty()
    message:string;
    
    @IsNotEmpty()
    @IsOptional()
    parentId?:number;
}
