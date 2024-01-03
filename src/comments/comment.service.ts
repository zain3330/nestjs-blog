import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './entities/comment.entity';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment) private commentRepository: Repository<Comment>,
  ) {}

  async create(
    createCommentDto: CreateCommentDto,
    user: any,
    parentId: number,
  ) {
    const comment = this.commentRepository.create({
      ...createCommentDto,
      user,
      parentId,
    });
    console.log(' dto comment', createCommentDto);
    console.log(' create comment', comment);

    try {
      await comment.save();
    } catch (err) {
      throw new InternalServerErrorException();
    }

    return comment;
  }

  findAll() {
    return this.commentRepository.find({ relations: ['user', 'blog'] });
  }

  async CommentById(id: number) {
    const comment = await this.commentRepository.findOne({ where: { id } });
    if (comment) {
      return comment;
    } else {
      throw new InternalServerErrorException();
    }
  }

  async update(id: number, updateCommentDto: UpdateCommentDto) {
    const blog = await this.commentRepository.findOneBy({ id });
    if (!blog) {
      throw new InternalServerErrorException();
    } else {
      await this.commentRepository.update({ id }, updateCommentDto);
      return await this.commentRepository.findOneBy({ id });
    }
  }

  async remove(id: number) {
    const blog = await this.commentRepository.findOneBy({ id });
    if (!blog) {
      throw new InternalServerErrorException('comment not font');
    } else {
      await this.commentRepository.delete({ id });
      return blog;
    }
  }
}
