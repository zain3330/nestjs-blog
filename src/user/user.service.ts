import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/models/entities/user.entity';
import { CommonErrors } from 'src/errors/common-errors';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private userRepository:Repository<User>){}

    async findAll(): Promise<User[]> {
        return await this.userRepository.find();
    }
    
    async getUserById(id: number) {
        const user= await this.userRepository.findOne({ where: { id } });

        if (!user) {
            throw new NotFoundException(CommonErrors.UserNotFound);
          }

          return user;
    }
    
}
