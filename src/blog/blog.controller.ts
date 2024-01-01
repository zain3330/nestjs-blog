import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ValidationPipe,
  UsePipes,
  Req,
  UseGuards,
} from '@nestjs/common';
import { BlogService } from './blog.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { Blog } from './entities/blog.entity';
import { AuthUser } from 'src/auth/decorators/auth-user.decorator';
import { AuthGuard } from '@nestjs/passport';

@Controller('blog')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}
  @UseGuards(AuthGuard('jwt'))
  @Post()
  async create(@Body() createBlogDto: CreateBlogDto,  @AuthUser() user: any) {
   
    return this.blogService.create(createBlogDto, user.userId);
  }
  
  @Get()
  async findAll(): Promise<Blog[]> {
    return this.blogService.findAll();
  }

  @Get(':id')
  async findOne(@Req() req) {
    return this.blogService.findOne(req.params.id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateBlogDto: UpdateBlogDto) {
    return this.blogService.update(+id, updateBlogDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<Blog> {
    return this.blogService.remove(+id);
  }
}
