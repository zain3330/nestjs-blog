import { IsNotEmpty, IsOptional } from "@nestjs/class-validator";

export class CreateCommentDto {
    @IsNotEmpty()
    message:string;

    @IsNotEmpty()
    blogId:number;

    
    @IsNotEmpty()
    @IsOptional()
    parentId?:number;
}
