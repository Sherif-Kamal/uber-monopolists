import { Injectable } from '@nestjs/common';
import { TripRepoistory } from './trip.repository';

@Injectable()
export class TripsService {

  constructor(private tripRepository: TripRepoistory) {
  }

  createTrip(userId) {
    return this.tripRepository.createTrip(userId);
  }
  
}
