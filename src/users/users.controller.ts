import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseFilters,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { User } from './interfaces/user.interface';
import { MongoFilter } from '../filters/mongo';
import { BadRequestFilter } from '../filters/bad-request';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(id: string): Promise<User> {
    return this.usersService.findOne(id);
  }

  @Post()
  @UseFilters(BadRequestFilter, MongoFilter)
  create(@Body() user: CreateUserDto): Promise<any> {
    return this.usersService.create(user);
  }

  @Delete(':id')
  delete(@Param('id') id): Promise<User> {
    return this.usersService.delete(id);
  }

  @Put(':id')
  update(@Body() updateUser: CreateUserDto, @Param('id') id): Promise<User> {
    return this.usersService.update(id, updateUser);
  }
}
