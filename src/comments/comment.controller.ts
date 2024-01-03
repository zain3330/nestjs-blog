import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { CommentsService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { AuthGuard } from '@nestjs/passport';
import { AuthUser } from 'src/auth/decorators/auth-user.decorator';
import { userInfo } from 'os';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}
  @UseGuards(AuthGuard('jwt'))
  //commet and reply
  @Post(':id?')
  async create(
    @Body() createCommentDto: CreateCommentDto,
    @AuthUser() user: any,
    @Req() req,
  ) {
    return this.commentsService.create(
      createCommentDto,
      user.userId,
      req.params.id,
    );
  }

  @Get()
  findAll() {
    return this.commentsService.findAll();
  }

  @Get(':id')
  async findOne(@Req() req) {
    return await this.commentsService.CommentById(req.params.id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCommentDto: UpdateCommentDto,
  ) {
    return this.commentsService.update(+id, updateCommentDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.commentsService.remove(+id);
  }
}
