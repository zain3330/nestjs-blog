import { IsNotEmpty, IsString } from "@nestjs/class-validator"

export class CreateBlogDto {

    @IsString()
    @IsNotEmpty()
    title:string;
    
    @IsNotEmpty()
    description:string;

}
