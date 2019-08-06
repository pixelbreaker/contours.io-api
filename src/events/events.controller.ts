import {
  Controller,
  Post,
  UseFilters,
  UseGuards,
  Body,
  Param,
  Get,
  Put,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { BadRequestFilter } from '../common/filters/bad-request';
import { EntrantsService } from '../entrants/entrants.service';
import { EventModel } from './models/event.model';
import { EventsService } from './events.service';
import { MongoFilter } from '../common/filters/mongo';
import { Roles } from '../common/guards/roles.decorator';
import { RolesGuard } from '../common/guards/roles.guard';
import { UserRole } from '../users/models/user-role.enum';
import { Entrant } from '../entrants/models/entrant.model';

@Controller('events')
export class EventsController {
  constructor(
    private readonly _eventsService: EventsService,
    private readonly _entrantsService: EntrantsService,
  ) {}

  @Post()
  @UseFilters(BadRequestFilter, MongoFilter)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.Admin)
  async create(@Body() event: EventModel): Promise<EventModel> {
    const newEvent = await this._eventsService.create(event);
    return this._eventsService.findOne({ _id: newEvent._id });
  }

  @Put(':id/entrant')
  @UseFilters(BadRequestFilter, MongoFilter)
  async addEntrant(
    @Param('id') id: string,
    @Body() entrant: Entrant,
  ): Promise<EventModel> {
    entrant.event = id;
    const newEntrant = await this._entrantsService.create(entrant);

    const ev = await this._eventsService.addEntrant(id, newEntrant);
    // ev.entrants.push(newEntrant);
    // ev.save();

    return ev;
  }

  @Get(':id')
  @UseFilters(BadRequestFilter, MongoFilter)
  async get(@Param('id') id: string): Promise<EventModel> {
    return this._eventsService.findOne({ _id: id });
  }
}
