import * as dotenv from 'dotenv';
dotenv.config();

import { AppController } from './app.controller';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    UsersModule,
    MongooseModule.forRoot(process.env.MONGO_URI, { useFindAndModify: false }),
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
