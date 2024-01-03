import { User } from "src/auth/models/entities/user.entity";
import { Blog } from "src/blog/entities/blog.entity";
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryColumnCannotBeNullableError, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Comment extends BaseEntity {

    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    message:string;
   
    @ManyToOne(() => Blog, blog => blog.comments)
    blog: Blog;

    @Column( {nullable: true })
    parentId:number;
  
    @ManyToOne(() => User, user => user.comments )
    user: User;

}
