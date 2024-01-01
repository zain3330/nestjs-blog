import { Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './models/entities/user.entity';
import { Repository } from 'typeorm';
import { AuthRegisterDto } from './models/dto/auth-register.dto';
import { CommonErrors } from 'src/errors/common-errors';
import { AuthLoginDto } from './models/dto/auth-login.dto';
import { JwtService } from '@nestjs/jwt';
import { ForgotPasswordDto } from './models/dto/forget-password.dto';
import * as bcrypt from 'bcrypt';
import { MailerService } from '@nestjs-modules/mailer';


@Injectable()
export class AuthService {
    constructor(@InjectRepository(User) private userRepository:Repository<User>, private jwtService: JwtService, private mailerService: MailerService){}
  async register(authRegisterDto: AuthRegisterDto) {
    //call findByEmail method
    const existing = await this.findByEmail(authRegisterDto.email);
    //create user data
    const user = await this.userRepository.create(authRegisterDto);

    //check for user exist or not 
    if(existing){
        //if exist throw error
        throw new InternalServerErrorException(CommonErrors.EmailExist);
    }
    //if not exist save in database
        else {
            await user.save();
        }

    return user;

  }
  //query on user table to find email
  async findByEmail(email:string){
    return await User.findOne({
        where:{
            email:email,
        }
    })

  }
  async login(authLoginDto:AuthLoginDto){
    //check user fond if found return user
    const user =this.validateUser(authLoginDto);
    

    //extract user id and role 
    const payload={
        role:(await user).role,
        userId:(await user).id,
    };
     
    //return token with playload
    return {
        access_token:this.jwtService.sign(payload)
    }

  }


async forgotPassword(forgotPasswordDto: ForgotPasswordDto) {
    //check email exist or not 
    const exists = await this.findByEmail(forgotPasswordDto.email);

    if(!exists) {
        throw new NotFoundException(CommonErrors.NotFound);
    } else {
        //find user data by eamil 
        const user = await this.userRepository.findOne({
           where: {
            email: forgotPasswordDto.email,
           }
        });
        //ganerate random password
        const passwordRand = Math.random()
            .toString(36)
            .slice(-8);
        //push password in email field
        user.password = bcrypt.hashSync(passwordRand, 8);
        //send email to user
        this.sendForgotPasswordMail(user.email, passwordRand);
        return await this.userRepository.save(user);
    }
}
private async sendForgotPasswordMail(email: string, password: string) {
    await this.mailerService.sendMail({
        to: email,
        subject: 'Welcome to Nice App! Confirm your Email',
        template: 'forgot-password',
        context: { 
            email: email,
            password: password
        },
    });
}
async validateUser(authLoginDto: AuthLoginDto): Promise<User> {
    const { email, password } = authLoginDto;

    const user = await this.findByEmail(email);
    if (!(await user?.validatePassword(password))) {
        throw new UnauthorizedException(CommonErrors.Unauthorized);
    }

    return user;
}

}
