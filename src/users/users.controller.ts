import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Request,
  UseFilters,
  UseGuards,
  Options,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { BadRequestFilter } from '../common/filters/bad-request';
import { MongoFilter } from '../common/filters/mongo';
import { RegisterVm } from './models/registervm-model';
import { Roles } from '../common/guards/roles.decorator';
import { RolesGuard } from '../common/guards/roles.guard';
import { User } from './models/user.model';
import { UserRole } from './models/user-role.enum';
import { UsersService } from './users.service';
import { UserVm } from '../users/models/uservm-model';

@Controller('users')
export class UsersController {
  constructor(private readonly _usersService: UsersService) {}

  // @Get()
  // findAll(): Promise<UserVm[]> {
  //   return this._usersService.findAll();
  // }

  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  getProfile(@Request() req) {
    return req.user;
  }

  @Get(':id')
  @UseFilters(BadRequestFilter, MongoFilter)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.Admin)
  findOne(@Param('id') id): Promise<UserVm | undefined> {
    return this._usersService.findOne({ _id: id });
  }

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
  @UseGuards(AuthGuard('jwt'))
  delete(@Param('id') id, @Request() req): Promise<User> {
    return this._usersService.delete(id);
  }

  @Put(':id')
  @UseFilters(BadRequestFilter, MongoFilter)
  update(@Body() updateUser: User, @Param('id') id): Promise<User> {
    return this._usersService.update(id, updateUser);
  }
}
