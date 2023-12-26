import { IsNotEmpty } from "@nestjs/class-validator";

export class AuthLoginDto{
  
    @IsNotEmpty()
    email:string;

    @IsNotEmpty()
    password:string;

}