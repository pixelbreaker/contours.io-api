import { EntrantsService } from '../entrants/entrants.service';
import { EventModel } from './models/event.model';
import { EventsController } from './events.controller';
import { EventsService } from './events.service';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RolesGuard } from '../common/guards/roles.guard';
import { EntrantsModule } from '../entrants/entrants.module';

@Module({
  imports: [
    EntrantsModule,
    MongooseModule.forFeature([
      { name: EventModel.modelName, schema: EventModel.model.schema },
    ]),
  ],
  controllers: [EventsController],
  providers: [EventsService, RolesGuard],
  exports: [EventsService],
})
export class EventsModule {}
