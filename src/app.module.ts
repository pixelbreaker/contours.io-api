import * as dotenv from 'dotenv';
dotenv.config();

import { AppController } from './app.controller';
import { EntrantsModule } from './entrants/entrants.module';
import { EventsModule } from './events/events.module';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    UsersModule,
    EventsModule,
    EntrantsModule,
    MongooseModule.forRoot(process.env.MONGO_URI, {
      useFindAndModify: false,
      useNewUrlParser: true,
      autoIndex: process.env.NODE_ENV === 'development',
    }),
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
