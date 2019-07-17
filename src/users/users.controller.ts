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
import { BadRequestFilter } from '../filters/bad-request';
import { CreateUserDto } from './dto/create-user.dto';
import { MongoFilter } from '../filters/mongo';
import { User } from './interfaces/user.interface';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id): Promise<User | undefined> {
    return this.usersService.findOne(id);
  }

  @Post()
  @UseFilters(BadRequestFilter, MongoFilter)
  create(@Body() user: CreateUserDto): Promise<any> {
    return this.usersService.create(user);
  }

  @Delete(':id')
  @UseFilters(BadRequestFilter, MongoFilter)
  delete(@Param('id') id): Promise<User> {
    return this.usersService.delete(id);
  }

  @Put(':id')
  @UseFilters(BadRequestFilter, MongoFilter)
  update(@Body() updateUser: CreateUserDto, @Param('id') id): Promise<User> {
    return this.usersService.update(id, updateUser);
  }
}
