import { Injectable } from "@nestjs/common";

@Injectable()
export class DateService {

  _getCurrentMonth(): Number {
    let date = new Date();
    return date.getMonth();
  }

  _getCurrentYear(): Number {
    return new Date().getFullYear();
  }
  
}