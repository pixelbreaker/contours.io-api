import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseFilters,
  UseGuards,
  Request,
} from '@nestjs/common';
import { BadRequestFilter } from '../filters/bad-request';
import { MongoFilter } from '../filters/mongo';
import { User } from './models/user.model';
import { UsersService } from './users.service';
import { AuthGuard } from '@nestjs/passport';
import { UserVm } from '../users/models/uservm-model';
import { RegisterVm } from './models/registervm-model';

@Controller('users')
export class UsersController {
  constructor(private readonly _usersService: UsersService) {}

  @Get()
  findAll(): Promise<UserVm[]> {
    return this._usersService.findAll();
  }

  // @UseGuards(AuthGuard('jwt'))
  // @Get('me')
  // getProfile(@Request() req) {
  //   console.log(req);

  //   return req.user;
  // }

  @Get(':id')
  findOne(@Param('id') id): Promise<UserVm | undefined> {
    return this._usersService.findOne({ _id: id });
  }

  // @Post()
  // @UseFilters(BadRequestFilter, MongoFilter)
  // create(@Body() user: User): Promise<User> {
  //   return this._usersService.create(user);
  // }

  @Post()
  @UseFilters(BadRequestFilter, MongoFilter)
  register(@Body() user: RegisterVm): Promise<UserVm> {
    return this._usersService.register(user);
  }

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req) {
    return this._usersService.login(req.user);
  }

  @Delete(':id')
  @UseFilters(BadRequestFilter, MongoFilter)
  delete(@Param('id') id): Promise<User> {
    return this._usersService.delete(id);
  }

  @Put(':id')
  @UseFilters(BadRequestFilter, MongoFilter)
  update(@Body() updateUser: User, @Param('id') id): Promise<User> {
    return this._usersService.update(id, updateUser);
  }
}
