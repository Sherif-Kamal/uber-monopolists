import { Injectable } from '@nestjs/common';
import { MonopolistRepoistory } from './monopolists.repository';
import { Period } from './enums/period.enum';
@Injectable()
export class MonopolistsService {
  constructor(private monopolistRepository: MonopolistRepoistory) {
  }
  async listMonopolists(period: any) {
    let monopolists = [];

    switch (period) {
      case Period.MONTH:
        monopolists =  await this.monopolistRepository.getMonopolistsCurrentMonth();
        break;
        case Period.YEAR:
          monopolists = await this.monopolistRepository.getMonopolistsCurrentYear();
        break;
      case Period.EVER:
          monopolists = await this.monopolistRepository.getMonopolistsAllTime();
          break;
      default:
        break;
    }
    return monopolists;
  }
}
