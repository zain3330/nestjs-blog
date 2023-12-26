import { IsNotEmpty } from "@nestjs/class-validator";
import { BeforeInsert } from "typeorm";

export class AuthRegisterDto{
  
    @IsNotEmpty()
    email:string;

    @IsNotEmpty()
    password:string;

}