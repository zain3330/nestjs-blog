import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Blog } from './entities/blog.entity';

@Injectable()
export class BlogService {
  constructor(
    @InjectRepository(Blog) private blogRepository: Repository<Blog>,
  ) {}

  async create( createBlogDto: CreateBlogDto ,user:any) {
    const blog = this.blogRepository.create({...createBlogDto,user});
    console.log("blog",user);

    try {
      await blog.save();
    } catch (err) {
      throw InternalServerErrorException;
    }
    return blog;
  }
  
  async findAll() {
    const blogs = await this.blogRepository.find({ relations: ['user','comments'] });
    const blogsCreatedByUsers = blogs.filter(blog => blog.user !== null);
    console.log("all blogs",blogsCreatedByUsers);
    return blogsCreatedByUsers;
  }

  async findOne(id: number) {
    const blog = await this.blogRepository.findOne({where:{id},relations:['comments']});
    return blog;
  }

  async update(id: number, updateBlogDto: UpdateBlogDto) {
    const blog = await this.blogRepository.findOneBy({ id });
    if (!blog) {
      throw new InternalServerErrorException('blog not font');
    } else {
      await this.blogRepository.update({ id }, updateBlogDto);
      return await this.blogRepository.findOneBy({ id });
    }
  }

  async remove(id: number) {
    const blog = await this.blogRepository.findOneBy({ id });
    if (!blog) {
      throw new InternalServerErrorException('blog not font');
    } else {
      await this.blogRepository.delete({ id });
      return blog;
    }
  }
}
