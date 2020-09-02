import { Module } from '@nestjs/common';
import { MonopolistsController } from './monopolists.controller';
import { MonopolistsService } from './monopolists.service';
import { MongooseModule } from '@nestjs/mongoose';
import { MonopolistsSchema } from './monopolists.schema';
import { DateService } from 'src/shared/pipes/date-service';
import { MonopolistRepoistory } from './monopolists.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Monopolists', schema: MonopolistsSchema }])
  ],
  controllers: [MonopolistsController],
  providers: [MonopolistsService, DateService, MonopolistRepoistory]
})
export class MonopolistsModule {}
