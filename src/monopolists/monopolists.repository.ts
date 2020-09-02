import { Injectable, Inject } from "@nestjs/common";
import { Logger } from 'winston';
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { DateService } from "src/shared/pipes/date-service";

@Injectable()
export class MonopolistRepoistory {
  constructor(
    @Inject('winston') private readonly logger: Logger,
    @InjectModel('Monopolists') private monopolistsModel: Model<any>,
    private dateService: DateService
  ) {
  }

  // leaving some console.logs just for the purpose of debugging.
  // TODO : delete console.logs.
  async getMonopolistsCurrentMonth() {
    let currentMonthTotalTrips = await this.getTotalTripsCurrentMonth();
    console.log({
      currentMonthTotalTrips
    })
    let monopolistLimit = this.getMonopolistsRatio(currentMonthTotalTrips);
    console.log({
      monopolistLimit
    });

    let currentMonthMonopolists = await this.monopolistsModel.aggregate([{
        $match: {
          month: this.dateService._getCurrentMonth(),
          year: this.dateService._getCurrentYear()
        }
      },
      {
        $group: {
          _id: "$driver_id",
          totalTrips: {
            $sum: "$counter"
          }
        }
      },
      {
        "$match": {
          "totalTrips": {
            "$gt": monopolistLimit
          }
        }
      }
    ]);

    console.log({
      currentMonthMonopolists
    });
    return currentMonthMonopolists;
  }

  //TODO: delete conosle.logs.
  async getMonopolistsCurrentYear() {
    let currentYearTotalTrips = await this.getTotalTripsCurrentYear();
    console.log({ currentYearTotalTrips });
    let monopolistLimit = this.getMonopolistsRatio(currentYearTotalTrips);
    console.log({
      monopolistLimit
    });

    let currentYearMonopolists = await this.monopolistsModel.aggregate([{
        $match: {
          year: this.dateService._getCurrentYear()
        }
      },
      {
        $group: {
          _id: "$driver_id",
          totalTrips: {
            $sum: "$counter"
          }
        }
      },
      {
        "$match": {
          "totalTrips": {
            "$gt": monopolistLimit
          }
        }
      }
    ])
    console.log({
      currentYearMonopolists
    });
    return currentYearMonopolists;
  }

  //TODO: delete conosle.logs.
  async getMonopolistsAllTime() {
    let TotalTripsEver = await this.getTotalTripsEver();
    console.log({
      TotalTripsEver
    })
    let monopolistLimit = this.getMonopolistsRatio(TotalTripsEver);
    console.log({
      monopolistLimit
    });

    let MonopolistsAllTime = await this.monopolistsModel.aggregate([
      {
        $group: {
          _id: "$driver_id",
          totalTrips: {
            $sum: "$counter"
          }
        }
      },
      {
        "$match": {
          "totalTrips": {
            "$gt": monopolistLimit
          }
        }
      }
    ])
    console.log({
      MonopolistsAllTime
    });
    return MonopolistsAllTime;
  }

  getMonopolistsRatio(totalOfTrips): Number {
    return totalOfTrips * 0.1;
  }

  async getTotalTripsCurrentMonth() {
    let currentMonth = this.dateService._getCurrentMonth();
    let currentYear = this.dateService._getCurrentYear();

    let TotalTripsCurrentMonth = await this.monopolistsModel.aggregate([{
        $match: {
          month: currentMonth,
          year: currentYear
        }
      },
      {
        $group: {
          _id: null,
          total: {
            $sum: "$counter"
          }
        }
      }
    ]);
    console.log(TotalTripsCurrentMonth[0].total);
    return TotalTripsCurrentMonth[0].total;
  }

  async getTotalTripsCurrentYear() {
    let currentYear = this.dateService._getCurrentYear();

    let TotalTripsCurrentYear = await this.monopolistsModel.aggregate([{
        $match: {
          year: currentYear
        }
      },
      {
        $group: {
          _id: null,
          total: {
            $sum: "$counter"
          }
        }
      }
    ]);

    return TotalTripsCurrentYear[0].total;

  }

  async getTotalTripsEver() {

    let TotalTripsEver = await this.monopolistsModel.aggregate([{
        $group: {
          _id: null,
          total: {
            $sum: "$counter"
          }
        }
      }
    ]);
    return TotalTripsEver[0].total;

  }

}