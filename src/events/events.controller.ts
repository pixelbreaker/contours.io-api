import {
  Controller,
  Post,
  UseFilters,
  UseGuards,
  Body,
  Param,
  Get,
} from '@nestjs/common';
import { EventsService } from './events.service';
import { EventModel } from './models/event.model';
import { AuthGuard } from '@nestjs/passport';
import { BadRequestFilter } from '../common/filters/bad-request';
import { MongoFilter } from '../common/filters/mongo';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/guards/roles.decorator';
import { UserRole } from '../users/models/user-role.enum';

@Controller('events')
export class EventsController {
  constructor(private readonly _eventsService: EventsService) {}

  @Post()
  @UseFilters(BadRequestFilter, MongoFilter)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.Admin)
  async create(@Body() event: EventModel): Promise<EventModel> {
    const newEvent = await this._eventsService.create(event);
    return this._eventsService.findOne({ _id: newEvent._id });
  }

  @Get(':id')
  @UseFilters(BadRequestFilter, MongoFilter)
  async get(@Param('id') id: string): Promise<EventModel> {
    return this._eventsService.findOne({ _id: id });
  }
}
