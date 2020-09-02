import { Module } from '@nestjs/common';
import { TripsController } from './trips.controller';
import { TripsService } from './trips.service';
import { MongooseModule } from '@nestjs/mongoose';
import { TripSchema } from './trip.schema';
import { TripRepoistory } from './trip.repository';
import { MonopolistsSchema } from 'src/monopolists/monopolists.schema';
import { DateService } from 'src/shared/pipes/date-service';


@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Trip', schema: TripSchema }]),
    MongooseModule.forFeature([{ name: 'Monopolists', schema: MonopolistsSchema }])
  ],
  controllers: [TripsController],
  providers: [TripsService,TripRepoistory,DateService]
})
export class TripsModule {}
