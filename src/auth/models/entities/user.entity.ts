import { BaseEntity, BeforeInsert, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn,UpdateDateColumn } from "typeorm";
import * as bcrypt from 'bcryptjs';
import { UserRole } from "src/auth/enum/role.enum";
import { Blog } from "src/blog/entities/blog.entity";

@Entity()
export class User extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string

    @Column({ type: "enum", enum: UserRole, default: UserRole.USER })
    role: UserRole;
   
    @Column()
    @CreateDateColumn()
    createdAt: Date;

    @Column()
    @UpdateDateColumn()
    updatedAt: Date;

    @BeforeInsert()
    async hashPassword() {
        this.password = await  bcrypt.hash(this.password, 8);
    }

    async validatePassword(password: string): Promise<boolean> {
        return bcrypt.compare(password, this.password);
    }
    @OneToMany(()=>Blog,blog=>blog.user)
    blog:Blog[];
    
}