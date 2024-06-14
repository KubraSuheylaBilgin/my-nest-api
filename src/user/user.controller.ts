import { Controller, Get, Post, Param, Delete,Put, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '../entity/user.entity';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<User> {
    return this.userService.findOne(id);
  }

  @Post()
  create(@Body() user: User): Promise<User> {
    return this.userService.create(user);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.userService.remove(id);
  }
  
  @Put(':id')
  update(@Param('id') id: number, @Body() user: User): Promise<User> {
    return this.userService.update(id, user);
  }


}
