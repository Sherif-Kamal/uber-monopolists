import { Injectable, Inject } from "@nestjs/common";
import { Logger } from 'winston';
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { DateService } from "src/shared/pipes/date-service";

@Injectable()
export class TripRepoistory {
  constructor(
    @Inject('winston') private readonly logger: Logger,
    @InjectModel('Trip') private tripModel: Model<any>,
    @InjectModel('Monopolists') private monopolistsModel: Model<any>,
    private dateService: DateService
  ) {

  }

  async createTrip(userId): Promise < any > {
    let trip = await this.tripModel.create({ user_id: userId });
      await this.calculateDriverTrips(userId);
      return trip;
  }

  calculateDriverTrips(userId: any): Promise < any > {
    let currentMonth = this.dateService._getCurrentMonth();
    let currentYear = this.dateService._getCurrentYear();

    console.log({
      currentMonth
    }, {
      currentYear
    });

    return this.monopolistsModel.update({
      driver_id: userId,
      month: currentMonth,
      year: currentYear
    }, {
      $inc: {
        counter: 1
      },
      $set: {
        driver_id: userId,
        month: currentMonth,
        year: currentYear
      }
    }, {
      upsert: true
    }, );
  }

}