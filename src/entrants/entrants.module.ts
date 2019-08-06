import { Entrant } from './models/entrant.model';
import { EntrantsService } from './entrants.service';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Entrant.modelName, schema: Entrant.model.schema },
    ]),
  ],
  controllers: [],
  providers: [EntrantsService],
  exports: [EntrantsService],
})
export class EntrantsModule {}
