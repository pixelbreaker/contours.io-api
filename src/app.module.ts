import * as dotenv from 'dotenv';
dotenv.config();

import { AppController } from './app.controller';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { EventsService } from './events/events.service';
import { EventsController } from './events/events.controller';
import { EventsModule } from './events/events.module';

@Module({
  imports: [
    UsersModule,
    EventsModule,
    MongooseModule.forRoot(process.env.MONGO_URI, { useFindAndModify: false }),
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
